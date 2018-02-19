const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

let palette;

const filePath = path.resolve(__dirname, '../design/colours.yml');

try {
    palette = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));

    module.exports = {
        context: {
            palette: palette.props,
        },
    };

} catch (e) {
    console.log(e);
}

