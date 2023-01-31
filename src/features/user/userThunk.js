import { addToast } from '../uiSlice'
import customFetch from 'src/utils/axios'
import BasicToast from 'src/views/notifications/toasts/BasicToast'
export const signupUserThunk = async (user, thunkAPI) => {
  try {
    await customFetch.post('/signup/basic', user)
    thunkAPI.dispatch(addToast(BasicToast('#2eb85c', 'Register success')))
  } catch (error) {
    const msg = error.response.data.message
    thunkAPI.dispatch(addToast(BasicToast('#e55353', msg)))
  }
}
