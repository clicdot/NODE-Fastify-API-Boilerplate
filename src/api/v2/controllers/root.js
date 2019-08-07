'use strict';

const responseSchema = require('../../../schemas/response');

module.exports = async (fastify, opts) => {
  fastify.addHook('onRequest', async (request, reply) => {

  });

  fastify.get('/', responseSchema('testData#'), async (request, reply) => {
    // request.log.error('Error 123: Something went wrong...');
    reply.statusCode = 200;
    reply
      .code(reply.statusCode)
      .send([]);
  });
};
