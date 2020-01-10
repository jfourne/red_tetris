var path = require('path');

module.exports = {
  entry: './src/client/index.js',

  output: {
    path: path.join(__dirname, 'build'),
	filename: 'bundle.js',
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query:{
        presets: ["es2015", "react", "stage-0"]
      }
	},
	{ test: /\.css$/, loader: "style-loader!css-loader" },
	{ test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
      loader: "url-loader?limit=100000" }]
	},
};
