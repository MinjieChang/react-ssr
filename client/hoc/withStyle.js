import React from 'react';

function withStyle (styles) {

  return function(WrappedComponent){

    class Component extends React.Component{
      // 在这个生命周期里加上css逻辑
      componentWillMount(){
        // 通过这个属性可以判断是在服务端调用
        if(this.props.staticContext && this.props.staticContext.css) {
          // 给服务端注入的变量 staticContext 的 css属性中加入 css文本
          this.props.staticContext.css.push(styles._getCss());
        }
      }
      render(){
        return <WrappedComponent {...this.props}></WrappedComponent>
      }
    }

    return Component;
    
  }
}

export default withStyle
