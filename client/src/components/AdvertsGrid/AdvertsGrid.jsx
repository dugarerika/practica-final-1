import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import Confirm from '../Confirm';
import './advertsGrid.css'

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  },
};

function AdvertsGrid({ adverts, t, myadverts }) {
  return (
    <>
       {adverts.length === 0 ? (
        <p style={styles.content}>No Results Found!!</p>
      ) : ( 



       
        
        <div className="card-container" > 
          {adverts.map(advert => (
           /*  <div className=""
            key={advert._id} > */  
            
           
          
              <div key={advert._id} 
              className="card-1"
                >


              
                    <div className="photo">
                      <img src={advert.photo} alt="Placeholder" />
                    </div>

                {/* image has-spacing image is-3by2 */}

                {/* <div className="card-content has-equal-height"> */}

                <Link
            to={`/advert/detail/${advert.name.replace(/\s+/g, '-')}/${
                advert._id
                }`}
            >



              <div className="content">

                      <h3 className="buttons">
                            {advert.price} €
                      </h3>  



                      <h4 className="title-card">
                          {advert.name}
                      </h4>
                  


                      <div className="description">
                            {advert.description}
                      </div>
                        
                        <hr/>
                      

                   {/*  <div className="has-spacing-bottom">
                      {advert.tags.map(tag => (
                        <span
                          key={tag}
                          className="tag has-small-spacing-top is-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div> */}


                   {/*  <div>
                      <Link to={`/adverts/${advert.user}`}>{advert.user}</Link>
                    </div> */}
                 </div>

                 </Link> 

                  

                  <div className="botones-editar">
                  {myadverts && (

                    <>

                      

                    
                        <Link
                          to={`/advert/edit/${advert._id}`}
                         >
                          <boton className="boton-editar">
                            {t('Edit')} 
                           </boton>
                        </Link>

                        {/* <form action="http://google.com">
                          <input type="submit" value="Go to Google" />
                        </form> */}

                                          
                        <Confirm 
                        id={advert._id}
                        className="boton-confirm"
                        />
                    </>

                  )}

                  </div>    

                 

                </div>


               /*  <footer className=""> */

                /*   <Link
                    to={`/advert/detail/${advert.name.replace(/\s+/g, '-')}/${
                      advert._id
                    }`}
                    className="card-footer-item"
                  >
                     {t('Detail')}
                  </Link> */


                  
                  /* {myadverts && (
                    <>

                    <Link
                        to={`/advert/edit/${advert._id}`}
                        className=""
                      >
                        <boton>
                          {t('Edit')}
                        </boton>
                    </Link>
                     
                    <Confirm id={advert._id} />
                    </>
                  )} */

               /*  </footer> */

             /*  </div> */

            
              
          ))}

        </div> 

         
      ) 
      }
    </>
  );
}

AdvertsGrid.propTypes = {
  adverts: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  myadverts: PropTypes.bool,
};

export default withTranslation()(AdvertsGrid);
