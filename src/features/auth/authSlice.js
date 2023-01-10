import customFetch from 'src/utils/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addToast } from '../uiSlice'
import BasicToast from 'src/views/notifications/toasts/BasicToast'
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from 'src/utils/localStorage'
const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
}
export const loginUser = createAsyncThunk('auth/loginUser', async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post('/login/basic', user)
    console.log(resp.data.data)
    return resp.data
  } catch (error) {
    console.log(error)
    thunkAPI.dispatch(
      addToast(BasicToast('#e55353', 'Login faild', 'Please check your email or password!')),
    )
    return thunkAPI.rejectWithValue()
  }
})

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
  try {
    await customFetch.delete('/logout')
    thunkAPI.dispatch(addToast(BasicToast('#2eb85c', 'Logout success')))
  } catch (error) {
    console.log(error)
    thunkAPI.dispatch(addToast(BasicToast('#e55353', 'Logout failed', 'Please try again')))
  }
})

export const profileUser = createAsyncThunk('auth/profileUser', async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/profile/my')
    console.log(resp)
    return resp.data
  } catch (error) {
    console.log(error)
  }
})

export const updateProfile = createAsyncThunk('auth/updateProfile', async (user, thunkAPI) => {
  try {
    const resp = await customFetch.put('/profile', user)
    return resp.data
  } catch (error) {
    console.log(error)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    refreshToken: (state, { payload }) => {
      state.user.tokens.accessToken = payload
    },
    // updateProfile: (state, { payload }) => {
    //   state.user.user = { ...state.user.user, ...payload }
    // },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false
      console.log(action)
      const { data } = action.payload
      state.user = data
      addUserToLocalStorage(data)
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true
    },
    [logoutUser.pending]: (state) => {
      state.isLoading = true
    },
    [logoutUser.fulfilled]: (state) => {
      state.isLoading = false
      state.user = null
      removeUserFromLocalStorage()
    },
    [profileUser.pending]: (state) => {
      state.isLoading = true
    },
    [profileUser.fulfilled]: (state, { payload }) => {
      console.log(payload)
      state.isLoading = false
    },
    [updateProfile.pending]: (state) => {
      state.isLoading = true
    },
    [updateProfile.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.user.user = { ...payload.data }
      addUserToLocalStorage(state.user)
    },
  },
})
export const { refreshToken } = authSlice.actions
export default authSlice.reducer
