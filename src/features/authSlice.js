import customFetch from 'src/utils/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addToast } from './uiSlice'
import BasicToast from 'src/views/notifications/toasts/BasicToast'
import { getUserFromLocalStorage, addUserToLocalStorage } from 'src/utils/localStorage'
const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
}

export const signupUser = createAsyncThunk('auth/signupUser', async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post('/signup/basic', user)
    console.log(resp.data)
  } catch (error) {
    console.log(error)
  }
})
export const loginUser = createAsyncThunk('auth/loginUser', async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post('/login/basic', user)
    console.log(resp.data.data)
    return resp.data
  } catch (error) {
    console.log(error)
    thunkAPI.dispatch(
      addToast(BasicToast('#e55353', 'Login faild', 'Please check your email and password!')),
    )
    thunkAPI.rejectWithValue()
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false
      console.log(action)
      const { data } = action.payload
      console.log(data)
      state.user = data
      addUserToLocalStorage(data)
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true
    },
  },
})

export default authSlice.reducer
