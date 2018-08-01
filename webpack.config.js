/**
 * Created by huangjiankun on 2018/7/10.
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const purifycssWebpackPlugin  = require('purifycss-webpack');
const copyWebpackPlugin  = require('copy-webpack-plugin');
const glob  = require('glob');

module.exports = {
    entry: {
        a: './src/index',
        b: './src/index2',
        jquery:'jquery'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),//必须是绝对路径
        filename: '[name].bundle.js',
    },
    devServer: {
        //设置服务器访问路径
        contentBase: path.resolve(__dirname, 'dist'),//必须是绝对路径,
        host: 'localhost',
        port: 8090,
        hot: true,
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","postcss-loader"],
                    publicPath:'../' //解决背景图路径问题
                })
                //use:[
                //    {loader:'style-loader'},
                //    {loader:'css-loader'},
                //    {loader:'postcss-loader'} 
                //]
            },
            {
                test:/\.(js|jsx)$/,
                use:['babel-loader'],
                exclude:/node_modules/ //不包括的模块
            },
            {
                test:/\.(jpg|png|gif)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:50, //少于50字节的打包成base64，大于的不变
                        outputPath:'images' //打包图片的路径
                    }
                }]
            },{
                test:/\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader','less-loader'],
                    publicPath:'../' //解决背景图路径问题
                })
            }

        ]
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),
        new webpack.ProvidePlugin({
          $: 'jquery',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title:'i love you',
            filename:'index.html', //打包后文件名
            chunks:['a','b','jquery'],//合并JS
            template:'./src/index.html' //以哪个为模版
        }),
        new ExtractTextPlugin('css/index.css'), //提取出去的路径
        new purifycssWebpackPlugin({
            paths:glob.sync(path.join(__dirname,'*.html'))
        }),//消除没用的类名
        new copyWebpackPlugin([{
            from:path.resolve(__dirname, './src/assets'),
            to:'./public'
        }]),//拷贝静态资源，不需要打包的文件
        

    ],
    optimization:{
        splitChunks:{
            cacheGroups:{
                vendor:{
                    chunks:'initial',
                    name:'jquery',//入口名
                    enforce:true,
                }
            }
        }
    }
}