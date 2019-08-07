'use strict';

const { test } = require('tap');
const { build } = require('../../helper');

test('token route', async (assert) => {
  const app = build(assert);

  const res = await app.inject({
    method: 'POST',
    url: '/token',
    payload: { companyId: 12345 }
  });

  const response = JSON.parse(res.payload);

  assert.deepEqual(response.response.function, { method: 'POST', url: '/token', ip: '127.0.0.1' }, 'Test function');
  assert.ok(response.data, 'Token value');
  assert.end();
});
