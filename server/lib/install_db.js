'use strict';

require('dotenv').config();
const conn = require('./connectMongoose');
const Anuncio = require('../models/Anuncio');
const anuncios = require('../anuncios.json');
const Usuario = require('../models/Usuario');

// gestionar eventos de la conexión

conn.once('open', async () => {
    try {
       const result =  await Anuncio.deleteMany({}).exec();
       console.log('Se han borrado ' + result.deletedCount + ' registros');
       const reg = await Anuncio.insertMany(anuncios);
       console.log('Se han creado ' + reg.length + ' registros');
       await initUsuarios();
       console.log('Se han creado los usuarios');

    } catch(err) {
       console.log('Ha ocurrido un error ', err);
    }
    finally {
        conn.close();
        process.exit(0);
    }
});

async function initUsuarios() {
    await Usuario.deleteMany();
    await Usuario.insertMany([
      {
        email: 'erika@gmail.com',
        nickname: 'erika',
        password: await Usuario.hashPassword('1234'),
        resetPasswordToken: '',
        resetPasswordExpires: ''
      },
      {
        email: 'francois@gmail.com',
        nickname: 'francois',
        password: await Usuario.hashPassword('1234'),
        resetPasswordToken: '',
        resetPasswordExpires: ''
      },
      {
        email: 'alvaro@gmail.com',
        nickname: 'alvaro',
        password: await Usuario.hashPassword('1234'),
        resetPasswordToken: '',
        resetPasswordExpires: ''
      },

    ])
  }