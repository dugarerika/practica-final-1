import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer'
import Form from '../Form';
import Input from '../Input';
import { FaUser } from 'react-icons/fa';
import { notification } from 'antd';
import { withTranslation } from 'react-i18next';
import './register.css'

const openNotificationWarning = (message, description) => {
  notification.open({
    message,
    description,
    type: 'warning',
    style: { backgroundColor: 'yellow' },
  });
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isInvalidValidForm(user) {
    return user.email.trim().length <= 3 || user.nickname.trim().length <= 3;
  }

  handleSubmit(user) {
    if (this.isInvalidValidForm(user)) {
      openNotificationWarning(
        'Invalid Form',
        `The Email or nickname are not correct`,
      );
      return false;
    }

    this.props.newUser(user);
  }

  render() {
    const { t } = this.props;
    return (
      <>
      <Navbar />
      
        <div className="pagina-fondo-3">
        
        <div className="register">

        <h1 className="">
          <span aria-label="logo" role="img" style={{ fontSize: '2rem' }}>
            {/* {t('I do not have an account')} */}
            Registro nuevo usuario
          </span>
        </h1>

        <br/>
        
        {/* <span>{t('Sign up with your email, username and password')}</span> */}

        <div className="login-form">
          <Form
            onSubmit={this.handleSubmit}
            initialValue={{ email: '', nickname: '', password: '' }}
          >
            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left">
                <Input
                  name="email"
                  className="input"
                  type="email"
                  placeholder=""
                />
               {/*  <span className="icon is-small is-left">
                  <FaUser />
                </span> */}
              </div>
            </div>

            <div className="field">
              <label className="label">{t('Nickname')}</label>
              <div className="control has-icons-left">
                <Input
                  name="nickname"
                  className="input"
                  type="text"
                  placeholder=""
                />
               {/*  <span className="icon is-small is-left">
                  <FaUser />
                </span> */}

              </div>
            </div>

            <div className="field">
              <label className="label">{t('Password')}</label>
              <div className="control has-icons-left">
                <Input
                  name="password"
                  className="input"
                  type="password"
                  placeholder=""
                />

                {/* <span className="icon is-small is-left">
                  <FaUser />
                </span> */}

              </div>
            </div>

            <div className="field">
              <p className="control">
                <button className="">
                  {t('Create')} cuenta
                </button>
              </p>
            </div>
          </Form>
        </div>
        <br/>
        
        <div className="">
          <p className="has-text-centered">
            {t('Remember, the fields can not be empty')}
          </p>
        </div>

        </div>
        </div>
      <Footer/>
      </>
    );
  }
}

export default withTranslation()(Register);

