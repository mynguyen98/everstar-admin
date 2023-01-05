import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  name: '',
  email: '',
  title: '',
  country: '',
  price: '',
  address: '',
}

const idolSlice = createSlice({
  name: 'idol',
  initialState,
  reducers: {
    setEditIdol: (state, { payload }) => {
      return { ...state, ...payload }
    },
  },
})
export const { setEditIdol } = idolSlice.actions
export default idolSlice.reducer
