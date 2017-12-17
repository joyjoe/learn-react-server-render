import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";

import App from "./views/App";
// import appState from "./store/app/state";
import AppState from "./store/app/state";

const render = (Component)=>{
  const app = (
    <AppContainer>
      <Provider appState={new AppState()}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
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

