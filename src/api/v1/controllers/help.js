'use strict';

const responseSchema = require('../../../schemas/response');
const helpDoc = require('../../../json/help.v1.json');

module.exports = async (fastify, opts) => {
  fastify.get('/help', responseSchema('testData#'), async (request, reply) => {
    reply.statusCode = 200;
    reply
      .code(reply.statusCode)
      .send(helpDoc);
  });
};
