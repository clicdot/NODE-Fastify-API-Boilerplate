module.exports = {
  $id: 'helpData',
  type: 'object',
  properties: {
    endpoints: {
      type: 'object',
      properties: {
        token: {
          type: 'object',
          properties: {}
        },
        v1: {
          type: 'object',
          properties: {
            help: {
              type: 'object'
            },
            root: {
              type: 'object'
            },
            upload: {
              type: 'object'
            },
            uploadws: {
              type: 'object'
            }
          }
        },
        v2: {
          type: 'object',
          properties: {
            root: {
              type: 'object'
            }
          }
        }
      }
    }
  }
};
