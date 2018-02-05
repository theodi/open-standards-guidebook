const resolve = require('./resolve');
const pathConfig = require('../path-config.json');

module.exports = pathConfig.design.files.map(f => resolve(`design/${f}`));
