module.exports = {
  $id: 'testMsg',
  type: 'object',
  properties: {
    errors: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    warnings: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    infos: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
};
