'use strict';

const userModel = require('../models/users-model.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { 
    next('Invalid Login'); 
  }
  try {
    const token = req.headers.authorization.split(' ').pop();
    const validUser = await userModel.authenticateWithToken(token);
    req.user = validUser;
    req.token = token;
    next();
  } catch (e) {
    console.log('Error from Bearer Auth', e);
    next('Invalid Login');
  }
};
