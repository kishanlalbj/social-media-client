const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    filename: 'bundle-[hash].js'
  },
  devtool: 'source-map',
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: { index: '/', disableDotRule: true }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /.(ttf|svg|jpg|jpeg)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })]
};
