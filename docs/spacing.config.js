const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

let data;

const filePath = path.resolve(__dirname, '../design/spacing.yml');

try {
    data = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));

    module.exports = {
        context: {
            spacing: data.props,
        },
    };

} catch (e) {
    console.log(e);
}

