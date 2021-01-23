'use strict';

require('dotenv').config();
let mongoose = require('mongoose');
let server = require('./server.js');

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

server.start(process.env.PORT);
