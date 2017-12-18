const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const ReactSSR = require("react-dom/server");
const webpack = require("webpack");
const MemoryFS = require("memory-fs");
const axios = require("axios");
// 导入express-session body-parser
const bodyParser = require("body-parser");
const session = require("express-session");
// 导入异步执行组件的方法
const asyncBootstrapper = require("react-async-bootstrapper").default;

// 服务端也要考虑是否为开发模式
const isDev = process.env.NODE_ENV === "development";
// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  cookie: {
    maxAge: 10 * 60 * 1000
  },
  name: "pid",
  saveUninitialized: false,
  resave: false,
  secret: "react cnode api",
}));

// 开启服务接口代理
app.use("/api/user/", require("./utils/login"));
app.use("/api", require("./utils/apiProxy"));

// import config.js
const webpackServerConfig = require("../webpack.config.server.js");
function getTemplate(){
  return new Promise((resolve, reject)=>{
    axios.get("http://localhost:8080/public/index.html").then(res=>res.data).then(data=>{
      resolve(data);
    }).catch(e=>reject(e));
  });
}

// 定义解析stores对象的方法
function getStoreState(stores){
  console.log(stores);
  return Object.keys(stores).reduce((result, storeName)=>{
    result[storeName] = stores[storeName].toJson()
    return result;
  }, {});
}

if(isDev){
  const Module = module.constructor;
  let serverBundle, createStoreMap;
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
      // eslint-disable-next-line
      // console.log(bundlePath);
      const bundle = mfs.readFileSync(bundlePath, "utf-8");
      const m = new Module();
      m._compile(bundle, "server-bundle.js");
      serverBundle = m.exports.default;
      // 服务端渲染的路由实现关键
      createStoreMap = m.exports.createAppState;
    }
  });
  // 开发模式
  app.use("*", function(req, res){
    // 通过getTemplate()获取模板字符串
    getTemplate().then(template=>{
      // const content = ReactSSR.renderToString(serverBundle);
      // 由于添加了路由功能 因此需要重新渲染服务端组件
      const routerContext = {};
      // eslint-disable-next-line
      // console.log(`req.url = ${req.url}`);
      const stores = createStoreMap && createStoreMap();
      const serverApp = serverBundle(stores, routerContext, req.url);
      // eslint-disable-next-line
      // console.log(serverApp);
      const content = ReactSSR.renderToString(serverApp);
      // 异步执行组件
      asyncBootstrapper(serverApp).then(()=>{
        // 当渲染结束之后通过检查routerContext对象是否具有url属性来判断是否是路由跳转
        if(routerContext.url){
          // eslint-disable-next-line
          // console.log(`routerContext.url = ${routerContext.url}`);
          res.status(302);
          res.setHeader("Location", routerContext.url);
          res.end();
          return;
        }

        // 不能再简单的使用字符串替换来实现服务端代码渲染 应该使用字符串模板
        // res.send(content.replace("<!--app-->", content));

        // 先读取stores数据
        /* eslint-disable  */
        console.log(stores);
        // console.log(stores.toJson());
        /* eslint-enable  */
        res.send(content.replace("<!--app-->", content));
      });

    });
  });
}else{
  // 生产模式
  const ServerEntry = require("../dist/serverEntry").default;
  app.use("/public/", express.static(path.join(__dirname, "./dist")));
  app.use("*", function(req, res){
    const renderStr = ReactSSR.renderToString(ServerEntry);
    const fileContent = fs.readFileSync(path.join(__dirname, "../dist/index.html"), "utf8");
    const resStr = fileContent.replace("<!--app-->", renderStr);
    res.send(resStr);
  });
}



app.listen(3000, function(){
  console.log("server listening at port 3000");
});

