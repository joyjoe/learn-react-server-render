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

