'use strict';

const Fastify = require('fastify');
const fp = require('fastify-plugin');
const pino = require('pino');
require('./environment/env');
const logpath = './logs/error.log';

require('./createLog')(logpath);

const logger = pino({ level: 'info' }, logpath);

const app = require('./app');

const start = async () => {
  try {
    const fastify = Fastify({
      logger,
      file: './logs/error.log',
      pluginTimeout: 10000
    })
      .register(fp(app));

    //
    await fastify.listen(process.env.PORT, '0.0.0.0', (err, address) => {
      if (err) throw err;
      console.log(`server listening on ${address}`);
    });

    fastify.blipp();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
