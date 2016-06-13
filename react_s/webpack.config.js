var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry:[
		'webpack/hot/dev-server',
		'./src/index.js'
	],

	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[name].js'
	},

	module: {
		loaders: [
			{test:/\.css$/, loader: 'style-loader!css-loader'},
			{test: /\.jsx?$/, exclude: /(node-modules|bower_components)/, 
				loader: 'babel', query:{ presets:['es2015', 'react']}},

			{test: /\.scss$/, loader:'style!css!sass?sourceMap'},
			{test:/\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
		]
	},

	resolve: {
		root: './',
		extensions: [ '', '.js', '.json', '.scss' ]
	},
	plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
