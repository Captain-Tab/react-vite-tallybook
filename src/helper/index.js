const MODE = import.meta.env.MODE // 环境变量

export const convertImgUrl = (filePath) => {
    const baseUrl = MODE === 'development' ? 'http://127.0.0.1:7001' : 'http://49.235.126.217:7001'
    return baseUrl + filePath
}
