import React from "react";
import ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";

import App from "./views/App";

const render = (Component)=>{
  const app = (
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>
  );
  ReactDOM.render(app, document.getElementById("root"));
};

render(App);

if(module.hot){
  module.hot.accept("./views/App", function(){
    render(App);
  });
}

