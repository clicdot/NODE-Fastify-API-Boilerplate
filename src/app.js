'use strict';

const path = require('path');
const xssFilter = require('x-xss-protection');
const AutoLoad = require('fastify-autoload');
// require('./environment/env');

/**
 * Swagger Configuration
 * JSON Export
 */
const swagger = require('./swagger/swagger.json');

module.exports = (fastify, opts, next) => {
  fastify
    .register(require('fastify-blipp'))
    .register(require('fastify-helmet'))
    .register(require('fastify-cors'))
    .register(require('fastify-compress'))
    .register(require('fastify-jwt'), {
      secret: process.env.JWT_SECRET || 'youshouldspecifyalongsecret'
    })
    .use(xssFilter())
    .register(require('./helpers/swagger-ui'), {
      // swagger specification which should be exposed
      specification: {
        type: 'file',
        path: '/src/swagger/swagger20-with-extensions.json'
      },
      // path under which swagger-ui will be available
      path: 'swagger-ui'
    })
    .register(require('fastify-swagger'), Object.assign({}, swagger))

    // Auto Load Middleware
    .register(AutoLoad, {
      dir: path.join(__dirname, 'middleware')
    })

    // Serve static swagger ui
    .get('/swagger-ui/', (req, reply) => {
      reply.send();
    })

    // Auto Loads Schema Definitions and Models
    .register(require('./helpers/schemaAutoLoader'))

    .register(AutoLoad, {
      dir: path.join(__dirname, 'plugins')
    })

    // Auto Load Controllers
    .register(AutoLoad, {
      dir: path.join(__dirname, 'controllers')
    })

    /**
     * Version 1: File Upload API
     */
    .register(
      require('./api/v1/routes'),
      { options: process.env }
    )

    /**
     * Version 2: File Upload API
     * For guidance purposes only.
     */
    .register(
      require('./api/v2/routes')
    )
  ;

  next();
};
