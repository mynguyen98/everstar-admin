import customFetch from 'src/utils/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addToast } from '../uiSlice'
import BasicToast from 'src/views/notifications/toasts/BasicToast'
const initialState = {
  user: null,
  users: [],
  currentPage: 1,
  totalSize: 12,
  sizePerPage: 4,
  addMorePage: true,
  isLoading: false,
}

export const usersList = createAsyncThunk(
  'users/usersList',
  async ({ type, name, limit, offset }, thunkAPI) => {
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
  },
)

export const toggleUsersStatus = createAsyncThunk(
  'users/toggleUsersStatus',
  async (id, thunkAPI) => {
    try {
      await customFetch.patch(`/users/status/${id}`)
      thunkAPI.dispatch(setUserStatus(id))
      thunkAPI.dispatch(addToast(BasicToast('#2eb85c', 'you blocked this user successfully')))
    } catch (error) {}
  },
)

export const updateUsersPw = createAsyncThunk(
  'users/updateUsersStatus',
  async ({ id, password }, thunkAPI) => {
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
      if (payload === 'reduce') {
        state.totalSize = state.totalSize - state.sizePerPage
        state.currentPage = state.currentPage - 1
      }
    },
    setUserStatus: (state, { payload }) => {
      state.users.forEach((user) => {
        if (user._id === payload) {
          user.status = !user.status
        }
      })
    },
    setAddMMorePage: (state, { payload }) => {
      state.addMorePage = payload
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
export const { updateCurrentPage, updateTotalSize, setUserStatus, setAddMMorePage } =
  usersSlice.actions
export default usersSlice.reducer
