const theo = require('gulp-theo');
const gulp = require('gulp');

const logStream = require('../lib/log-stream');
const tokenFiles = require('../lib/get-token-files');
const resolve = require('../lib/resolve');


module.exports = (dest, format = 'json', debug = false) => {
  return () => {
    const stream = gulp.src(
      tokenFiles
      // @TODO why isn't glob expansion working here?
      // [
      // // Look for yml files
      // 'design/*.ya?ml',
      // // Exclude partials (files prefixed with _)
      // '!design/_*',
      // ]
    )
    .pipe(theo.plugin({
      transform: { type: 'web' },
      format: { type: format }
    }))
    .pipe(gulp.dest(resolve(dest)));
    if (debug) {
      stream.on('data', logStream);
    }
  }
}
