const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const ReactSSR = require("react-dom/server");
const ServerEntry = require("./dist/serverEntry").default;
const webpack = require("webpack");
const MemoryFS = require("memory-fs");

// 服务端也要考虑是否为开发模式
const isDev = process.env.NODE_ENV === "development";

// import config.js
const webpackServerConfig = require("./webpack.config.server.js");
function getTemplate(){
  return new Promise((resolve, reject)=>{
    fetch("http://localhost:8080/public/index.html", {
      method: "GET"
    }).then(res=>res.json()).then((data)=>{
      resolve(data);
    }).catch(reject);
  });
}


if(isDev){
  const Module = module.constructor;
  let serverBundle;
  webpackServerConfig.devServer = {};
  webpackServerConfig.devServer.proxy = {
    "/public": "http://localhost:8080/"
  };
  const compiler = webpack(webpackServerConfig);
  const mfs = new MemoryFS();
  compiler.outputFileSystem = mfs;
  compiler.watch({}, (err, stats)=>{
    if(err){
      console.log(err);
      throw new Error(err);
    }else{
      const info = stats.toJson();
      // console.log(info);
      if(stats.hasErrors()){
        console.warn(info.errors);
      }
      if(stats.hasWarnings()){
        console.warn(info.warnings);
      }
      const bundlePath = path.join(webpackServerConfig.output.path, webpackServerConfig.output.filename);
      console.log(bundlePath);
      const bundle = mfs.readFileSync(bundlePath, "utf-8");
      const m = new Module();
      m._compile(bundle, "server-bundle.js");
      serverBundle = m.exports.default;
    }
  });
  // 开发模式
  app.use("*", function(req, res){
    // 通过getTemplate()获取模板字符串
    getTemplate().then(template=>{
      const content = ReactSSR.renderToString(serverBundle);
      res.send(content.replace("<!--app-->", content));
    });
  });
}else{
  // 生产模式
  app.use("/public/", express.static(path.join(__dirname, "./dist")));
  
  app.use("*", function(req, res){
    const renderStr = ReactSSR.renderToString(ServerEntry);
    const fileContent = fs.readFileSync(path.join(__dirname, "./dist/index.html"), "utf8");
    const resStr = fileContent.replace("<!--app-->", renderStr);
    res.send(resStr);
  });
}



app.listen(3000, function(){
  console.log("server listening at port 3000");
});

