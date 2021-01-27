'use strict';

const base64 = require('base-64');
const users = require('../models/users-model.js');

module.exports = async (req, res, next) => {

  try {

    let userRecord = await users.validateAuthZero(req.body.email);

    if(!userRecord) {
      let obj = {
        username: req.body.name,
        userEmail: req.body.email,
        role: 'admin',
        myListings: [],
        followedListings: [],
      };
      
      let record = new users(obj);
      userRecord = await record.save();
    }

    req.token = userRecord.generateToken();
    req.user = userRecord;
    next();
  } catch (e) {
    console.log('Error occured in AuthZero.js Middleware', e);
    next('Invalid Login');
  }
};