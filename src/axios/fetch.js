import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.weixin.qq.com/cgi-bin',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/vnd.toast.v1+json'
  },
  timeout: 10 * 1000
})

// //设置拦截器
// api.interceptors.response.use(
//   (response) => {
//     console.log('拦截器:请求成功', response)
//     return response
//   }, (error) => {
//     console.log('拦截器:发生错误', error.response)
//     return Promise.reject(error)
//   }
// )