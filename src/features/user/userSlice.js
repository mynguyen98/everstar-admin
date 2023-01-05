import customFetch from 'src/utils/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addToast } from '../uiSlice'
import BasicToast from 'src/views/notifications/toasts/BasicToast'
import { getUserFromLocalStorage, addUserToLocalStorage } from 'src/utils/localStorage'
const initialState = {
  isLoading: false,
  name: '',
  email: '',
  password: '',
  profilePicUrl: '',
  repeatPw: '',
  isEditing: false,
}

export const signupUser = createAsyncThunk('auth/signupUser', async (user, thunkAPI) => {
  try {
    await customFetch.post('/signup/basic', user)
    thunkAPI.dispatch(addToast(BasicToast('#2eb85c', 'Register success')))
  } catch (error) {
    const msg = error.response.data.message
    thunkAPI.dispatch(addToast(BasicToast('#e55353', msg)))
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearFields: (state) => {
      return { ...initialState, isEditing: state.isEditing }
    },
    handleChangeInput: (state, { payload }) => {
      console.log(payload)
      console.log(state)
      return { ...state, ...payload }
    },
  },
  extraReducers: {
    [signupUser.pending]: (state) => {
      state.isLoading = true
    },
    [signupUser.fulfilled]: (state) => {
      // state.isLoading = false
      console.log(state)
      return { ...initialState }
    },
  },
})
export const { handleChangeInput, clearFields } = userSlice.actions
export default userSlice.reducer
