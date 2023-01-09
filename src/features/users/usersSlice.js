import customFetch from 'src/utils/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
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
        thunkAPI.dispatch(updateTotalSize('truncate'))
      }
      return users
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
export const { updateCurrentPage, updateTotalSize } = usersSlice.actions
export default usersSlice.reducer
