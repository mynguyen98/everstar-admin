import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { signupUserThunk } from './userThunk'
const initialState = {
  isLoading: false,
  name: '',
  email: '',
  password: '',
  profilePicUrl: '',
  repeatPw: '',
  isEditing: false,
}

export const signupUser = createAsyncThunk('auth/signupUser', signupUserThunk)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearFields: (state) => {
      return { ...initialState, isEditing: state.isEditing }
    },
    handleChangeInput: (state, { payload }) => {
      return { ...state, ...payload }
    },
  },
  extraReducers: {
    [signupUser.pending]: (state) => {
      state.isLoading = true
    },
    [signupUser.fulfilled]: (state) => {
      return { ...initialState }
    },
  },
})
export const { handleChangeInput, clearFields } = userSlice.actions
export default userSlice.reducer
