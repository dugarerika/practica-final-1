import React from 'react';

import Navbar from '../Navbar';
import Login from '../Login';
import Footer from '../Footer'

import './signIn.css'

const SignInAndSignUp = () => (
  <>
        <Navbar />
            <div className="pagina-fondo-4">
              <Login />
            </div>
        <Footer/>
  </>
);

export default SignInAndSignUp;