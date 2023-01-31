// import customFetch from 'src/utils/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { addToast } from '../uiSlice'
// import BasicToast from 'src/views/notifications/toasts/BasicToast'
import { usersPaginationReducers } from '../common/commonReducers'
import { usersListThunk } from '../common/commonThunk'
import { toggleUsersStatusThunk, updateUsersPwThunk } from './usersThunk'
const initialState = {
  user: null,
  users: [],
  currentPage: 1,
  totalSize: 12,
  sizePerPage: 4,
  addMorePage: true,
  isLoading: false,
}

export const usersList = createAsyncThunk('users/usersList', usersListThunk)

export const toggleUsersStatus = createAsyncThunk('users/toggleUsersStatus', toggleUsersStatusThunk)

export const updateUsersPw = createAsyncThunk('users/updateUsersStatus', updateUsersPwThunk)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    ...usersPaginationReducers,
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
export const { updateCurrentPage, updateTotalSize, setUserStatus, setAddMMorePage } =
  usersSlice.actions
export default usersSlice.reducer
