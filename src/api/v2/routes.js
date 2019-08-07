'use strict';

const path = require('path');
const AutoLoad = require('fastify-autoload');

module.exports = (fastify, opts, next) => {
  fastify.addHook('onRequest', (request, reply, next) => {
    request.appVersion = 'v2';

    next();
  });
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  });

  // This loads all plugins defined in services
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'controllers'),
    options: Object.assign({ prefix: 'api/v2' }, opts)
  });

  // Make sure to call next when done
  next();
};
