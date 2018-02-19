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

// Collate components by default
fractal.components.set('default.collated', true);
// Wrapping each in a padded div
fractal.components.set('default.collator', function(markup, item) {
    return `<!-- Start: @${item.handle} -->\n
            <div style="padding-bottom:20px">\n
                ${markup}\n
            </div>\n
            <!-- End: @${item.handle} -->\n`
});
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
