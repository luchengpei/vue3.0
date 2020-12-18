/*
 * @Description: Description
 * @Author: 陆城锫
 * @Date: 2020-12-10 09:42:38
 */
import axios, { AxiosPromise,AxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'
import store from '../store'
const server = axios.create({
    baseURL: '/api',
    timeout: 30000,
    method: "POST",
})

server.interceptors.request.use(config => { 
    config.headers.token = 'lcpToken'
    return config
})


server.interceptors.response.use(response => {
   store.commit('changeLoading',false)
    if (response.data.code == 200) {
        return response.data
    } else if (response.data.code == 401) {
        message.info('登陆过期')
    }
}, error => {
        message.error('网络错误')
        store.commit('changeLoading',false)
        return Promise.reject(error)
})
/**
 * 方法一 导出axios实例 不能自定义加loading
 */

/**
 * 方法二   可实现自定义是否需要loading
 */

 //请求参数配置
interface RequestParam extends AxiosRequestConfig{
    url: string;
    method?: 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH',
    data?: any;
    params?: any;
    loading?: boolean;
    headers?:object
}

const request = ({ url, method = 'POST', data, loading = false, headers, params }: RequestParam):AxiosPromise=> {
    loading&&store.commit('changeLoading',loading)
    return server({
        url,
        data,
        method,
        headers,
        params
    })
}
export default request




// export class Request{
//     /*public url: string   todo
//     public method?: 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH'
//     public data: any
//     public loading?: boolean
//     public headers?:object
//     */
//     constructor({ url, method = 'POST', data, loading = false, headers,params }: RequestParam) {
//         loading&&store.commit('changeLoading',loading)
//         return server({
//             url,
//             data,
//             method,
//             headers,
//             params
//         })
//     }
//     /*public http() {   todo
//        return server({
//             url:this.url,
//             data:this.data,
//             method:this.method,
//             headers:this.headers
//         })
//     }
//     */
// }