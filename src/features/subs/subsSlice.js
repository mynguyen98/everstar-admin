import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customFetch2 } from 'src/utils/axios'
import { usersPaginationReducers } from '../common/commonReducers'
import { addToast } from '../uiSlice'
import BasicToast from 'src/views/notifications/toasts/BasicToast'
import { extraReducerList } from '../common/commonReducers'
const initialState = {
  isLoading: false,
  currentPage: 1,
  totalSize: 30,
  sizePerPage: 10,
  addMorePage: true,
  subs: [],
  nearlyCreatedSubId: '',
}

export const createSub = createAsyncThunk('subs/createSub', async (sub, thunkAPI) => {
  try {
    const resp = await customFetch2.post('/stores/admin/v1/subscription', sub)
    console.log(resp.data)
    thunkAPI.dispatch(addToast(BasicToast('#2eb85c', 'Create subscription successfully')))
    return resp.data.subscriptionId
  } catch (error) {
    thunkAPI.dispatch(
      addToast(BasicToast('#e55353', `Create subscription failed`, error.response.status)),
    )
  }
})

export const listingSubs = createAsyncThunk(
  'subs/listingSubs',
  async ({ limit, offset }, thunkAPI) => {
    try {
      const res = await customFetch2.get(
        `/stores/admin/v1/subscription?limit=${limit}&offset=${offset}`,
      )

      const subs = res.data.data
      return subs
    } catch (error) {
      console.log(error)
    }
  },
)

const subsSlice = createSlice({
  name: 'subs',
  initialState,
  reducers: {
    ...usersPaginationReducers,
  },
  extraReducers: {
    ...extraReducerList(listingSubs, 'subs'),
    [createSub.pending]: (state) => {
      state.isLoading = true
    },
    [createSub.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.nearlyCreatedSubId = payload
    },
  },
})
export const { updateCurrentPage, updateTotalSize, setAddMMorePage } = subsSlice.actions
export default subsSlice.reducer
