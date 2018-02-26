const loadToken = require('./loadToken');

try {
    const data = loadToken('breakpoints');
    module.exports = {
        context: {
            breakpoints: data.props,
        },
    };

} catch (e) {
    console.log(e);
}

