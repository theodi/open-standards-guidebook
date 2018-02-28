const loadToken = require('./loadToken');

try {
    const data = loadToken('colours');
    module.exports = {
        context: {
            colours: data.props,
        },
    };

} catch (e) {
    console.log(e);
}

