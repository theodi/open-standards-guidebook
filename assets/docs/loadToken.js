const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

let data;


module.exports = function(token) {
    const tokenPath = '../../design/' + token + '.yml';

    const absPath = path.resolve(__dirname, tokenPath);

    const file = fs.readFileSync(absPath, 'utf8');

    data = yaml.safeLoad(file);

    return data;
}

