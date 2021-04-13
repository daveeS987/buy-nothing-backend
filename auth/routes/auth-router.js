'use strict';

const express = require('express');
const router = express.Router();

const authZero = require('../middleware/authzero.js');

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

module.exports = router;
