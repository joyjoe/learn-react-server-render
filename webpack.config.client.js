const path = require("path");
// const fs = require("fs");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

webpackConfig = {
  entry:{
    app: path.join(__dirname, "./src/index.js")
  },
  output:{
    filename: "[name].[hash:4].js",
    path: path.join(__dirname, "./dist"),
    publicPath: "/public/"
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
  plugins:[
    new htmlWebpackPlugin({
      title: "Webpack Page with React",
      template: "index.html"
    })
  ]
}

if(isDev){
  // webpackConfig.devtool = "inline-source-map";
  webpackConfig.entry = {
    app: [
      "babel-polyfill",
      "react-hot-loader/patch",
      path.join(__dirname, "./src/index.js")
    ]
  }
  webpackConfig.devServer = {
    host: "0.0.0.0",
    port: 8080,
    contentBase: path.join(__dirname, "./dev"),
    publicPath: "/public/",
    historyApiFallback:{
      index: "/public/index.html"
    },
    overlay: true,
    hot:true
  },
  webpackConfig.plugins.push(new webpack.NamedModulesPlugin());
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = webpackConfig;
