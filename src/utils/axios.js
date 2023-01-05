import axios from 'axios'
import { getLocalAccessToken, getLocalRefreshToken, updateLocalAccessToken } from './localStorage'
const customFetch = axios.create({
  baseURL: 'http://192.168.1.39:3000/admin/api/v1',
})

customFetch.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken()
    if (token) {
      config.headers['Authorization'] = 'Bearer' + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

customFetch.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalConfig = error.config
    console.log(error)
    if (originalConfig.url !== '/signup/basic' && error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true
        try {
          const res = await customFetch.post('')
          const { accessToken } = res.data
          updateLocalAccessToken(accessToken)
          return customFetch(originalConfig)
        } catch (_error) {
          return Promise.reject(_error)
        }
      }
    }
    return Promise.reject(error)
  },
)

export default customFetch
