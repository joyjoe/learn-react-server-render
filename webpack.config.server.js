const path = require("path");
const uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");

webpackConfig = {
  target: "node",
  entry:{
    serverEntry: ["whatwg-fetch", path.join(__dirname, "./src/server-entry.js")]
  },
  output:{
    // filename: "[name].js",
    filename: "serverEntry.js",
    path: path.join(__dirname, "./dist"),
    libraryTarget: "commonjs2"
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          "eslint-loader"
        ]
      },
      {
        test: /\.(gif|png|jpg|jpeg)$/,
        use: [
          "file-loader"
        ]
      }
    ]
  },
  // devtool: "inline-source-map"
}

module.exports = webpackConfig;
