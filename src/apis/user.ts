import request from '../utils/request'
interface GetListParams{
    id?:string
}
export function getList(params?:GetListParams) {
    return request({
        method: 'GET',
        url:'/users/user/list',
        params,
        loading: true
    })
}