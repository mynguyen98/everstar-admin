import { setAddMMorePage, updateTotalSize } from '../users/usersSlice'
import customFetch from 'src/utils/axios'
// thunk for pagination
export const usersListThunk = async ({ type, name, limit, offset }, thunkAPI) => {
  try {
    const response = await customFetch.get(
      `/${type}?search=${name}&limit=${limit}&offset=${offset}`,
    )
    const { addMorePage, currentPage, totalSize, sizePerPage } = thunkAPI.getState().users
    const users = response.data.data
    if (addMorePage && totalSize / sizePerPage === currentPage && users.length === sizePerPage) {
      thunkAPI.dispatch(updateTotalSize('update'))
    }
    if (users.length < sizePerPage) {
      thunkAPI.dispatch(updateTotalSize('truncate'))
      // if there is no user, not add more page anymore and reduce one page
      if (users.length === 0) {
        thunkAPI.dispatch(setAddMMorePage(false))
        thunkAPI.dispatch(updateTotalSize('reduce'))
      }
    }
    return users
  } catch (error) {}
}
