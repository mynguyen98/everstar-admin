// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { usersPaginationReducers } from '../common/commonReducers'

// import { extraReducerList } from '../common/commonReducers'
// import { createSubThunk } from './subsThunk'
// import { listingSubsThunk } from './subsThunk'
// const initialState = {
//   isLoading: false,
//   currentPage: 1,
//   totalSize: 30,
//   sizePerPage: 10,
//   addMorePage: true,
//   subs: [],
//   nearlyCreatedSubId: '',
// }

// export const createSub = createAsyncThunk('subs/createSub', createSubThunk)

// export const listingSubs = createAsyncThunk('subs/listingSubs', listingSubsThunk)

// const subsSlice = createSlice(
//   {
//     name: 'subs',
//     initialState,
//     reducers: {
//       ...usersPaginationReducers,
//     },
//     extraReducers: {
//       ...extraReducerList(listingSubs, 'subs'),
//       [createSub.pending]: (state) => {
//         state.isLoading = true
//       },
//       [createSub.fulfilled]: (state, { payload }) => {
//         state.isLoading = false
//         state.nearlyCreatedSubId = payload
//       },
//     },
//   },
//   {
//     name: 'subsPage',
//     initialState,
//   },
// )

// export const { updateCurrentPage, updateTotalSize, setAddMMorePage } = subsSlice.actions
// export default subsSlice.reducer
import { createSubSlice } from './createSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSubThunk } from './subsThunk'
import { listingSubsThunk } from './subsThunk'
import { extraReducerList } from '../common/commonReducers'

export const createSub = createAsyncThunk('subs/createSub', createSubThunk)
export const listingSubs = createAsyncThunk('subs/listingSubs', listingSubsThunk)
export const subsSlice = createSubSlice({
  name: 'subs',
  initialStateMore: {
    nearlyCreatedSubId: '',
  },
  extraReducers: { ...extraReducerList(listingSubs, 'subs') },
})

export const { updateCurrentPage, updateTotalSize, setAddMMorePage } = subsSlice.actions
export default subsSlice.reducer
