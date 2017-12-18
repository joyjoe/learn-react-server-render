import React from "react";
import App from "./views/App";
import {StaticRouter} from "react-router-dom";
import {useStaticRendering, Provider} from "mobx-react";
import AppState from "./store/app/state";

useStaticRendering(true);

/* eslint-disable */
// 服务端渲染时针对路由的实现需要使用StaticRouter
function serverComponent(stores, routerContext, url){
  // console.log(stores);
  // console.log(routerContext);
  // console.log(url);
  return (
    <Provider {...stores}>
      <StaticRouter context={routerContext} location={url}>
        <App />
      </StaticRouter>
    </Provider>
  );
};
/* eslint-enable */
export default serverComponent;

// 还需要将创建appState实例的方法导出
export function createAppState(){
  return new AppState();
}

