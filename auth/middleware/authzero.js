'use strict';

const base64 = require('base-64');
const users = require('../models/users-model.js');

module.exports = async (req, res, next) => {

  try {
    console.log('user email console log', req.body.email);

    // let authorization = req.headers.authorization;
    // let encoded = authorization.split(' ')[1];
    //let creds = req.body;
    //let [userEmail, password] = creds.split(':');
    let userEmail = req.body.email;

    let userRecord = await users.validateAuthZero(userEmail);

    if(!userRecord) {
      let obj = {
        username: req.body.email,
        userEmail: req.body.email,
        role: 'admin',
        myListings: [],
        followedListings: [],
      };
      
      let record = new users(obj);
      userRecord = await record.save();
    }

    console.log('userRecord line 32:', userRecord);

    req.token = userRecord.generateToken();
    req.user = userRecord;
    next();
  } catch (e) {
    console.log('Error occured in AuthZero.js Middleware', e);
    next('Invalid Login');
  }
};