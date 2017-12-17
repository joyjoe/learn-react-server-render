import React, { Component } from "react";
import axios from "axios";
/* eslint-disable */
class ApiTest extends Component {
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.topic = this.topics.bind(this);
    this.markall = this.markall.bind(this);
  }

  login(){
    // /api/user/login
    axios.post("/api/user/login", {
      accessToken: "2de6da14-4170-4064-a0b2-cc474de303a2"
    }).then((res)=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    });
  }

  topics(){
    // /api/topics
    axios.get("/api/topics").then(res=>{
      console.log(res.data);
    }).catch(err=>{
      console.log(err);
    });
  }

  markall(){
    axios.post("/api/message/mark_all?isNeedAccessToken=true").then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.login} >Login</button>
        <button onClick={this.topics} >Topics</button>
        <button onClick={this.markall} >MarkAll</button>
      </div>
    );
  }
}

export default ApiTest;
/* eslint-enable */
