const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.ts', // エントリーポイント
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // ビルド時に `dist` ディレクトリをクリーン
  },
  resolve: {
    extensions: ['.ts', '.js'], // 解決する拡張子
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html', // テンプレートとなるHTMLファイル
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // 静的ファイルのディレクトリ
    },
    compress: true,
    port: 3000, // 開発サーバーのポート
    open: true, // サーバー起動時にブラウザを自動で開く
  },
  mode: 'development', // デフォルトモード
};
