'use strict';

const fp = require('fastify-plugin');
// require('../environment/env');

module.exports = fp(async (fastify, opts) => {
  // fastify
  // `fastify-mongodb` makes this connection and store the database instance into `fastify.mongo.db`
  // See https://github.com/fastify/fastify-mongodb
  // .register(require('fastify-mongodb'), { url: process.env.MONGODB_URL, useNewUrlParser: true })
  // `fastify-mysql` makes this connection and store the database instance into `fastify.mysql`
  // See https://github.com/fastify/fastify-mysql
  // .register(require('fastify-mongodb'), { url: process.env.MONGODB_URL, useNewUrlParser: true })
  // `fastify-elasticsearch` makes this connection and store the database instance into `fastify.mysql`
  // See https://github.com/fastify/fastify-elasticsearch
  // .register(require('fastify-elasticsearch'), { host: process.env.ELAST_HOST, port: process.env.ELAST_PORT })
  // `fastify-redis` makes this connection and store the database instance into `fastify.redis`
  // See https://github.com/fastify/fastify-redis
  // .register(require('fastify-redis'), { url: process.env.REDIS_HOST });
});
