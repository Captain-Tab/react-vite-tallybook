import axios from 'axios'
import { Toast } from 'zarm'

const MODE = import.meta.env.MODE // 环境变量

axios.defaults.baseURL = MODE === 'development' ? '/proxy' : 'http://49.235.126.217:7001'
// axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        Toast.show('服务端异常！')
        return Promise.reject(res)
    }
    if (res.data.code !== 200) {
        res.data.msg && Toast.show(res.data.msg)
        if (res.data.code === 401) {
            window.location.href = '/login'
        }
        return Promise.reject(res.data)
    }

    return res.data
})

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    // 为请求头对象添加token验证的Authorization字段
    if (token) {
        config.headers.common['Authorization'] = token
    }
    return config
})

export default axios
