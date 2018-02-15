const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const path = require('path');
const watch = require('gulp-watch');

const tokensScssTask = require('./tasks/tokens-scss');
const tokensJsonTask = require('./tasks/tokens-json');

const styleguideDevTask = require('./tasks/styleguide-dev');
const styleguideBuildTask = require('./tasks/styleguide-build');

const sassImporter = require('node-sass-magic-importer');

const resolve = require('./lib/resolve');

module.exports = {
  html: false,
  images: true,
  fonts: false,
  static: false,
  svgSprite: true,
  ghPages: false,
  stylesheets: {
    autoprefixer: {
      browsers: ["last 3 versions"]
    },
    sass: {
      includePaths: [
        "./node_modules"
      ],
      importer: sassImporter(),
    },
    extensions: ["sass", "scss", "css"]
  },


  // Define additional webpack loaders that should be used in all environments. Adds to webpackConfig.module.rules
  // loaders:

  // JS Config
  javascripts: {
    // Discrete js bundle entry points. A js file will be bundled for each item. Paths are relative to the javascripts folder. This maps directly to webpackConfig.entry.
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: [
        'babel-polyfill',
        './main.js'
      ],
    },
    publicPath: "/dist/js",
    extensions: ['js', 'vue', 'json'],
    alias: {
      '@': resolve('src/js'),
    },
    // The public path to your assets on your server. Only needed if this differs from the result of path.join(PATH_CONFIG.dest, PATH_CONFIG.javascripts.dest). Maps directly to webpackConfig.publicPath
    // publicPath: 'public',
    loaders: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        include: [resolve('src')],
        exclude: [resolve('node_modules')],
        enforce: 'pre',
        options: {
          formatter: eslintFriendlyFormatter
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.ya?ml$/,
        loader: 'yml-loader'
      },
    ]
  },

  // Options to pass to Browsersync.
  browserSync: {
    // server: {
    //   // should match `dest` in
    //   // path-config.json
    //   baseDir: 'public'
    // },
    files: ["design/*.yml", "dist/*.html"],
    proxy: "http://localhost:4000",
  },
  // Specify additional environment specific configuration to be merged in with Blendid's defaults
  production: {
    rev: false, // revision filenames when running the production `build` task?
    devtool: 'source-map',
    // plugins: [], // production only webpack plugins
  },
  // development: {},
  // customizeWebpackConfig(webpackConfig, env, webpack) {
  //   return webpackConfig;
  // },

  // Additional Tasks
  //
  // If you wish to define additional gulp tasks, and have them run at a certain point in the build process, you may use this configuration to do so via the following config object:
  //
  additionalTasks: {
    initialize(gulp, PATH_CONFIG, TASK_CONFIG) {
      gulp.task('tokensScss', tokensScssTask);
      gulp.task('tokensJson', tokensJsonTask);

      gulp.task('styleguideDev', styleguideDevTask);
      gulp.task('styleguideBuild', styleguideBuildTask);

      // add a custom watch for token tasks in development
      if (process.env.NODE_ENV !== 'production') {
        watch(resolve('design'), {}, tokensScssTask);
        watch(resolve('design'), {}, tokensJsonTask);
      }

    },
    development: {
      prebuild: ['styleguideDev'],
    //   postbuild: []
    },
    production: {
      prebuild: ['tokensScss', 'tokensJson'],
    //   postbuild: []
    }
  }
}
