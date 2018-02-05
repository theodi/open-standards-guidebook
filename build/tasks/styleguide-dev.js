const fractal = require('../fractal-config');

const logger = fractal.cli.console;

module.exports = function(){
    const server = fractal.web.server({
      port: 4000,
      sync: true,
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });
}
