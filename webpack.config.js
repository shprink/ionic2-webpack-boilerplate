'use strict';

let path = require('path'),
    webpack = require('webpack'),
    pkg = require('./package.json'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin');


let paths = {
    www: path.join(__dirname, 'www'),
    src: path.join(__dirname, 'src')
}
let devtool = '#cheap-eval-source-map';
let appEntries = [];
let baseAppEntries = [
    path.join(paths.src, 'app')
];

let devAppEntries = [
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server'
];

let plugins = [];
let basePlugins = [
    new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV !== 'production',
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', '[name].[hash].js'),
    new HtmlWebpackPlugin({
        template: path.join(paths.src, 'index.html'),
        inject: 'body'
    }),
    new ExtractTextPlugin("styles.[hash].css")
];

let devPlugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
];

let prodPlugins = [
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: {
            warnings: false
        }
    })
];

if (process.env.NODE_ENV === 'production') {
    plugins = basePlugins.concat(prodPlugins);
    appEntries = baseAppEntries.concat([]);
    devtool = '#source-map';
} else { // dev or rest
    plugins = basePlugins.concat(devPlugins);
    appEntries = baseAppEntries.concat(devAppEntries);
}

module.exports = {
    entry: {
        app: appEntries,
        vendor: [
            'es5-shim',
            'es6-shim',
            'es6-promise',
            'reflect-metadata',
            'zone.js'
        ],
        style: path.join(paths.src, 'scss', 'index.scss')
    },
    output: {
        path: paths.www,
        filename: '[name].[hash].js',
        chunkFilename: '[id].chunk.js'
    },
    devtool: devtool,
    resolve: {
        extensions: ['', '.ts', '.js', '.html', '.scss', '.png'],
        moduleDirectories: [
            'node_modules',
            'node_modules/ionic-angular',
            'node_modules/ionicons/dist/scss/'
        ]
    },
    plugins: plugins,
    module: {
        preLoaders: [
            //   loaders.tslint,
        ],
        loaders: [
            {
                test: /\.ts$/,
                exclude: /(node_modules)/,
                loader: 'awesome-typescript-loader',
                include: paths.src
            }, {
                test: /\.json$/,
                loader: "json"
            }, {
                test: /\.(png|jpg|svg)$/,
                loader: 'file?name=img/[ext]/[name].[ext]'
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(["css", "autoprefixer", "sass"])
            }, {
                test: /\.html$/,
                loader: 'html'
            }, {
                test: [/ionicons\.svg/, /ionicons\.eot/, /ionicons\.ttf/, /ionicons\.woff/, /roboto-bold\.woff/, /roboto-medium\.woff/, /roboto-light\.woff/, /roboto-regular\.woff/, /roboto-bold\.ttf/, /roboto-medium\.ttf/, /roboto-light\.ttf/, /roboto-regular\.ttf/, /noto-sans-bold\.ttf/, /noto-sans-regular\.ttf/],
                loader: 'file?name=fonts/[name].[ext]'
            }
        ]
    }
};