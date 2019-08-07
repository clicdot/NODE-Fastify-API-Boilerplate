'use strict';

const fp = require('fastify-plugin');
const R = require('../helpers/response');

const schema = {
  schema: {
    response: {
      '200': {
        type: 'object',
        properties: {
          response: 'responseMain#'
        }
      }
    }
  }
};

module.exports = fp(async (fastify, opts) => {
  const resp = new R();
  fastify.setNotFoundHandler(schema, (request, reply) => {
    reply.statusCode = 404;
    resp.$init(request, reply);
    resp.$msg('errors', ['not found']);
    reply
      .code(404)
      .send({
        errors: ['not found']
      });
  });
});
