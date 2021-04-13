'use strict';

const express = require('express');
const router = express.Router();

const userModel = require('../models/users-model.js');
const bearerAuth = require('../middleware/bearer.js');
const can = require('../middleware/acl.js');
const authZero = require('../middleware/authzero.js');

router.get('/allUsers', bearerAuth, getAllUsers);
router.get('/secret', bearerAuth, handleSecretRoute);
router.get('/article', bearerAuth, can('update'), userCanUpdate);
router.get('/article', bearerAuth, can('create'), userCanCreate);
router.get('/article', bearerAuth, can('read'), userCanRead);

router.post('/authZero', authZero, handleAuthZero);

async function handleAuthZero(req, res, next) {
  try {
    let output = {
      token: req.token,
      user: req.user,
    };

    console.log('---------------------------------------------');
    console.log('Handle AuthZero is sending this to front end:', output);
    res.set('auth', req.token);
    res.status(200).json(output);
  } catch (e) {
    next(e.message);
  }
}

async function getAllUsers(req, res, next) {
  try {
    let allUsers = await userModel.find({});
    res.set('auth', req.token);
    res.status(200).json(allUsers);
  } catch (e) {
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

module.exports = router;
