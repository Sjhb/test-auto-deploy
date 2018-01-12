const path = require('path')
const HtmlWebpckPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  entry: {
    app: path.resolve(__dirname, '..', 'src/index.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: ''
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '..', 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loader: {
            css: ['vue-style-loader', {
              loader: 'css-loader',
              option: {
                minimize: false,
                sourceMap: false
              }
            }],
            less: ['vue-style-loader', {
              loader: 'css-loader',
              option: {
                minimize: false,
                sourceMap: false
              }
            }, {
              loader: 'less-loader',
              options: {
                sourceMap: false
              }
            }],
            postcss: ['vue-style-loader', {
              loader: 'css-loader',
              option: {
                minimize: false,
                sourceMap: false
              }
            }]
          },
          transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(gif|png|jpg|svg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        include: [path.resolve(__dirname, '..', 'src')]
      },
    ]
  },
  plugins: [
    new HtmlWebpckPlugin({
      title: 'videoPlayer',
      filename: 'index.html',
      template: path.resolve(__dirname, '..', 'src/index.html'),
      hash: true,
      cache: true
    }),
    new CleanWebpackPlugin([path.resolve(__dirname, '..', 'dist')])
  ]
}
