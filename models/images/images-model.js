'use strict';

const Model = require('../mongo.js');
const schema = require('./images-schema.js');

class Images extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Images;
