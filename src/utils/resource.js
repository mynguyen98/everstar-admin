import { customFetch2 } from './axios'

export const getImageLink = async (file) => {
  const data = await customFetch2.post('/resources/v1/admin/upload/image', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data.data
}

export async function getBinaryFromFile(files) {
  const imagesBinary = Promise.all(
    files.map(async (item) => {
      let formData = new FormData()
      formData.append('fileUpload', item)
      const imageLink = await getImageLink(formData)
      return imageLink.url
    }),
  )
  const images = await imagesBinary
  return images
}
