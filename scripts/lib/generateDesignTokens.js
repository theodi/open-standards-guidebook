const getFiles = require('./getFiles');
const transformDesignToken = require('./transformDesignToken');

module.exports = () => getFiles('design/*.yml').map(filePath => transformDesignToken(filePath, { abs: true }));
