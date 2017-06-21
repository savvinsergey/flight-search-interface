const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry:[
        'bootstrap-loader',
        path.join(__dirname, './app/interfaces.ts'),
        path.join(__dirname, './app/bootstrap.ts'),
        path.join(__dirname, './styles/styles.scss')
    ],
    output:{
        path: path.join(__dirname, '../../build'),
        filename: 'client.js'
    },

    resolve: {
        extensions: ['.ts', '.js', '.template']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader'
            },
            {
                test: /\.template/,
                loader: "handlebars-loader",
                exclude: /node_modules/
            },
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.json?$/,
                loader: 'json',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },

            {
                test: /\.(eot|ttf|svg|png|gif|woff|woff2)?$/,
                loader: 'file-loader',
                query: {
                    limit: 10240,
                    name: '../../build/static/[hash].[ext]'
                }
            }
        ]
    },

    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery'",
            "window.$": "jquery"
        })
    ]

};
