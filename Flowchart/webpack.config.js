var path = require('path');

module.exports = {
    context: path.join(__dirname, 'wwwroot/js/React'),
    entry: {
        server: './server',
        client: './client'
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
    },
    externals: {
        // Use external version of React (from CDN for client-side, or
        // bundled with ReactJS.NET for server-side)
        react: 'React'
    }
};