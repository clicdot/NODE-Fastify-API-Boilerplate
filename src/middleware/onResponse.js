'use strict';

const fp = require('fastify-plugin');

module.exports = fp(async (fastify, opts) => {
  fastify
    .addHook('onResponse', (request, reply, next) => {
      // console.log('ONREQUEST', request.headers);
      next();
    });
});
