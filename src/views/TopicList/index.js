import React, { Component } from "react";
// import ClassA from "../../utils/classA";
// 导入mobx
import {observer, inject} from "mobx-react";
import PropTypes from "prop-types";
// import {AppState} from "../../store/app/state";
// 修改导出属性 由导出类实例修改为导出类
import AppState from "../../store/app/state";

@inject("appState")
@observer
class TopicList extends Component {
  constructor(props){
    super(props);
    this.changeAppName = this.changeAppName.bind(this);
  }

  // asyncBootstrap此方法会在组件构造前执行 用来执行初始化数据操作
  asyncBootstrap(){
    // eslint-disable-next-line
    console.log("in asyncBootstrap method");
    // 执行异步操作
    return new Promise((resolve)=>{
      setTimeout(()=>{
        this.props.appState.count = 3;
        resolve(true);
      }, 2000);
    });
  }

  render() {
    // let clsA = new ClassA();
    return (
      <div>
        {/* <p>msg:{this.props.appState.msg}</p>
    <p>this is Topic List Page.{clsA.annotated?"true":"false"}</p> */}
        <p>router view</p>
      </div>
    );
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
  msg: PropTypes.string
};

export default TopicList;

