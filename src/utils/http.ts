/*
 * @Description: Description
 * @Author: 陆城锫
 * @Date: 2020-12-07 10:32:05
 */
import axios, { AxiosRequestConfig } from 'axios'
import {useStore} from 'vuex'
// axios.defaults.withCredentials = true

const DEFAULT_CONFIG = {
    method: 'GET',
    baseUrl: '/api',
    timeout: 30000,
    loading: false,
    headers: {
        'Content-Type':'application/json'
    }
}

const DEFAULT_PARAMS = {}
const store = useStore()
export async function request(apiPath: string, params?: RequestParams, optionsSource?: RequestOptions) {
    const options: RequestOptions = Object.assign({}, DEFAULT_CONFIG, optionsSource)
    const { method, baseUrl, headers, formData, responseType } = options
    const sendData: AxiosRequestConfig = {
        url: baseUrl+ apiPath,
        method,
        headers,
        responseType
    }
    
    const paramsData = Object.assign({}, DEFAULT_PARAMS, params)
    
    if (method == 'GET') {
        sendData.params = params
    } else if (formData) {
        const formData = new FormData()
        Object.keys(paramsData).forEach(key => {
            formData.append(key,paramsData[key])
        })
        sendData.data = formData
    } else {
        sendData.data = paramsData
    }

    return axios(sendData).then(res => {
        const data: any = res.data
        if (res.status == 200) {
            return data
        } else {
            return Promise.reject(data)
        }
    }).catch(async err => {
        return Promise.reject({...err,path:apiPath,sendData,resData:err})
    })
}

declare global{
    //网络请求参数
    interface RequestParams{
        [key:string]:any
    }
   //网络请求返回值
    interface RequestRes{
        code: number;
        message: string;
        data:any
    }

    //请求选项
    interface RequestOptions{
        method?: 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH'
        /** 基本 url, 没有特殊需求无需传递 */
        baseUrl?: string
        /** 请求域名 */
        // host?: string
        // /** 协议 */
        // protocol?: string
        /** 使用 formData 传递参数 */
        formData?: boolean
        /** 超时时间,单位: ms */
        timeout?: number
        /** 请求过程中是否显示 Loading */
        loading?: boolean
        /** 发生错误时提示框类型, 默认: notification */
        // errorType?: 'notification' | 'modal' | false
        /** 自定义请求头 */
        headers?: any
        /** 类型动态设置 */
        responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | undefined
        /** 是否校验请求状态 */
        // checkStatus?: boolean
    }
}