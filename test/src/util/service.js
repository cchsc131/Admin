import axios from "axios"

let baseUrl=""
if(process.env.NODE_ENV==='development'){
  baseUrl=process.env.VUE_APP_API
}else{

}
// 创建实例
const service = axios.create({
  baseURL:baseUrl
})
// 添加请求拦截器
service.interceptors.request.use( function ( config ) {
   // 在请求发送之前做一些事情
   return config}, function ( error ) {
     // 做一些请求错误的事情
    return Promise.reject(error )});
// 添加响应拦截器
service.interceptors.response.use( function ( response ) {
   // 对响应数据执行操作
  return response}, function ( error ) {
     // 对响应错误执行操作
     return Promise.reject(error)
  });

export default service
