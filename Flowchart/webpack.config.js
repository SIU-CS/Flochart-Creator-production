var path = require('path');

module.exports = {
    context: path.join(__dirname, 'wwwroot'),
    entry: {
        server: './js/React/server',
        client: './js/React/client'
    },
    output: {
        path: path.join(__dirname, 'wwwroot/js/build'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            // Transform JSX in .jsx files
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }

        ],
    },
    resolve: {
        // Allow require('./blah') to require blah.jsx
        extensions: ['.js', '.jsx']
    }
};