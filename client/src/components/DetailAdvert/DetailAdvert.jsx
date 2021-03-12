import React from 'react';
import Loading from '../Loading/';
import Navbar from '../Navbar/';
import Footer from '../Footer/';
import Moment from 'react-moment';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { EmailShareButton, EmailIcon  } from 'react-share';
import { WhatsappShareButton, WhatsappIcon  } from 'react-share';
// import { FaCoins, FaShoppingCart, FaTruck } from 'react-icons/fa';
import CaptureError from '../CaptureError/';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import './detailAdvert.css'

class DetailAdvert extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.loadAdvert(id);
  }

  render() {
    const { advert, isFetching, error, t } = this.props;
    if (isFetching) {
      return <Loading text="Fetching detail Advert" />;
    }
    if (error) {
      return (
        <CaptureError message="Error fecthing Advert" error={error.message} />
      );
    }
    if (!advert) {
      return null;
    }
    return (
      <>
          <Navbar />
          <div className="pagina-fondo">
           <div className="container-detail">


             <div className="nav-detail">

           
                        <div className="avatar">
                              <div>
                              <img src="/avatar-1.jpg" alt="avatar"></img> 
                              </div>
                              <div className="nombre"> 
                                    <div className="nombre-avatar">
                                    <strong>{advert.user}</strong>
                                    </div>
                                    <div className="producto">
                                        1 Producto
                                    </div>
                              </div>
                        </div>

                        

                  

               
                    <div className="">
                       <div>
                         <strong>Tipo</strong>
                       </div>
                      {advert.type}
                    </div>


                    <div className="">
                      <div className="category">
                        <strong>Categoría</strong> 
                      </div>
                          {advert.tags.map(tag => (
                            <span key={tag} >
                              {tag}
                            </span>
                          ))}
                    </div>

                    <div >
                    <img src="/valoraciones.png" alt="logochat"></img> 
                    </div>

                    <div className="chat">
                       <img src="/logo-chat.png" alt="logochat"></img> 
                    </div>

            </div>




                  <div className="image is-4by3">
                      <img
                        src={
                          advert.photo.startsWith('/images')
                            ? `${advert.photo}`
                            : `${advert.photo}`
                            }
                            alt="Placeholder"
                        />
                  </div>

              <div className="texto-detalle">
                  <p className="precio">{advert.price} € </p> 

                  <h1 className="title">{advert.name}</h1>

                               

                  <hr/> 

                     <p>{advert.description}</p>{' '}

                  <hr/>         

                   <div> 
                        Subido el&nbsp;  
                        <Moment format="DD/MM/YYYY HH:mm">
                          {advert.createdAt}
                        </Moment>
                        </div> 

                    </div>

                    

                   
                    <div className="container-abajo">

                          <div className="comparte">
                            Comparte este producto con tus amigos
                          </div>

                          <div className="media">
                          <TwitterShareButton
                            url={`https://wallaclone.site/advert/detail/${advert.name.replace(
                              /\s+/g, '-', )}/${advert._id}`}
                            title={advert.name}
                          >
                            <TwitterIcon size={32} />
                          </TwitterShareButton> 
                          </div>

                          <div className="media">
                          <FacebookShareButton
                            url={`https://wallaclone.site/advert/detail/${advert.name.replace(
                              /\s+/g, '-', )}/${advert._id}`}
                            title={advert.name}
                          >
                            <FacebookIcon size={32} />
                          </FacebookShareButton> 
                          </div>

                          <div className="media">
                          <EmailShareButton
                            url={`https://wallaclone.site/advert/detail/${advert.name.replace(
                              /\s+/g, '-', )}/${advert._id}`}
                            title={advert.name}
                          >
                            <EmailIcon size={32} />
                          </EmailShareButton> 
                          </div>

                          <div className="media">
                          <WhatsappShareButton
                            url={`https://wallaclone.site/advert/detail/${advert.name.replace(
                              /\s+/g, '-', )}/${advert._id}`}
                            title={advert.name}
                          >
                            <WhatsappIcon size={32} />
                          </WhatsappShareButton> 
                          </div>


                    </div>
   
              </div>

          </div>
        <Footer />
      </>
    );
  }
}

DetailAdvert.propTypes = {
  advert: PropTypes.object,
  error: PropTypes.object,
  isFetching: PropTypes.bool,
  loadAdvert: PropTypes.func.isRequired,
};

export default withTranslation()(DetailAdvert);
