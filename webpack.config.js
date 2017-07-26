var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: path.join(__dirname, 'app', 'js', 'main.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app', 'dist')
    },
    stats: {
        colors: true,
        reasons: true,
        chunks: true
    },
    devServer: {
        port: 9000,
        contentBase: path.join(__dirname, 'app')
    },
    module: {
        rules: [{
            test: /\.less$/,
            exclude: /(node_modules)/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "less-loader"
            }]
        }]
    }
}