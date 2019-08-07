const appRoot = require('app-root-path');

const dotenv = require('dotenv').config({
  path: appRoot + '/.env'
});

module.exports = dotenv;
