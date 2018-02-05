const path = require('path');

module.exports = (subPath) => path.resolve(process.env.PWD, subPath);
