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
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(dirname, 'public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[fullhash].css",
            chunkFilename: "[id].[hash].css"
        })
    ]
};
