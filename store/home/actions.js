import axios from 'axios';
import { CHANGE_LIST } from "./constants";

// 注意： 这里必须要设置上baseURL，否则在服务端发出请求时，会把端口打到80去
axios.defaults.baseURL = 'http://127.0.0.1:3001';

//普通action
const changeList = list => ({
  type: CHANGE_LIST,
  payload: list
});

//异步操作的action(采用thunk中间件)
export const getHomeList = () => {
  return (dispatch) => {
    return axios.get('/api/list')
      .then((res) => {
        const list = res.data;
        return dispatch(changeList(list.data))
      }).catch(() => {});
  };
}