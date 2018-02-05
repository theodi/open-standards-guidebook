## Configuring the build process

This file contains two files for configuring different aspects of the build process.

### Configuring file structure

`path-config.json`

File structure is configured through a **config/path-config.json** file. This file is JSON so that other platforms like Ruby or PHP can easily read it in and use it to build asset path helpers for replacing hashed filenames in production.

This file specifies the `src` and `dest` root directories, and `src` and `dest` for each task, relative to the configured root.


### Configuring tasks

`task-config.js`

Specific task configuration is done through **config/task-config.js**. 

This file exposes per-task configuration and overrides. At minimum, you just need to set the task to `true` to enable the task with its default configuration. If you wish to configure a task, provide a configuration object instead.

- Any task may be disabled by setting the value to `false`.
- All asset tasks have an `extensions` option that can be used to overwrite the that are processed and watched.
- The `html` and `stylesheets` tasks may be replaced via their `alternateTask` options



## Javascript

Under the hood, JS is compiled with webpack 3 with a heavily customized webpack file to get you up and running. An API for configuring some of the most commonly accessed options are exposed, along with some other helpers for scoping to environment. Additionally, you can get full access to modify Blendid's `webpackConfig` via the [`customizeWebpackConfig`](#customizewebpackconfig) option.

### `entry` (required)
Discrete js bundle entry points. A js file will be bundled for each item. Paths are relative to the `javascripts` folder. This maps directly to `webpackConfig.entry`.

### `publicPath`
The public path to your assets on your server. Only needed if this differs from the result of `path.join(PATH_CONFIG.dest, PATH_CONFIG.javascripts.dest)`. Maps directly to `webpackConfig.publicPath`

### `devtool`
Sets the webpack devtool option in development mode. Defaults to `eval-cheap-module-source-map`, one of the fastest source map options. To enable sourcemaps in production builds, use `customizeWebpackConfig`](#customizeWebpackConfig).

### `babel`
Object to overwrite the default Babel loader config object. This defaults to `{ presets:  [["es2015", { "modules": false }], 'stage-1'] }`. Same format as a `.babelrc` file. See [#380](https://github.com/vigetlabs/gulp-starter/issues/380).

### `babelLoader`
Object to extend the default config for _entire_ Babel loader object. See [webpack loader documentation](https://webpack.js.org/concepts/loaders/) for details.

### `provide`
Key value list of variables that should be provided for modules to resolve dependencies on import using [webpack.ProvidePlugin](https://webpack.github.io/docs/list-of-plugins.html#provideplugin). A common example is making jQuery available to all modules (jQuery plugins need this). In that scenario, with `jquery` installed via `yarn`, add this to your javascripts config:

```js
provide: {
  $: "jquery",
  jQuery: "jquery"
}
```

Under the hood, this gets passed directly to [webpack.ProvidePlugin](https://webpack.github.io/docs/list-of-plugins.html#provideplugin) in the webpack config.

```js
plugins: [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  })
]
```

### `plugins`
Define additional webpack plugins that should be used in all environments

### `loaders`
Define additional webpack loaders that should be used in all environments. Adds to `webpackConfig.module.rules`

### `development`, `production`
Specify additional environment specific configuration to be merged in with Blendid's defaults

- [`devtool`](https://webpack.js.org/configuration/devtool/#devtool)
- [`plugins`](https://webpack.js.org/concepts/plugins/)
- [`loaders`](https://webpack.js.org/concepts/loaders/)

_Production Only:_

- [`uglifyJsPlugin`](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/#options)
- [`definePlugin`](https://webpack.js.org/plugins/define-plugin)

Note that if `devtool` is set in production, Blendid will automatically[set to `uglifyJsPlugin.sourceMap` to `true`](https://github.com/webpack/webpack/issues/2704#issuecomment-228860162).

**Example:**

```js
production: {
  devtool: 'hidden-source-map',
  uglifyJsPlugin: {
    extractComments: true
  },
  definePlugin: {
    SOME_API_KEY: 'abcdefg'
  },
  plugins: (webpack) => { return [ new webpack.IgnorePlugin(/jsdom$/) ] },
  loaders: [] // Adds to `webpackConfig.module.rules`
}
```

By default, the `env` will be `"development"` when running `yarn run blendid`, and `"production"` when running `yarn run blendid -- build`.

#### `hot`
By default, webpack HMR will simply will do a full browser refresh when your js files change. If your code takes advantage of [hot module replacement methods](https://webpack.github.io/docs/hot-module-replacement.html), modules will be hot loaded.

*Defaults to:*

```js
hot: {
  enabled: true,
  reload: true,
  quiet: true,
  react: false
}
```

**If you're using React** `yarn add react-hot-loader@next` and set `react: true` to enable [react-hot-loader 3](https://github.com/gaearon/react-hot-loader/tree/next). [Follow the docs](https://github.com/gaearon/react-hot-loader/tree/next/docs#webpack-2) and update your React app to take advantage.


### `customizeWebpackConfig`
In the event that an option you need is not exposed, you may access, modify and return a further customized webpackConfig by providing this option as a function. The function will receive the Blendid `webpackConfig`, `env` and `webpack` as params. The `env` value will be either `development` (`yarn run blendid`) or `production` (`yarn run blendid -- build`).

```js
customizeWebpackConfig: function (webpackConfig, env, webpack) {
  if(env === 'production') {
    webpackConfig.devtool = "nosources-source-map"
  }

  return webpackConfig
}
```

**CAUTION!** Avoid overwriting `webpackConfig.entry` or `webpackConfig.plugins` via this function, and rely on the `entry` and `plugins` options above to avoid breaking Blendid's hot-loading and file revisioning setup ([view source](https://github.com/vigetlabs/gulp-starter/blob/master/gulpfile.js/lib/webpack-multi-config.js)).

## Stylesheets

[Sass](http://sass-lang.com/) (`.scss` and `.sass`)  will be automatically compiled, but plain CSS will still work too.

#### `autoprefixer`
Sass gets run through [Autoprefixer](https://github.com/postcss/autoprefixer), so don't prefix! Use this option to pass configuration. Defaults to `{ browsers: ["last 3 versions"]`.

#### `sass`
Options to pass to [node-sass](https://github.com/sass/node-sass#options).

Defaults to `{ includePaths: ["./node_modules"]}` so you can `@import` files installed to `node_modules`.

### html


**Note:** If you are on a platform that's already handing compiling html (Wordpress, Craft, Rails, etc.), set `html: false` or delete the configuration object completely from `task-config.js`. If that's the case, don't forget to use the Browsersync [`files` option](https://browsersync.io/docs/options#option-files) in the `browserSync` config object to start watching your templates folder.

Blendid can work with straight HTML, but it will also compile [Nunjucks](https://mozilla.github.io/nunjucks/), a Jinja/Django-like templating language similar to Twig (used by Craft and Synfony), Liquid (used by Shopify), and the no longer maintained Swig.

#### `nunjucksRender`
Pass options directly to [`gulp-nunjucks-render`](https://github.com/carlosl/gulp-nunjucks-render#options). For example, you can add custom Nunjucks filters via the `manageEnv` option.

```js
html: {
  nunjucksRender: {
    manageEnv: function(env) {
      env.addFilter('excited', function(input) {
        return (input + '!')
      })
    }
  }
}
```

#### `dataFunction`
[gulp-data](https://github.com/colynb/gulp-data) `dataFunction` used provide data to templates. Defaults to reading a in a global JSON, specified by the `dataFile` option.

#### `dataFile`
A path to a JSON file containing data to use in your Nunjucks templates via [`gulp-data`](https://github.com/colynb/gulp-data).

#### `htmlmin`
[Options](https://github.com/kangax/html-minifier#options-quick-reference) to pass to [`gulp-htmlmin`](https://github.com/jonschlinkert/gulp-htmlmin).

#### `excludeFolders`
You'll want to exclude some folders from being compiled directly. This defaults to: `["layouts", "shared", "macros", "data"]`

#### `alternateTask`
If you're not a nunjucks fan, or for whatever reason, want to use your own task for compiling your html, you may use the `alternateTask` option to return an alternate function to run as the `html` task.

```js
html: {
  alternateTask: function(gulp, PATH_CONFIG, TASK_CONFIG) {
    // Jade task instead of Nunjucks
    return function() {
      gulp
        .src('./lib/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./dist/'))    }
  }
}
```

### static
There are some files that belong in your root destination directory that you won't want to process or revision in production. Things like [favicons, app icons, etc.](http://realfavicongenerator.net/) should go in `src/static`, and will get copied over to `public` as a last step (after revisioning in production). *Nothing* should ever go directly in `public`, since it gets completely trashed and re-built when running the `default` or `production` tasks.

#### `srcOptions`
Options passed to `gulp.src`. See [gulp documentation](https://github.com/gulpjs/gulp/blob/master/docs/API.md#options) for details. Defaults to:

```js
static: {
  srcOptions: {
    dot: true // include dotfiles
  }
}
```

### fonts, images
These tasks simply copy files from `src` to `dest` configured in `path-config.json`. Nothing to configure here other than specifying extensions or disabling the task.

The image task previously ran through image-min, but due to the size of the package and the fact it doesn't need to be run every time - it was removed. The current recommendation is to install [imagemin-cli](https://github.com/imagemin/imagemin-cli) globally and running it on your source files periodically. If you prefer GUIs, you can try [ImageOptim](https://imageoptim.com/mac) instead.

### ghPages
You can deploy the contents your `dest` directly to a remote branch (`gh-pages` by default) with `yarn run blendid -- ghPages`. Options specified here will get passed directly to [gulp-gh-pages](https://github.com/shinnn/gulp-gh-pages#ghpagesoptions).

### svgSprite
Generates an SVG Sprite from svg files in `src/icons`! You can either include the created SVG directly on the page and reference the icon by id like this:

```html
  <svg viewBox="0 0 1 1"><use xlink:href='#my-icon'></use></svg>
```

or reference the image remotely.

```html
<svg viewBox="0 0 1 1"><use xlink:href='images/spritesheets/sprites.svg#my-icon'></use></svg>
```
If you reference the sprite remotely, be sure to include something like [inline-svg-sprite](https://github.com/vigetlabs/inline-svg-sprite) or [svg4everybody](https://github.com/jonathantneal/svg4everybody) to ensure external loading works on Internet Explorer.

Blendid includes a helper which generates the required svg markup in `src/html/macros/helpers.html`, so you can just do:

```twig
  {{ sprite('my-icon') }}
```

which spits out:

```html
  <span class='sprite -my-icon'>
    <svg viewBox="0 0 1 1"><use xlink:href='images/spritesheets/sprites.svg#my-icon'></use></svg>
  </span>
```

This particular setup allows styling 2 different colors from your CSS. You can have unlimited colors hard coded into your svg.

In the following example, the first path will be `red`, the second will be `white`, and the third will be `blue`. Paths **without a fill attribute** will inherit the `fill` property from CSS. Paths with `fill="currentColor"` will inherit the current CSS `color` value, and hard-coded fills will not be overwritten, since inline styles trump CSS values.

```sass
.sprite
  fill: red
  color: white
```

```svg
  <svg xmlns="http://www.w3.org/2000/svg">
    <path d="..."/>
    <path fill="currentColor" d="..."/>
    <path fill="blue" d="..."/>
  </svg>
```

I recommend setting up your SVGs on a 500 x 500 canvas, centering your artwork, and expanding/combining any shapes of the same color. This last step is important. [Read more on SVG optimization here!](https://www.viget.com/articles/5-tips-for-saving-svg-for-the-web-with-illustrator)

### clean

```js
clean: {
  patterns: [
    path.resolve(process.env.PWD, 'dist/assets'),
    path.resolve(process.env.PWD, 'dist/templates')
  ]
}

By default, the entire `dest` directory is deleted before each build. By setting the `clean.patterns` option, you can specify which directory or directories (using globbing syntax) should be deleted instead. Use this if you have subdirectories within the `dest` directory that should be left alone (media uploaded through a CMS, say).

### production
By default, filenames are revisioned when running the production `build` task. If you want to disable this behavior, you can set `rev` to false.

```js
production: {
  rev: false
}
```

### additionalTasks
If you wish to define additional gulp tasks, and have them run at a certain point in the build process, you may use this configuration to do so via the following config object:

```js
additionalTasks: {
  initialize(gulp, PATH_CONFIG, TASK_CONFIG) {
    // Add gulp tasks here
  },
  development: {
    prebuild: [],
    postbuild: []
  },
  production: {
    prebuild: [],
    postbuild: []
  }
}
```

Blendid will call `initialize`, passing in `gulp`, along with the path and task configs. Use this method to define or `require` additional gulp tasks. You can specify when and in what order your custom tasks should run in the `production` and `development` `prebuild` and `postbuild` options.

For example, say you had a sprite task you wanted to run before your css compiled, and in production, you wanted to run an image compression task you had after all assets had been compiled. Your configuration might look something like this:

```
additionalTasks: {
  initialize(gulp, PATH_CONFIG, TASK_CONFIG) {
    gulp.task('createPngSprite', function() {
      // do stuff
    })
    gulp.task('compressImages', function() {
      // compress all the things
    })
  },
  development: {
    prebuild: ['createPngSprite'],
    postbuild: []
  },
  production: {
    prebuild: ['createPngSprite'],
    postbuild: ['compressImages']
  }
}
```

# FAQ

## Can I customize and add Gulp tasks?
Yep! See [additionalTasks](#additionaltasks), as well as the `task` option of the [`stylesheets`](stylesheets) and [`html`](html) configs.

## I don't see JS files in my dest directory during development
JS files are compiled and live-updated via Browsersync + webpack Dev Middleware + webpack Hot Middleware. That means you won't actually see `.js` files output to your destination directory during development, but they will be available to your browser running on the Browsersync port.
