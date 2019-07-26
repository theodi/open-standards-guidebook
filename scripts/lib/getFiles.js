const globby = require('globby');
const resolve = require('./resolve');

module.exports = (dir) => globby.sync(resolve(dir));
