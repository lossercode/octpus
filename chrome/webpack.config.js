const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    //打包入口文件
  entry: {
    content: './content.js',
    server: './service-worker.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    //自动清空上次打包
    clean: true
  },
  plugins: [
    //完全复制插件，直接将静态资源拷贝
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'public'), to: "public" },
        { from: path.resolve(__dirname, 'manifest.json'), to: "" },
        { from: path.resolve(__dirname, 'popup.html'), to: "" },
      ],
    }),
  ],
  watch: true
};