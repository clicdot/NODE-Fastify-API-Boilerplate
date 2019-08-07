'use strict';

const fp = require('fastify-plugin');

const R = require('../helpers/response');

module.exports = fp(async (fastify, opts) => {
  fastify
    .addHook('onSend', (request, reply, payload, next) => {
      // console.log('REQUEST', request);
      const resp = new R();
      let nPayload;

      try {
        const payl = JSON.parse(payload);

        resp.$init(request, reply);
        // console.log('PAYLOAD', payl);
        // Handle standard fastify errors in new response format
        if (payl.hasOwnProperty('errors') || payl.hasOwnProperty('warnings') || payl.hasOwnProperty('infos')) {
          // console.log('ERRORS', Object.keys(payl));
          // resp.$msg()
          const keys = Object.keys(payl);
          let i = 0; const iMax = keys.length;

          for (; i < iMax; i++) {
            if (keys[i] !== 'code') {
              resp.$msg(keys[i], payl[keys[i]]);
            }
            if (keys[i] === 'code') {
              resp.$inject('code', payl[keys[i]]);
            }
          }
        // Process payload normally
        } else {
          resp.$data(payl);
          if (payl.hasOwnProperty('statusCode') && payl.statusCode >= 400) {
            resp.$inject('code', payl.statusCode);
            resp.$msg('errors', [payl.error, payl.message]);
            resp.$data([]);
          }
        }

        nPayload = JSON.stringify(resp.$send());
      } catch (err) {
        // Process static or straight HTML
        nPayload = payload;
      }

      next(null, nPayload);
    });
});
