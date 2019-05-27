const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    // entry: path.resolve(__dirname, '../src/index.js'),
    entry: {
        a: path.resolve(__dirname, '../src/view/a.js'),
        b: path.resolve(__dirname, '../src/view/b.js')
    },
    output: {
        publicPath: path.resolve( __dirname ,  '../dist/static'),
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    name: 'comon',
                    chunks: 'all',
                    minSize: 1,
                    priority: 0
                },
                modules: {
                    name: 'vender',
                    test: /.*sub(.*)/,
                    chunks: 'all', 
                    priority: 10
                }
            }
        }
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        port: '6767',
        compress: true,
        before: function(app, server){
            console.log('before =====');
            app.get('/before', function(req, res, next){
                res.json({
                    before: 'hello world, hey'
                })
            })
        },
        after: function(app, server){
            console.log('after =====');
            app.get('/after', function(req, res, next){
                res.json({
                    after: 'hello world, hey'
                })
            })
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: path.resolve(__dirname, '../dist/index.html')
        })
    ]
}