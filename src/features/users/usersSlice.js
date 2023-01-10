import customFetch from 'src/utils/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addToast } from '../uiSlice'
import BasicToast from 'src/views/notifications/toasts/BasicToast'
const initialState = {
  user: null,
  users: [],
  currentPage: 1,
  totalSize: 10,
  sizePerPage: 2,
  isLoading: false,
}

export const usersList = createAsyncThunk(
  'users/usersList',
  async ({ type, limit, offset }, thunkAPI) => {
    try {
      const response = await customFetch.get(`/${type}?limit=${limit}&offset=${offset}`)
      console.log(thunkAPI.getState())
      const { currentPage, totalSize, sizePerPage } = thunkAPI.getState().users
      const users = response.data.data
      if (totalSize / sizePerPage === currentPage && users.length === sizePerPage) {
        thunkAPI.dispatch(updateTotalSize('update'))
      }
      if (users.length < sizePerPage) {
        console.log(users.length)
        thunkAPI.dispatch(updateTotalSize('truncate'))
      }
      return users
    } catch (error) {
      console.log(error)
    }
  },
)

export const toggleUsersStatus = createAsyncThunk(
  'users/toggleUsersStatus',
  async (id, thunkAPI) => {
    try {
      console.log(id)
      await customFetch.patch(`/users/status/:${id}`)
      thunkAPI.dispatch(setUserStatus(id))
      thunkAPI.dispatch(addToast(BasicToast('#2eb85c', 'you blocked this user successfully')))
    } catch (error) {
      console.log(error)
    }
  },
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateCurrentPage: (state, { payload }) => {
      state.currentPage = payload
    },
    updateTotalSize: (state, { payload }) => {
      if (payload === 'update') {
        state.totalSize = state.totalSize * 2
      }
      if (payload === 'truncate') {
        state.totalSize = state.sizePerPage * state.currentPage
      }
    },
    setUserStatus: (state, { payload }) => {
      state.users.forEach((user) => {
        if (user._id === payload) {
          user.status = !user.status
        }
      })
    },
  },
  extraReducers: {
    [usersList.pending]: (state) => {
      state.isLoading = false
    },
    [usersList.fulfilled]: (state, { payload }) => {
      state.isLoading = true
      state.users = payload
    },
  },
})
export const { updateCurrentPage, updateTotalSize, setUserStatus } = usersSlice.actions
export default usersSlice.reducer
