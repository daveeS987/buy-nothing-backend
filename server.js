'use strict';

const express = require('express');
const cors = require('cors');

const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');
const timeStamp = require('./middleware/timestamp.js');
const logger = require('./middleware/logger.js');
const authRoutes = require('./auth/routes/auth-router.js');
const v1Routes = require('./api/v1.js');
const v2Routes = require('./api/v2.js');

const app = express();

app.use(timeStamp);
app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use('/api/v1/', v1Routes);
app.use('/api/v2/', v2Routes);

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  app,
  start: (port) => app.listen(port, console.log('up on', port)),
};
