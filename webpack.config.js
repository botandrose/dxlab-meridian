require('dotenv').config();

var webpack = require('webpack');
var path = require('path');
var HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(`GOOGLE_ANALYTICS_ID: ${process.env.GOOGLE_ANALYTICS_ID}`);
console.log(`FB_APP_ID: ${process.env.FB_APP_ID}`);

module.exports = {
	context: path.join(__dirname, '/'),
	entry: ['./src/js/app.js'],
	output: {
		path: path.join(__dirname, '/build'),
		filename: 'js/app.min.js',
		publicPath: '/src/'
	},
	plugins: [
		new CleanWebpackPlugin([ 'build' ]),
    new CopyWebpackPlugin([
      { from: 'src' }
    ]),
		new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
	  }),
    new HtmlWebpackPlugin(
    {
      title: 'Foo',
      filename: 'index.html',
      template: 'src/index.html',
      inject: false,
      minify: false,
      chunks: 'all',
      chunksSortMode: 'auto'
    }),
    new HtmlReplaceWebpackPlugin([
      {
        pattern: '@@GOOGLE_ANALYTICS_ID',
        replacement: process.env.GOOGLE_ANALYTICS_ID
      },
			{
        pattern: '@@FB_APP_ID',
        replacement: process.env.FB_APP_ID
      },
			{
				pattern: 'app.js',
				replacement: 'app.min.js'
			}
    ])
  ]
};
