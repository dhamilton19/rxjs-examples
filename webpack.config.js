const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: 'eval-source-map',
    entry: [
        './app/index.js'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: [
            'node_modules',
            path.resolve(__dirname, './node_modules')
        ]
    },
    module: {
        loaders: [
            {
                test: /(\.js)$/,
                exclude: /(node_modules)/,
                loader: 'babel'
            }
        ]
    }
};