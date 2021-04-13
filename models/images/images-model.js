'use strict';

const Model = require('../mongo.js');
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const images = mongoose.Schema({
  url: { type: String },
  // description: { type: String },
});

const schema = mongoose.model('images', images);

class Images extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Images;
