const path = require('path');

const pathConfig = require('./path-config.json');

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = require('@frctl/fractal').create();
const mandelbrot = require('@frctl/mandelbrot');

const srcPath = path.resolve(__dirname, '..', pathConfig.src);
const publicPath = path.resolve(__dirname, '..', pathConfig.dest);

/**
 * Shared
 */

// Set the title of the project
fractal.set('project.title', 'Open Standards for Data Component Library');

/**
 * Components
 */

// Set path to components
fractal.components.set('path', path.join(srcPath, 'assets/components'));

// Set default preview layout
fractal.components.set('default.preview', '@preview');

// Use nunchucks
fractal.components.engine('@frctl/nunjucks');
fractal.components.set('ext', '.html');

/**
 * Docs
 */

// Set path to documentation pages
fractal.docs.engine('@frctl/nunjucks');
fractal.docs.set('ext', '.md');
fractal.docs.set('path', path.join(srcPath, 'docs'));


/**
 * Web
 */


// Where the generated static assets will be
fractal.web.set('static.path', publicPath);
// prefix static asset URLs
fractal.web.set('static.mount', 'dist');

// Where to output the built (static HTML) styleguide
fractal.web.set('builder.dest',  path.resolve(__dirname, '../styleguide'));


// Fractal BS opts
fractal.web.set('server.syncOptions', {
    open: true,
    notify: true,
});

/**
 * Theme
 */
fractal.web.theme(mandelbrot({
  skin: 'default',
  format: 'yaml',
}));

module.exports = fractal;
