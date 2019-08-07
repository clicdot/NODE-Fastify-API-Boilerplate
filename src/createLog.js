'use strict';

const fs = require('fs');

const create = async (logpath) => {
  if (!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs');
  }
  if (!fs.existsSync(logpath)) {
    await fs.writeFile(logpath, 'Create Log File: ' + new Date() + '\n', function (err) {
      if (err) console.log(err);
      console.log('Log File is created successfully.');
    });
  }
};

module.exports = create;
