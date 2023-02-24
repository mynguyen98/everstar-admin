import { customFetch, customFetch2 } from 'src/utils/axios'

export const listItemThunk = async ({ email, name, isBanned, isKol, limit, offset }) => {
  console.log(email)
  try {
    const response = await customFetch2.get(
      `/auth/admin/v1/user?${email ? `email=${email}` : ''}${name ? `&search=${name}` : ''}${
        isBanned ? `&banned=${isBanned}` : ''
      }${isKol ? `&kol=${isKol}` : ''}&limit=${limit}&offset=${offset > 0 ? offset : 0}`,
    )
    const cusers = response.data.data
    return cusers
  } catch (error) {
    console.log(error)
  }
}

export const usersListThunk = async ({ type, name, limit, offset }) => {
  try {
    const response = await customFetch.get(
      `/${type}?search=${name}&limit=${limit}&offset=${offset}`,
    )
    const users = response.data.data
    return users
  } catch (error) {}
}
