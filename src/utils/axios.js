import axios from 'axios'
import { getLocalAccessToken, getLocalRefreshToken, updateLocalAccessToken } from './localStorage'
const customFetch = axios.create({
  baseURL: 'http://192.168.1.39:3000/admin/api/v1',
})
customFetch.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken()
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
      // config.headers['x-access-token'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
customFetch.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig = err.config

    // if (originalConfig.url !== '/signup/basic' && err.response) {
    //   // Access Token was expired
    //   console.log()
    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true
      console.log(originalConfig._retry)
      try {
        const refreshToken = { refreshToken: getLocalRefreshToken() }
        console.log(refreshToken)
        const rs = await customFetch.post('/token/refresh', refreshToken)
        console.log(rs)
        const { accessToken } = rs.data
        updateLocalAccessToken(accessToken)
        return customFetch(originalConfig)
      } catch (_error) {
        return Promise.reject(_error)
      }
    }
    // }
    console.log(err)
    console.log(originalConfig)

    return Promise.reject(err)
  },
)

export default customFetch
