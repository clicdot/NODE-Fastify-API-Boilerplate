module.exports = (params) => {
  return {
    schema: {
      response: {
        'xxx': {
          type: 'object',
          properties: {
            response: 'responseMain#',
            data: params
          }
        }
      }
    }
  };
};
