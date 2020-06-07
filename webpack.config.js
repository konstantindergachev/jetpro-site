const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

let isProd = process.env.NODE_ENV === 'production';
let cssDev = [ 'style-loader', 'css-loader', 'sass-loader' ];
let cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  loader: [ 'css-loader', 'sass-loader' ],
  publicPath: '/',
});
let cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.pug$/,
        use: [ 'html-loader', 'pug-html-loader' ],
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/,
        loader: 'file-loader?name=img/[name].[ext]',
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 9000,
    stats: 'errors-only',
    hot: true,
    open: true,
  },
  // devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: './src/view/index.pug',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'about.html',
      template: './src/view/about.pug',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'blog.html',
      template: './src/view/blog.pug',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'portfolio.html',
      template: './src/view/portfolio.pug',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'contacts.html',
      template: './src/view/contacts.pug',
    }),
    new ExtractTextPlugin({
      filename: '/css/[name].css',
      disable: !isProd,
      allChunks: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new UglifyJSPlugin(),
  ],
};
