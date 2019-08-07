module.exports = {
  $id: 'responseMain',
  type: 'object',
  properties: {
    code: { type: 'number' },
    id: { type: 'string' },
    timestamp: { type: 'string', format: 'date-time' },
    function: 'responseFunction#',
    messages: 'responseMessage#'
  }
};
