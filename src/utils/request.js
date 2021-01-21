import axios from "axios";

// 创建axios 实例 赋值给变量service
// Api地址 http://localhost:3000/
const BASEURL = "http://localhost:3000";
const service = axios.create({
	baseURL: BASEURL,
	timeout: 10000,
});

// // 添加请求拦截器
// service.interceptors.requset.use(
// 	function(config) {
// 		//在发送之前做些什么
// 		return config;
// 	},
// 	function(error) {
// 		// 对请求错误做些什么
// 		return Promise.reject(error);
// 	}
// );

// // 添加响应拦截器
// service.interceptors.response.use(
// 	function(response) {
// 		//对响应数据做点什么
// 		// let data = response.data;
// 		// if (data.resCode !== 0) {
// 		//   return Promise.reject(data);
// 		// } else {
// 		return response;
// 		// }
// 	},
// 	function(error) {
// 		//对响应错误做点什么
// 		return Promise.reject(error);
// 	}
// );

export default service;
