const loadToken = require('./loadToken');

try {
    const data = loadToken('spacing');
    module.exports = {
        context: {
            spacing: data.props,
        },
    };

} catch (e) {
    console.log(e);
}

