const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?includePaths[]=' + path.resolve(__dirname, './scss')
];

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new ExtractTextPlugin('hti.css'),
  new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': "\"" + process.env.NODE_ENV + "\""
    }
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.unshift(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
}

const config = {
  entry: './app/index.js',
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'app.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js(x?)$/,
        loaders: ['babel-loader'],
        include: [
          path.join(__dirname, 'app')
        ],
        exclude: '/node_modules/'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      }
    ]
  },
  devServer: { inline: true },
  plugins: plugins,
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    root: [path.join(__dirname, './')]
  },
  stats: {
    colors: true
  }
};

module.exports = config;
