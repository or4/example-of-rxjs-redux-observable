const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "awesome-typescript-loader"
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          'sass-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
    alias: {
      ':scenes': path.resolve(__dirname, 'src/scenes/'),
      ':components': path.resolve(__dirname, 'src/components/'),
      ':fonts': path.resolve(__dirname, 'src/assets/fonts/'),
      ':images': path.resolve(__dirname, 'src/assets/images/'),
      ':constants': path.resolve(__dirname, 'src/global/constants'),
      ':types': path.resolve(__dirname, 'src/global/types'),
      ':utils': path.resolve(__dirname, 'src/utils'),
      ':api': path.resolve(__dirname, 'src/api'),
      ':actions': path.resolve(__dirname, 'src/redux/actions'),
      ':sharedStyles': path.resolve(__dirname, 'src/styles/index.scss'),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    watchContentBase: true,
    proxy: {
      '/complete': {
        target: 'http://suggestqueries.google.com',
        changeOrigin: true
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    })
  ]
};