import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import homeReducer from './home';
//合并项目组件中store的reducer
const reducer = combineReducers({
  home: homeReducer
})
//创建store，并引入中间件thunk进行异步操作的管理
// const store = createStore(reducer, applyMiddleware(thunk));

//导出创建的store
// 导出函数的目的是，在服务端渲染时，保证每个用户请求得到是不同的store
export default () => {
  return createStore(reducer, applyMiddleware(thunk))
}