import React from "react";
import ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";

import App from "./component/App";

const render = (Component)=>{
  const app = (
    <AppContainer>
      <Component />
    </AppContainer>
  );
  ReactDOM.render(app, document.getElementById("root"));
};

render(App);

if(module.hot){
  module.hot.accept("./component/App", function(){
    render(App);
  });
}

