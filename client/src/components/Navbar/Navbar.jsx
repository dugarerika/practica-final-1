import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import api from '../../utils/api';
//import Searchbar_2 from '../Searchbar-2/Searchbar_2'

import Button from '@material-ui/core/Button';
import './navbar.css';

const { logout } = api();

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBurguer: false,
      lang: 'es',
    };
    this.toggleBurguer = this.toggleBurguer.bind(this);
    this.logout = this.logout.bind(this);
    this.changeLang = this.changeLang.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.register = this.register.bind(this);
    this.newAdvert = this.newAdvert.bind(this);
    this.myAdverts = this.myAdverts.bind(this);
  }

  componentDidMount() {
    this.setState({
      lang: this.props.i18n.language.split('-')[0],
    });
  }

  toggleBurguer() {
    this.setState({
      activeBurguer: !this.state.activeBurguer,
    });
  }

  logout(event) {
    event.preventDefault();
    //Dejamos el campo de user a un objecto vacio en el estado de redux
    this.props.setUser({});
    logout()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  login(event) {
    event.preventDefault();
    this.props.history.push('/signin');
  }

  register(event) {
    event.preventDefault();
    this.props.history.push('/register');
  }

  newAdvert(event) {
    event.preventDefault();
    this.props.history.push('/advert/create');
  }

  myAdverts(event) {
    event.preventDefault();
    this.props.history.push('/private/myadverts');
  }

  changeLang() {
    this.setState(
      prevState => ({
        lang: prevState.lang === 'es' ? 'en' : 'es',
      }),
      () => this.props.i18n.changeLanguage(this.state.lang),
    );
  }

  render() {
    const { activeBurguer, lang } = this.state;
    const { t, isAuth } = this.props;
    const languagesFlag = {
      en: 'us',
      es: 'es',
    };
    return (
      <>
        <nav className="is-fixed-top">

          <div className="logo">
            <a className=" " href="/">
              <img src="/Logo-wallarock-2.png" alt="logo"></img>
              &nbsp;<span className="title-logo"></span>
            </a>
          </div>

          <div className="idiomas">

          <button
            /*  variant="outlined" */
             onClick={this.changeLang}
             className="boton-idioma"
            >
              <span
                className={`flag-icon flag-icon-${languagesFlag[lang]}`}
              ></span>


          </button> 

          <button className="boton-idioma">
             <span class="flag-icon flag-icon-gb"></span>
          </button>


          <button className="boton-idioma">
             <span class="flag-icon flag-icon-fr"></span>
          </button>

          </div>

           
          <div className="buttons">
            
              


                <div>
                      <button 
                        variant="outlined"
                        onClick={this.register}
                        className="boton"
                        >
                          Registro
                      </button>
                  
                
                      {isAuth ? (
                      <button
                      variant="outlined"
                        onClick={this.logout}
                        className="boton_signout"
                      >
                        {/* {t('SignOut')} */}
                        Cerrar Sesión
                      </button>
                    ) : (
                      <button
                      variant="outlined"
                        onClick={this.login}
                        className="boton"
                      >
                        {t('SignIn')}
                      </button>
                    )}
                </div>

              <div className="botones-privado">

                  <button
                  className="boton"
                      onClick={this.myAdverts}
                  >
                      {t('My Adverts')}
                  </button>

                  <button
                    className="boton"
                    onClick={this.newAdvert}
                  >
                      {t('Create new Advert')}
                  </button>

              </div>


            </div>
       </nav>

      </>
    )    
  }
}

export default withTranslation()(Navbar);
