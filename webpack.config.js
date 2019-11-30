const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

console.log(process.env.NODE_ENV); 
module.exports = {
    mode: process.env.NODE_ENV,
    entry: path.resolve(__dirname, 'src/app.jsx'),
    optimization: {
        splitChunks: {
            name : 'common',
            filename: 'js/base.js'
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: process.env.NODE_ENV === 'development' ? '/dist/' : '/'
    },
    resolve: {
        extensions: ['*', '.js', '.css', '.jsx', '.html'],
        alias : {
            page        : path.resolve(__dirname, 'src/page'),
            component   : path.resolve(__dirname, 'src/component'),
            util        : path.resolve(__dirname, 'src/util'),
            service     : path.resolve(__dirname, 'src/service')
        }
    },
    module: {
        rules: [
            //vue loader
            {   
                test: /\.vue$/, 
                include: /src/,
                use: {
                    loader: 'vue-loader', 
                    options: { 
                        loaders: { 
                            js: 'awesome-typescript-loader?silent=true' 
                        }
                    } 
                }
            },
            //react(jsx) syntax
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            // css files
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            // sass
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            // pic
            {
                test: /\.(png|jp?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            // font and icons
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // html file
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './favicon.ico'
        }),
        // seperate css file
        new ExtractTextPlugin("css/[name].css"),
        new VueLoaderPlugin(),
        new Serve({
            static: path.resolve(__dirname, 'dist'),
            log: {
                level: 'info'
            }
        })
    ],
    watch: process.env.NODE_ENV === 'development' ? true : false,
    devServer: {
        port: 8086,
        compress: true,
        historyApiFallback: {
            index: '/dist/index.html'
        }
    }
};