import axios from 'axios';

export const clientAxiosInstance = axios.create({
  baseURL: '/'
})

// 这里拆分的目的是，方便将node做一个中间层，做接口的转发
// 服务端调用的时候，可以把请求地址转发到提供接口的服务去
export const serverAxiosInstance = axios.create({
  baseURL: 'http://localhost:3001'
})
