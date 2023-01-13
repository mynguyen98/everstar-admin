import customFetch from 'src/utils/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addToast } from '../uiSlice'
import BasicToast from 'src/views/notifications/toasts/BasicToast'
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from 'src/utils/localStorage'
import { decentralizeNav } from 'src/utils/decentralizeNav'
const role = getUserFromLocalStorage()?.user.roles[0].code
const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  decentralized: decentralizeNav[role],
}
export const loginUser = createAsyncThunk('auth/loginUser', async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post('/login/basic', user)
    thunkAPI.dispatch(decentralizeUser(resp.data.data.user.roles[0].code))
    return resp.data
  } catch (error) {
    const wrongPass = error.response.status === 400 ? true : false
    const message = wrongPass ? 'Please check your email and password' : error.message
    thunkAPI.dispatch(addToast(BasicToast('#e55353', 'Login faild', message)))
    return thunkAPI.rejectWithValue()
  }
})

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
  try {
    await customFetch.delete('/logout')
    thunkAPI.dispatch(addToast(BasicToast('#2eb85c', 'Logout success')))
  } catch (error) {
    thunkAPI.dispatch(addToast(BasicToast('#e55353', 'Logout failed', 'Please try again')))
  }
})

export const profileUser = createAsyncThunk('auth/profileUser', async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/profile/my')
    return resp.data
  } catch (error) {}
})

export const updateProfile = createAsyncThunk('auth/updateProfile', async (user, thunkAPI) => {
  try {
    const resp = await customFetch.put('/profile', user)
    return resp.data
  } catch (error) {}
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    refreshToken: (state, { payload }) => {
      state.user.tokens.accessToken = payload
    },
    decentralizeUser: (state, { payload }) => {
      state.decentralized = decentralizeNav[payload]
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false
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
export const { refreshToken, decentralizeUser } = authSlice.actions
export default authSlice.reducer
