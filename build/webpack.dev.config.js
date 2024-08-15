const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dirname = __dirname.replace('build','');

module.exports = {
    entry: path.resolve(dirname, 'src/main.jsx'),
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(dirname, 'dist'),
        clean: true,
        publicPath: '/'
    },
    resolve: {
        alias: {
            '@': path.join(dirname, 'src'),
        },
        extensions: ['.js', '.jsx','.json'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: [
                                [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
                                [require.resolve('@babel/preset-env'), { modules: false }],
                            ]
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|mp3)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
            },
            {
                test: /\.less$/i,
                use: [MiniCssExtractPlugin.loader,"css-loader","less-loader","postcss-loader"],
            }
        ],
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(dirname, 'public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            // chunkFilename: "[id].[hash].css"
        })
    ],
    devServer: {
        historyApiFallback: true,
        port: "8080",
        host:'0.0.0.0',
        proxy: [
            {
                context: ['/api'],
                // target: 'http://192.168.0.8:8881',
                target:'https://toc.fightguy.online',
                changeOrigin: true,
                secure: true,
                pathRewrite: {
                    '^/api': ''
                },
                plugins: [function(server, opts){
                    console.log(server, opts);
                }]
            }
        ],
    },
};
