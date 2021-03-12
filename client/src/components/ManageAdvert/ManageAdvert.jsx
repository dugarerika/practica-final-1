import React from 'react';
import SelectMultiple from '../SelectMultiple/';
import Navbar from '../Navbar/';
import Footer from '../Footer';
import { notification } from 'antd';
import {
  FaAdversal,
  FaUser,
  FaRegFileWord,
  FaEuroSign,
  FaImage,
} from 'react-icons/fa';

import CaptureError from '../CaptureError';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import api from '../../utils/api';
import './manageAdvert.css';

const { uploadFile } = api();

const openNotification = (message, description) => {
  notification.open({
    message,
    description,
    type: 'success',
    style: { backgroundColor: 'green' },
  });
};

class ManageAdvert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advert: {
        name: '',
        description: '',
        tags: [],
        price: '',
        type: 'sell',
        photo: '',
      },
      edit: false,
      imageFile: null,
    };
    this.onChangeField = this.onChangeField.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onUploadFile = this.onUploadFile.bind(this);
    this.onChangeTag = this.onChangeTag.bind(this);
    this.isInvalidForm = this.isInvalidForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(event) {
    event.preventDefault();

    if (!this.isInvalidForm()) {
      if (this.state.edit) {
        await this.props.editAdvert(this.state.advert._id, this.state.advert);
        openNotification(
          'openNotificaction',
          'Advert update with sucess',
          `The advert was updated correctly`,
        );
        return;
      }
      await this.props.newAdvert({
        ...this.state.advert,
        user: this.props.user.nickname,
      });
      this.setState({
        //Una vez creamos el anuncio dejamos el formulario en blanco
        advert: {
          name: '',
          description: '',
          tags: [],
          price: '',
          type: 'sell',
          photo: '',
        },
      });
      openNotification(
        'Advert created with success',
        `The advert was created correctly at`,
      );
    }
  }

  onChangeFile(e) {
    this.setState({ imageFile: e.target.files[0] });
  }
  
  onUploadFile() {
    const formData = new FormData();
    formData.append('photo', this.state.imageFile);

    uploadFile(formData)
      .then(imagePath =>
        this.setState({
          advert: {
            ...this.state.advert,
            photo: imagePath,
          },
        }),
      )
      .catch(err => console.log(err));
  }

  async componentDidMount() {
    if (this.props.history.location.pathname.includes('/advert/edit')) {
      const { id } = this.props.match.params;
      await this.props.loadAdvert(id);
      this.setState({
        advert: this.props.advert,
        edit: true,
      });
    }
  }

  onChangeField(event) {
    const { name, value } = event.target;
    if (name !== 'photo') {
      this.setState({
        advert: {
          ...this.state.advert,
          [name]: value,
        },
      });
    }
  }

  onChangeTag(value) {
    this.setState({
      advert: {
        ...this.state.advert,
        tags: [...value],
      },
    });
  }

  isInvalidForm() {
    const { advert } = this.state;
    return (
      advert.name.trim().length <= 3 ||
      advert.description.trim().length <= 3 ||
      advert.price < 1 ||
      advert.photo.trim().length <= 3 ||
      advert.type.trim().length < 3 ||
      advert.tags.length < 1
    );
  }

  render() {
    const { advert, edit } = this.state;
    const { isFetching, error, t } = this.props;

    if (isFetching) {
      return null;
    }
    if (!advert) {
      return null;
    }
    if (error) {
      return (
        <CaptureError message="Error fecthing Adverts" error={error.message} />
      );
    }
    return (
      <>
        <Navbar />

        <div className="pagina-fondo-6">
            
            

        <div className="nuevo-anuncio">

            <h1 className="cabecera-anuncio">
              <span aria-label="logo" role="img" style={{ fontSize: '2rem' }}>
                Crear nuevo Anuncio
              </span>
            </h1>
                
                <form onSubmit={this.onSubmit}>

                <div className="nombre-precio">

                    <div className="nombre-producto">
                      <label className="label">{t('Name')}</label>
                      <input
                        name="name"
                        className="input"
                        value={advert.name}
                        onChange={this.onChangeField}
                        type="text"
                        placeholder=""
                        />
                    </div> 


                    <div className="descripcion-producto">
                    <label className="label">{t('Price')}</label>
                    <input
                        name="price"
                        className="input"
                        type="number"
                        value={advert.price}
                        onChange={this.onChangeField}
                        placeholder=""
                      />
                    </div>

                </div>   

                <label className="label">{t('Description')}</label>
                <input
                    name="description"
                    className="input"
                    type="text"
                    value={advert.description}
                    onChange={this.onChangeField}
                    placeholder=""
                  />

                

                <label className="label">{t('Photo')}</label>

                <input type="file" 
                       multiple="true"
                       onChange={this.onChangeFile} 
                       accept="image/*"
                      />

                <button type="button" 
                    className="subir"
                    onClick={this.onUploadFile}>
                    Subir
                </button>

                <input
                    name="photo"
                    disabled
                    className="input"
                    type="text"
                    value={advert.photo}
                    onChange={this.onChangeField}
                    placeholder="archivo"
                  />

                <div className="crear-tipo">
                    <label className="label">{t('Type')}</label> 
                    <select
                      className="input"
                      name="type"
                      value={advert.type}
                      onChange={this.onChangeField}
                      >
                      <option value="buy">{t('buy')}</option>
                      <option value="sell">{t('sell')}</option>
                    </select>
                </div>
                
               
                <div className="crear-categoria">
                  <label className="label">{t('Tags')}</label>
                  <SelectMultiple
                      name="tags"
                      value={advert.tags}
                      onChange={this.onChangeTag}
                      />
                </div>


               

                <button
                  className="crear-boton"
                  disabled={this.isInvalidForm()}
                  >
                    {edit === true ? t('Update') : t('Create')}
                 </button>

            </form>
        </div>

        </div>



         
    
                   {/*  <div className="field">
                        <div className="control has-icons-left">
                        
                        <span className="icon is-small is-left">
                          <FaUser />
                        </span>
                        </div>
                        <p className="help">The name is invalid, is too short</p>
                    </div> */}


                    {/* <div className="field">
                      
                      <div className="control has-icons-left">
                        <span className="icon is-small is-left">
                          <FaRegFileWord />
                        </span>
                      </div>
                      <p className="help">
                        The description is invalid, is too short
                      </p>

                    </div> */}

                    {/* <div className="field">
                      <div className="control has-icons-left">
                       <span className="icon is-small is-left">
                          <FaEuroSign />
                        </span>
                      </div>
                      <p className="help">The price is invalid, is too short</p>
                    </div> */}

                    {/* <div className="field">
                      <div className="control has-icons-left">
                        <span className="icon is-small is-left">
                          <FaImage />
                        </span>
                      </div>
                      <p className="help">
                        The description is invalid, is too short
                      </p>
                    </div> */}

                   {/*  <div className="field">
                    </div>

                    <div className="field">
                      <div className="control has-icons-left">
                      </div>
                    </div> */}


                    {/* <div className="field">
                        <div className="control has-icons-left">
                        <div className="select is-fullwidth">
                       </div>
                      </div>
                    </div> */}


                    {/* <div className="field">
                      <p className="control">
                      </p>
                    </div> */}
                  
                
               {/*  <div className="forgot-password">
                  <p className="has-text-centered">
                    Remember, the fields can not be empty
                  </p>
                </div> */}

        


        <Footer />
      </>
    );
  }
}

ManageAdvert.propTypes = {
  advert: PropTypes.object,
  error: PropTypes.object,
  isFetching: PropTypes.bool,
  loadAdvert: PropTypes.func.isRequired,
  newAdvert: PropTypes.func.isRequired,
  editAdvert: PropTypes.func.isRequired,
};

export default withTranslation()(ManageAdvert);
