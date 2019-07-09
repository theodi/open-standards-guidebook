const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const whitelister = require("purgecss-whitelister");
const sane = require('sane');
const CopyPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

require('colors');

const pkg = require('./package.json');


if (!pkg.buildConfig) {
    console.error("Error: looks like this project hasn't been configured yet".red);
    console.info('run `yarn project:configure` to get started');
    process.exit();
}

const config = {
    https: false,
    host: 'localhost',
    port: pkg.buildConfig.ports.assets,
    watchDir: 'jekyll',
    // Whitelist selectors to stop purgecss from removing them from your CSS
    // You can pass in whole stylesheets to whitelist everything from thirdparty libs
    // Accepts string paths, array of strings, globby strings, or array of globby strings:
    // ["./node_modules/lib1/*.css", "./node_modules/lib2/*.scss"]
    purgecss: {
        whitelist: [],
        // Whitelist based on a regular expression.
        // Ex: [/red$/] (selectors ending in "red" will remain)
        // https://www.purgecss.com/whitelisting
        whitelistPatterns: [
            /-(leave|enter|appear)(|-(to|from|active))$/,
            /^(?!(|.*?:)cursor-move).+-move$/,
            /^router-link(|-exact)-active$/,
            /--/,
        ],
        cssFileExtensions: ['css', 'less', 'pcss', 'postcss', 'sass', 'scss', 'styl'],
        cssUserFileExtensions: ['html', 'md', 'vue'],
    },
};

module.exports = {
    runtimeCompiler: false,
    outputDir: 'jekyll/dist',
    filenameHashing: process.env.NODE_ENV === 'production',

    css: {
        sourceMap: true,
    },

    devServer: {
    // Uncommenting these will lose the "Network" app access
    // host: config.host,
        port: config.port,
        https: config.https,
        clientLogLevel: 'info',
        headers: { 'Access-Control-Allow-Origin': '*' },
        disableHostCheck: true,
        before(app, server) {
            const watcher = sane(path.join(__dirname, config.watchDir), { glob: ['**/*'] });
            watcher.on('change', (filepath) => {
                console.log('  File saved:', filepath);
                server.sockWrite(server.sockets, 'content-changed');
            });
        },
    },

    configureWebpack: {
        plugins: [
            new CopyPlugin([
                {
                    context: 'assets/images',
                    from: '**/*{.gif,.jpg,.jpeg,.png,.svg}',
                    to: isProduction ? 'img/[path][name].[contenthash:8].[ext]' : 'img/[path][name].[ext]',
                    toType: 'template',
                },
            ]),
            new ManifestPlugin({
                publicPath: '/dist/',
                map: (file) => {
                    if (isProduction) {
                        // Remove hash in manifest key
                        /* eslint-disable no-param-reassign */
                        file.name = file.name.replace(/(\.[a-f0-9]{8})(\..*)$/, '$2');
                    }
                    return file;
                },
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash].css',
            }),
        ],
    },

    // Disable building a useless index.html file
    chainWebpack: (conf) => {
        conf.plugins.delete('html');
        conf.plugins.delete('preload');
        conf.plugins.delete('prefetch');
        conf
            .entry('app')
            .clear()
            .add('./assets/main.js')
            .end();
        conf.resolve.alias
            .set('@', path.join(__dirname, './assets'));
    },

    publicPath:
    process.env.NODE_ENV === 'production'
        ? '/'
        : `${config.https ? 'https' : 'http'}://${config.host}:${config.port}/`,

    productionSourceMap: true,

    pluginOptions: {
        lintStyleOnBuild: false,
        stylelint: {
            fix: true, // boolean (default: true)
            files: ['assets/**/*.{vue,htm,html,css,sss,less,scss,postcss}'],
        },
        svgSprite: {
            loaderOptions: {
                extract: true,
                symbolId: filePath => `icon-${path.basename(filePath).replace('.svg', '')}`,
                spriteFilename: 'img/icons.svg', // or 'img/icons.svg' if filenameHashing == false
            },
        },
    },
};
