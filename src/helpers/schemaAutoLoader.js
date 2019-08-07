'use strict';

const fs = require('fs');
const fp = require('fastify-plugin');
const path = require('app-root-path');

module.exports = fp(async (fastify, opts) => {
  const routePath = path + '/src/schemas/responseModels/';
  const routePath2 = path + '/src/schemas/dataModels/';
  fs.readdirSync(routePath).forEach((file) => {
    fastify.addSchema(require(routePath + file));
  });

  fs.readdirSync(routePath2).forEach((file) => {
    fastify.addSchema(require(routePath2 + file));
  });
});
