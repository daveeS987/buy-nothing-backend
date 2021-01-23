'use strict';

const base64 = require('base-64');
const users = require('../models/users-model.js');

module.exports = async (req, res, next) => {

  try {
    let authorization = req.headers.authorization;
    let encoded = authorization.split(' ')[1];
    let creds = base64.decode(encoded);
    let [username, password] = creds.split(':');

    let userRecord = await users.validateBasic(username, password);

    req.token = userRecord.generateToken();
    req.user = userRecord;
    next();
  } catch (e) {
    console.log('Error occured in basicAuth', e);
    next('Invalid Login');
  }
};
