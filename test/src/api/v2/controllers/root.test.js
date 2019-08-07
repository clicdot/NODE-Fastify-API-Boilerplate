'use strict';

const { test } = require('tap');
const { build } = require('../../../../helper');

test('root test no access token route', async (assert) => {
  const app = build(assert);

  const res = await app.inject({
    method: 'GET',
    url: '/api/v2',
    headers: { Authorization: `Bearer badtoken` }
  });

  const { response } = JSON.parse(res.payload);

  assert.equal(response.code, 401, 'Failed Auth');
  assert.deepEqual(response.function, { method: 'GET', url: '/api/v2', ip: '127.0.0.1' }, 'Test function');
  assert.ok(response.messages.errors, 'Errors Exist');
  assert.same(response.messages.errors[0], 'Unauthorized', 'Unauthorized Error');
  assert.same(response.messages.errors[1], 'Authorization token is invalid: jwt malformed', 'Unauthorized Error');
  assert.end();
});

test('root test access token route', async (assert) => {
  const app = build(assert);

  const auth = await app.inject({
    method: 'POST',
    url: '/token',
    payload: { companyId: 12345 }
  });

  const { accessToken } = JSON.parse(auth.payload).data;

  const res = await app.inject({
    method: 'GET',
    url: '/api/v2',
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  const { response } = JSON.parse(res.payload);

  assert.equal(response.code, 200, 'Success');
  assert.deepEqual(response.function, { method: 'GET', url: '/api/v2', ip: '127.0.0.1', apiVersion: 'v2' }, 'Test function');
  assert.notOk(response.messages, 'Errors do not exist');
  assert.end();
});
