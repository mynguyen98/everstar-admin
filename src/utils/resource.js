import { customFetch2 } from './axios'

export const getImageLink = async (file) => {
  const data = await customFetch2.post('/resources/v1/upload/image', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  console.log(data.response)
}
