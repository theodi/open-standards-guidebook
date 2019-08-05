const fs = require('fs');
const path = require('path'); // eslint-disable-line import/no-extraneous-dependencies
const theo = require('theo');

const resolve = require('./resolve');

module.exports = (filePath, opts) => {
    const {
        abs,
    } = {
        abs: false,
        ...opts,
    };

    const filename = path.basename(filePath);
    const slug = filename.split('.')[0];

    theo.convert({
        transform: {
            type: "web",
            file: abs ? filePath : resolve(`design/${filePath}`),
        },
        format: {
            type: "map.scss"
        }
    })
    .then(scss => {
        fs.writeFileSync(resolve(`assets/styles/design/${slug}.map.scss`), scss);
        console.log(`Wrote design token ${slug} to Scss`);
    });
}
