'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// taking out role: required: true temporarily for development
const users = mongoose.Schema({
  username: { type: String, required: true },
  userEmail: {type: String, required: true},
  role: { type: String, default: 'admin', enum: ['guest', 'author', 'editor', 'admin'] },
  myListings: [],
  followedListings: [],
});

// users.pre('save', async function () {
//   this.password = await bcrypt.hash(this.password, 5);
// });

const roles = {
  guest: ['read'],
  author: ['read', 'create'],
  editor: ['read', 'update', 'delete'],
  admin: ['read', 'create', 'update', 'delete'],
};

users.methods.can = function (capability) {
  return roles[this.role].includes(capability);
};


users.statics.validateBasic = async function (username, password) {
  let user = await this.findOne({ username: username });
  let isValid = await bcrypt.compare(password, user.password);

  if (isValid) { return user; }
  else { return undefined; }
};

users.statics.validateAuthZero = async function (userEmail) {
  try{
    let user = await this.findOne({ userEmail: userEmail });
    return user;
  }catch(e){
    console.log(e);
    return undefined;
  }
};


users.methods.generateToken = function () {
  let tokenObject = {
    username: this.username,
    role: this.role,
    permissions: roles[this.role],
  };
  let options = {
    expiresIn: 300,
  };
  let token = jwt.sign(tokenObject, process.env.SECRET, options);
  return token;
};



users.statics.authenticateWithToken = function (token) {
  const parsedToken = jwt.verify(token, process.env.SECRET);
  let user = this.findOne({ username: parsedToken.username });
  return user;
};

module.exports = mongoose.model('users', users);
