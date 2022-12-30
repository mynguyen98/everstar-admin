import axios from 'axios'
const customFetch = axios.create({
  baseURL: 'http://192.168.1.39:3000/admin/api/v1',
})

export default customFetch
