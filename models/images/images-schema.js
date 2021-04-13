'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const images = mongoose.Schema({
  url: { type: String },
});

module.exports = mongoose.model('images', images);
