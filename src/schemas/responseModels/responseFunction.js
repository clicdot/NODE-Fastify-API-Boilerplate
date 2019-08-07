module.exports = {
  $id: 'responseFunction',
  type: 'object',
  properties: {
    method: { type: 'string' },
    url: { type: 'string' },
    ip: { type: 'string' },
    apiVersion: {
      type: 'string',
      enum: ['v1', 'v2']
    }
  }
};
