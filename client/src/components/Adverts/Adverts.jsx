import React from 'react';
import Navbar from '../Navbar/';
import Loading from '../Loading/';
// import Searchbar from '../Searchbar/';
import Search3 from '../Search3/Search3';
import Pagination from 'bulma-pagination-react';
import CaptureError from '../CaptureError/';
import Footer from '../Footer/';
import PropTypes from 'prop-types';
import AdvertsGrid from '../AdvertsGrid/';
import { Switch } from 'antd';
import { withTranslation } from 'react-i18next';
import './adverts.css';

class Adverts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        name: '',
        type: '',
        tag: '',
        user: null,
        priceMin: '',
        priceMax: '',
        oldest: false,
      },
    };
    this.changeText = this.changeText.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.handlerPage = this.handlerPage.bind(this);
    this.onChangeSwitch = this.onChangeSwitch.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  handlerSubmit(event) {
    event.preventDefault();
    //Al hacer una nueva busqueda volvemos a la pagina 1
    this.props.changePage(1);
    this.props.setFilter(this.state.filter);
    this.props.loadAdverts();
  }

  onDelete(id) {
    alert(id);
  }

  handlerPage(currentPage) {
    this.props.changePage(currentPage);
    //Una vez cambiamos de pagina volvemos a cargar los anuncios
    this.props.loadAdverts();
  }

  changeText({ target }) {
    this.setState({
      filter: {
        ...this.state.filter,
        [target.name]: target.value,
      },
    });
  }

  onChangeSwitch(checked) {
    this.setState(
      prevState => ({
        filter: {
          ...this.state.filter,
          'oldest': !prevState.filter.oldest,
        },
      }),
      () => {
        this.props.changePage(1);
        this.props.setFilter(this.state.filter);
        this.props.loadAdverts();
      },
    );
  }

  componentDidMount() {
    //Cargamos el filtro inicial
    const user = this.props.nickname || null;
    this.props.setFilter({ ...this.state.filter, user: user });
    this.setState({
      filter: {
        ...this.state.filter,
        user: user,
      },
    });
    this.props.loadAdverts();
  }

  render() {
    const { filter, onDelete } = this.state;
    const {
      isFetching,
      error,
      currentPage,
      myadverts,
      totalPages,
      t,
    } = this.props;

    if (error) {
      return (
        <CaptureError message="Error fecthing Adverts" error={error.message} />
      );
    }
    return (
      <>
      <Navbar/>
      
              <Search3 
                {...filter}
                onChangeText={this.changeText}
                handlerSubmit={this.handlerSubmit}
                />

      <div className="navbar-top">  
      </div>  

      
     <div className="pagina-fondo-2">

         <div className="adverts">    
        {isFetching === true ? (
          <Loading text="Fetching Adverts" />
        ) : (
          <>

           {/*  <div className="">
              {t('Newest')}{' '}
              <Switch
                defaultChecked={!filter.oldest}
                onChange={this.onChangeSwitch}
              />
            </div> */}
            
            <AdvertsGrid
              text={this.state.text}
              totalPages={totalPages}
              currentPage={currentPage}
              onChangePage={this.handlerPage}
              myadverts={myadverts}
              onDelete={onDelete}
            />
              
            </>
        )}
        </div> 

                {/*   <Pagination
                    className="pagination"
                    currentPage={currentPage}
                    pages={totalPages}
                    onChange={page => {
                      this.handlerPage(page);
                    }}
                  /> */}

          </div>

        <Footer/> 
            
      </>
    );
  }
}

Adverts.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  currentPage: PropTypes.number,
  loadAdverts: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  nickname: PropTypes.string
};

export default withTranslation()(Adverts);
