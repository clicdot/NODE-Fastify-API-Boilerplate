'use strict';

const { test } = require('tap');
const { build } = require('../../../../helper');

test('help route', async (assert) => {
  const app = build(assert);

  const res = await app.inject({
    method: 'GET',
    url: '/api/v1/help'
  });

  const { response, data } = JSON.parse(res.payload);

  assert.equal(response.code, 200, 'Success');
  assert.deepEqual(response.function, { method: 'GET', url: '/api/v1/help', ip: '127.0.0.1', apiVersion: 'v1' }, 'Test function');
  assert.ok(data.endpoints, 'Endpoints Exist');
  assert.ok(data.endpoints.token, 'Endpoint token Exist');
  assert.ok(data.endpoints.v1, 'Endpoints v1 Exist');
  assert.ok(data.endpoints.v2, 'Endpoints v2 Exist');
  assert.end();
});
