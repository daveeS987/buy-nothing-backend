'use strict';

const base64 = require('base-64');
const users = require('../models/users-model.js');

module.exports = async (req, res, next) => {

  try {
    //this console log should have user email:
    console.log('user email console log', req.body.email);

    // let authorization = req.headers.authorization;
    // let encoded = authorization.split(' ')[1];
    //let creds = req.body;
    //let [userEmail, password] = creds.split(':');
    let userEmail = req.body.email;

    let userRecord = await users.validateAuthZero(userEmail);

    req.token = userRecord.generateToken();
    req.user = userRecord;
    next();
  } catch (e) {
    console.log('Error occured in AuthZero.js Middleware', e);
    next('Invalid Login');
  }
};