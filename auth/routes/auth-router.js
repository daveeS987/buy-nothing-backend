'use strict';

const express = require('express');
const router = express.Router();

const userModel = require('../models/users-model.js');
const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer.js');
const oAuth = require('../middleware/oauth.js');
const can = require('../middleware/acl.js');

router.post('/signup', handleSignUp);
router.post('/signin', basicAuth, handleSignIn);
router.get('/allUsers', bearerAuth, getAllUsers);
router.get('/secret', bearerAuth, handleSecretRoute);
router.get('/article', bearerAuth, can('update'), userCanUpdate);
router.get('/article', bearerAuth, can('create'), userCanCreate);
router.get('/article', bearerAuth, can('read'), userCanRead);
router.get('/oauth', oAuth, handleOAuthRoute);


async function handleSignUp(req, res, next) {
  try {
    let obj = {
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    };
    
    let record = new userModel(obj);
    let newUser = await record.save();
    let token = record.generateToken();
    
    let output = {
      token: token,
      user: newUser,
    };
    res.set('auth', token);
    res.status(200).json(output);
  } catch (e) {
    next(e.message);
  }
}

async function handleSignIn(req, res, next) {
  try {
    let object = {
      token: req.token,
      user: req.user,
    };
    res.set('auth', req.token);
    res.status(200).json(object);
  } catch(e) {
    next(e.message);
  }
}

async function getAllUsers(req, res, next) {
  try {
    let allUsers = await userModel.find({});
    res.set('auth', req.token);
    res.status(200).json(allUsers);
  } catch(e) {
    next(e);
  }
}

function handleSecretRoute(req, res, next) {
  res.status(200).send(`Welcome, ${req.user.username}, your token is valid`);
}

function userCanRead(req, res, next) {
  res.status(200).send('You can read it');
}

function userCanCreate(req, res, next) {
  res.status(200).send('You can create it');
}

function userCanUpdate(req, res, next) {
  res.status(200).send('You can update it');
}

async function handleOAuthRoute(req, res, next) {
  let output = {
    token: req.token,
    user: req.user,
  };
  res.status(200).json(output);
}


module.exports = router;
