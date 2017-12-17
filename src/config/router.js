import React, {Component} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import TopicDetail from "../views/TopicDetail/index";
import TopicList from "../views/TopicList/index";
import ApiTest from "../views/Test/api.test";

export default class Router extends Component{
  render(){
    return (
      <Switch>
        <Route path="/" exact render={()=>(<Redirect to="/list" />)}/>
        <Route path="/list" component={TopicList} />
        <Route path="/detail" component={TopicDetail} />
        <Route path="/test" component={ApiTest} />
        {/*<Redirect to="/list" />*/}
      </Switch>
    );
  }
}
