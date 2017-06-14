const env = process.env.NODE_ENV || 'development';
const isDev = (env === 'development');
const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '..'),
  devtool: isDev ? '#cheap-module-eval-source-map' : null,
  entry: {
    app: ['./src/index.js', './bin/dev-client.js']
  },
  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: '[name].min.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue: 'vue/dist/vue.js',
      'vue$': 'vue/dist/vue.js',
      '@': path.resolve(__dirname, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        include: [path.resolve('./src')],
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            }),
            less: ExtractTextPlugin.extract({
              use: 'css-loader!less-loader',
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      {
        test: /\.js$/,
        include: [path.resolve('./src')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new ExtractTextPlugin('[name]-[contenthash].css'),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"' + env + '"' }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin(),
  ]
};
