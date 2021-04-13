'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const listings = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  creatorUserName: { type: String, required: true },
  creatorUserId: { type: String, required: true },
  categories: { type: String, required: true },
  location: { type: String, required: true },
  itemStatus: { type: Boolean, required: true },
  comments: [],
  commentors: [],
});

module.exports = mongoose.model('listings', listings);
