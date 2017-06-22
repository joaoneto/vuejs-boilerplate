const env = process.env.NODE_ENV || 'development';
const isDev = (env === 'development');
const isProd = (env === 'production');
const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const extractCommonStyles = new ExtractTextPlugin({ filename: 'common.[contenthash].css', allChunks: true });

const entry = [
  './src/index.js',
  './src/less/main.less'
];

const plugins = [
  extractCommonStyles,
  new ExtractTextPlugin({ filename: '[name].[contenthash].css', allChunks: true }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    sourceMap: isDev
  }),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: '"' + env + '"' }
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html',
    inject: true
  }),
];

if (isDev) {
  entry.push('./bin/dev-client.js');
  plugins.push(
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: [
        '*.js'
      ]
    })
  );
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new FriendlyErrorsPlugin());
}

if (isProd) {
  plugins.push(
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })
  );
}

module.exports = {
  context: path.resolve(__dirname, '..'),
  devtool: isDev ? 'cheap-module-eval-source-map' : false,
  entry: {
    app: entry
  },
  output: {
    path: path.resolve('./build'),
    filename: '[name].min.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue: 'vue/dist/vue.js',
      'vue$': 'vue/dist/vue.js',
      '@': path.resolve('./src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        include: [path.resolve('./src')],
        use: extractCommonStyles.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            }
          ],
          publicPath: '.'
        })
      },
      {
        test: /\.vue$/,
        include: [path.resolve('./src')],
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: true
                  }
                }
              ],
              publicPath: '.',
              fallback: ' vue-style-loader'
            }),
            less: ExtractTextPlugin.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: true
                  }
                },
                {
                  loader: 'less-loader',
                  options: {
                    sourceMap: true
                  }
                }
              ],
              publicPath: '.',
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
  plugins
};
