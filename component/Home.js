import { connect } from 'react-redux';
import { getHomeList } from '../store/home/actions'
import React, { useEffect } from "react";
import Page from './Page';
import styles from './Home.css';

// console.log(styles._getCss(), 'styles')
// const Home = (props) => {
  // 这里会打印两次 代表 服务端和客户端口各执行一次？
//   console.log(8888888)
//   useEffect( () => {
//     props.getHomeList();
//   }, [] );
//   return (
//     <div>
//       <div>This is home</div>
//       <div> {!!props.home.list.length && props.home.list.map(item => <div key={item}>{item}</div>)} </div>
//       <button onClick={() => props.getHomeList()}>click me</button>
//       <div><button onClick={() => alert('hhhhhh')}>alert</button></div>
//       <Page></Page>
//     </div>
//   )
// }

class Home extends React.Component {

  // 预加载数据，服务端调用
  static async loadData(store, match) {
    // 参数 match 是当前匹配路由的信息
    return store.dispatch(getHomeList())
  }

  // 在这个生命周期里加上css逻辑
  componentWillMount(){
    // 通过这个属性可以判断是在服务端调用
    if(this.props.staticContext && this.props.staticContext.css) {
      // 给服务端注入的变量 staticContext 的 css属性中加入 css文本
      this.props.staticContext.css.push(styles._getCss());
    }
  }

  componentDidMount() {
    // 服务端已经往store中注入数据，这里不需要重复请求
    if(!this.props.home.list.length) {
      this.props.getHomeList()
    }
  }

  render() {
    const props = this.props;
    return (
      <div>
        <div className={styles.title}>This is home</div>
        <div> {!!props.home.list.length && props.home.list.map(item => <div key={item}>{item}</div>)} </div>
        <button onClick={() => props.getHomeList()}>click me</button>
        <div><button className={styles.alertMe} onClick={() => alert('hhhhhh')}>alert</button></div>
        <Page></Page>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    home: state.home
  }
}

export default connect(mapStateToProps, {
  getHomeList
})(Home)