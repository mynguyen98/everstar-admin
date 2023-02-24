import { createSubSlice } from './createSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSubThunk } from './subsThunk'
import { listingSubsThunk } from './subsThunk'
import { extraReducerList } from '../common/commonReducers'

export const createSub = createAsyncThunk('subsPage/createSub', createSubThunk)
export const listingSubs = createAsyncThunk('subsPage/listingSubs', listingSubsThunk)
export const subsPageSlice = createSubSlice({
  name: 'subsPage',

  // reducers: {},
  extraReducers: { ...extraReducerList(listingSubs, 'subs') },
})

export const { updateCurrentPage, updateTotalSize, setAddMMorePage } = subsPageSlice.actions
export default subsPageSlice.reducer
