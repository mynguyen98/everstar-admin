import { setUserStatus } from './usersSlice'
import { addToast } from '../uiSlice'
import { customFetch } from 'src/utils/axios'
import BasicToast from 'src/views/notifications/toasts/BasicToast'

export const toggleUsersStatusThunk = async (id, thunkAPI) => {
  try {
    const res = await customFetch.patch(`/users/status/${id}`)
    console.log(res.data)
    thunkAPI.dispatch(setUserStatus(id))
    thunkAPI.dispatch(
      addToast(
        BasicToast(
          '#2eb85c',
          `you ${res.data.data.status ? 'actived' : 'blocked'} this user successfully`,
        ),
      ),
    )
  } catch (error) {
    thunkAPI.dispatch(
      addToast(
        BasicToast(
          '#e55353',
          'Set user status failed',
          'May be there is trouble with internet, please wait a second and try again',
        ),
      ),
    )
  }
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
