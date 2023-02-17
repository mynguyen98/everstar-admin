import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customFetch2 } from 'src/utils/axios'
import { usersPaginationReducers } from '../common/commonReducers'
import { addToast } from '../uiSlice'
import BasicToast from 'src/views/notifications/toasts/BasicToast'
import { closeModal } from '../uiSlice'
import { extraReducerList } from '../common/commonReducers'
const initialState = {
  isLoading: false,
  // editKol: {
  //   name: '',
  //   email: '',
  //   title: '',
  //   country: '',
  //   price: '',
  //   address: '',
  // },
  currentPage: 1,
  totalSize: 50,
  sizePerPage: 10,
  addMorePage: true,
  kols: [],
  subcriptions: [],
}

export const createKol = createAsyncThunk('kols/createKol', async (kol, thunkAPI) => {
  try {
    const response = await customFetch2.post(`/stores/admin/v1/kol`, kol)
    console.log(response)
    thunkAPI.dispatch(addToast(BasicToast('#2eb85c', 'Create KOL successfully')))
    thunkAPI.dispatch(closeModal())
    thunkAPI.dispatch(updateKolCreated(kol))
    thunkAPI.dispatch(listingKols({ limit: 10, offset: 0 }))
  } catch (error) {
    console.log(error)
    thunkAPI.dispatch(addToast(BasicToast('#e55353', 'Create KOL failed', error.response.message)))
  }
})

export const listingKols = createAsyncThunk('kols/listingKols', async ({ limit, offset }) => {
  try {
    const res = await customFetch2.get(`/stores/admin/v1/kol?limit=${limit}&offset=${offset}`)
    const kols = res.data.data
    return kols
  } catch (error) {
    console.log(error)
  }
})

// export const listingSubcriptions = createAsyncThunk('kols/listingSubcriptions', async)

const kolSlice = createSlice({
  name: 'kols',
  initialState,
  reducers: {
    ...usersPaginationReducers,
    updateKolCreated: (state, { payload }) => {
      state.kols.pop()
      state.kols.unshift(payload)
    },
  },
  extraReducers: {
    ...extraReducerList(listingKols, 'kols'),
  },
})
export const {
  updateKolCreated,
  updateNewStoreId,
  updateCurrentPage,
  updateTotalSize,
  setAddMMorePage,
} = kolSlice.actions
export default kolSlice.reducer
