// 存储与APP有关的state
// import { observable, computed, action, autorun } from "mobx";
import { observable, computed, action } from "mobx";

/* eslint-disable */
// export
class AppState{
  // 定义了两个状态值
  @observable count = 0;
  @observable name = "Job APP";
  // 定义计算状态值
  @computed get msg(){
    return `${this.name} say: count = ${this.count}`;
  };
  // 定义状态改变的行为
  @action add(num){
    this.count += num;
  };
}

// const appState = new AppState();

// 利用autorun定义
// 当状态值改变就会自动执行的方法
// autorun(()=>{
  // console.log(appState.msg);
// });

// setInterval(()=>{
//   appState.add(Math.floor(Math.random() * 10));
// }, 2000);

// 将这里的导出实例修改为导出类
// export default appState;

export default AppState;

