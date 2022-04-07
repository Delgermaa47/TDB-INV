const path = require('path');
const { webpack } = require('webpack');

module.exports = {
    mode: 'development',
    entry : {
        index: path.resolve(__dirname, 'frontend/src/static/index.js'),
    },
    output: {
        path: path.join(__dirname,'lanTeach/static/mainJss/homepage/'),
        filename:'main.js'
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            exclude: /node_modules/,
            use: {
            loader: "babel-loader"
            },
            resolve: {
            extensions: ['.js', '.jsx']
        }
        }],
        },
    watch:true,
}