'use strict';

const Model = require('../mongo.js');
const schema = require('./listings-schema.js');

class Listings extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Listings;
