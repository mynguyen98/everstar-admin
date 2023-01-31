import { setUserStatus } from './usersSlice'
import { addToast } from '../uiSlice'
import customFetch from 'src/utils/axios'
import BasicToast from 'src/views/notifications/toasts/BasicToast'

export const toggleUsersStatusThunk = async (id, thunkAPI) => {
  try {
    await customFetch.patch(`/users/status/${id}`)
    thunkAPI.dispatch(setUserStatus(id))
    thunkAPI.dispatch(addToast(BasicToast('#2eb85c', 'you blocked this user successfully')))
  } catch (error) {}
}

export const updateUsersPwThunk = async ({ id, password }, thunkAPI) => {
  try {
    await customFetch.patch(`/users/set-password/${id}`, { password })
    thunkAPI.dispatch(addToast(BasicToast('#2eb85c', 'Update user password successfully')))
  } catch (error) {
    thunkAPI.dispatch(
      addToast(
        BasicToast(
          '#e55353',
          'Update password failed',
          'May be there is trouble with internet, please wait a second and try again',
        ),
      ),
    )
  }
}
