import axios from 'axios'
import { getLocalAccessToken, getLocalRefreshToken, updateLocalAccessToken } from './localStorage'
export const customFetch = axios.create({
  baseURL: 'https://api-dev.everstar.vn/admin/user/v1',
})
export const customFetch2 = axios.create({
  baseURL: 'https://api-dev.everstar.vn/api',
})
// customFetch.interceptors.request.use(
//   (config) => {
//     const token = getLocalAccessToken()
//     if (token) {
//       config.headers['Authorization'] = 'Bearer ' + token
//       // config.headers['x-access-token'] = token
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

const handleFetchResponse = (customFetch) => {
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

      if (originalConfig.url !== '/signup/basic' && err.response) {
        //   // Access Token was expired
        //   console.log()
        // console.log(err.response.status === 401 && !originalConfig._retry)
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true
          try {
            const refreshToken = { refreshToken: getLocalRefreshToken() }
            const rs = await customFetch.post('/token/refresh', refreshToken)
            const { accessToken } = rs.data
            updateLocalAccessToken(accessToken)
            return customFetch(originalConfig)
          } catch (_error) {
            return Promise.reject(_error)
          }
        }
      }
      // console.log(err)
      // console.log(originalConfig)

      return Promise.reject(err)
    },
  )
}
handleFetchResponse(customFetch)
handleFetchResponse(customFetch2)
// customFetch.interceptors.response.use(
//   (res) => {
//     return res
//   },
//   async (err) => {
//     const originalConfig = err.config

//     if (originalConfig.url !== '/signup/basic' && err.response) {
//       //   // Access Token was expired
//       //   console.log()
//       console.log(err.response.status === 401 && !originalConfig._retry)
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true
//         console.log(originalConfig._retry)
//         try {
//           const refreshToken = { refreshToken: getLocalRefreshToken() }
//           console.log(refreshToken)
//           const rs = await customFetch.post('/token/refresh', refreshToken)
//           console.log(rs)
//           const { accessToken } = rs.data
//           updateLocalAccessToken(accessToken)
//           return customFetch(originalConfig)
//         } catch (_error) {
//           return Promise.reject(_error)
//         }
//       }
//     }
//     console.log(err)
//     console.log(originalConfig)

//     return Promise.reject(err)
//   },
// )
