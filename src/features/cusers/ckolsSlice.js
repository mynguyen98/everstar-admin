// ckolsSlice: kols in custommer list, store kol information in database

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { usersPaginationReducers } from '../common/commonReducers'
import { listItemThunk } from '../common/commonThunk'
import { extraReducerList } from '../common/commonReducers'
const initialState = {
  ckols: [],
  currentPage: 1,
  totalSize: 30,
  sizePerPage: 10,
  addMorePage: true,
  isLoading: false,
}
export const ckolsList = createAsyncThunk('cusers/ckolsList', listItemThunk)
const ckolsSlice = createSlice({
  name: 'ckols',
  initialState,
  reducers: {
    ...usersPaginationReducers,
  },
  extraReducers: {
    ...extraReducerList(ckolsList, 'ckols'),
  },
})
export const { updateCurrentPage, updateTotalSize, setAddMMorePage } = ckolsSlice.actions
// export const ckolsPaginateControl = ckolsSlice.actions
export default ckolsSlice.reducer
