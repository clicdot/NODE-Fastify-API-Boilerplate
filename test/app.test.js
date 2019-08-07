'use strict';

const { test } = require('tap');
const { build } = require('./helper');
const cheerio = require('cheerio');

// const db = require('../src/plugins/dbconnector');

const R = require('../src/helpers/response');
const uuidv4 = require('uuid/v4');

test('GET /', async (assert) => {
  const app = build(assert);
  assert.plan(3);

  const root = await app.inject({
    method: 'GET',
    url: '/',
    headers: {
      'Content-type': 'application/json'
    }
  });

  const res = JSON.parse(root.payload);

  assert.equal(res.response.code, 404);
  assert.same(root.headers['content-type'], 'application/json; charset=utf-8', 'Match content-type header');
  assert.same(res.response.messages.errors[0], 'not found', 'Retrieve response error message');
  assert.end();
});

test('GET /swagger-ui/', async (assert) => {
  const app = build(assert);

  const swagger = await app.inject({
    method: 'GET',
    url: '/swagger-ui/',
    headers: {
      'Content-type': 'text/html'
    }
  });

  const $ = cheerio.load(swagger.payload);

  assert.same($('title').text(), 'Swagger UI', 'Title');
  assert.end();
});

test('Response Handler', (assert) => {
  const res = new R();

  const ts = new Date();
  const uuid = uuidv4();

  const req = {
    raw: {
      method: 'GET',
      url: '/',
      ip: '127.0.0.1'
    },
    hostname: 'localhost',
    appVersion: 'v1'
  };

  const rep = {
    statusCode: 200
  };

  const set = {
    response: {
      code: null,
      id: null,
      timestamp: null,
      function: {},
      messages: {
        errors: [],
        warnings: [],
        infos: [
          'hello world'
        ]
      },
      test: []
    },
    data: []
  };

  res.$init(req, rep);

  res.$inject('timestamp', ts);
  res.$inject('id', uuid);
  res.$data(1);

  const response = res.$send();
  res.__deleteNulls(set);

  assert.equal(response.data, 1);
  assert.equal(response.response.code, 200, 'code');
  // assert.same(response.response.timestamp, ts, 'Timestamp');
  assert.ok(response.response.function.apiVersion, 'API Version');
  assert.equal(response.response.id, uuid);
  assert.end();
});
