import React, {Component} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import TopicDetail from "../views/TopicDetail/index";
import TopicList from "../views/TopicList/index";

export default class Router extends Component{
  render(){
    return (
      <Switch>
        {/* <Route path="/" exact /> */}
        <Route path="/list" component={TopicList} />
        <Route path="/detail" component={TopicDetail} />
        <Redirect to="/list" />
      </Switch>
    );
  }
}
