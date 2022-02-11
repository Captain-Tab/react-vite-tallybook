import axios from "../plugin/axios";

// 默认请求参数
const request = (data) => {
    data.url = '/api' + data.url
    data.method = data.method ?? 'GET'
    return axios(data)
}

// 文件上传
export const uploadFile = (file) => {
 return axios({
     url: '/api/upload',
     method: 'POST',
     data: file,
     headers: {
         'Content-Type': 'multipart/form-data',
     }
 })
}

// 用户注册
export const userRegister = ({ username, password }) => {
    return request({
        url: '/user/register',
        method: 'POST',
        data: { username, password },
    })
}

// 用户登录
export const userLogin = ({ username, password }) => {
    return request({
        url: '/user/login',
        method: 'POST',
        data: { username, password },
    })
}

// 用户重置密码
export const resetPassword = ({ old_pass, new_pass }) => {
    return request({
        url: '/user/reset',
        method: 'POST',
        data: { old_pass, new_pass },
    })
}

// 获取用户信息
export const fetchUserInfo = () => {
    return request({ url: '/user/get_userinfo'} )
}

// 修改用户信息
export const updateUserInfo = ({ avatar, username, signature }) => {
    return request({
        url: '/user/edit_userinfo',
        method: 'POST',
        data: { avatar, username, signature }
    })
}

// 获取分页的月度账单
export const getBillInfo = ({ page, page_size, date, type_id = 'all' }) => {
    return request({
        url: '/bill/list',
        params: { page, page_size, date, type_id }
    })
}

// 获取月度账单
export const getMonthData = (month) => {
    return request({
        url: '/bill/data',
        params: {
            date: month
        }
    })
}

// 获取账单类型
export const fetchBillType = (type = 'all') => {
    return request({
        url: '/type/list'
    })
}

// 获取单条账单详情
export const fetchBillDetail = (id) => {
    return request({
        url: '/bill/detail',
        params: { id }
    })
}

// 新增单条账单
export const addNewBill = ({amount, type_id, type_name, date, pay_type, remark}) => {
    return request({
        url: '/bill/add',
        method: 'POST',
        data: { amount, type_id, type_name, date, pay_type, remark }
    })
}

// 更新单条账单
export const updateBill = ({amount, type_id, type_name, date, pay_type, remark}) => {
    return request({
        url: '/bill/update',
        method: 'POST',
        data: { amount, type_id, type_name, date, pay_type, remark }
    })
}

// 删除单条账单详情
export const removeBill = (id) => {
    return request({
        url: '/bill/delete',
        method: 'POST',
        data: { id }
    })
}
