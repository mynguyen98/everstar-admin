import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customFetch2 } from 'src/utils/axios'
import moment from 'moment'
import { usersPaginationReducers } from '../common/commonReducers'
import { listItemThunk } from '../common/commonThunk'
import { addToast } from '../uiSlice'
import BasicToast from 'src/views/notifications/toasts/BasicToast'
import { extraReducerList } from '../common/commonReducers'
const initialState = {
  cusers: [],
  cuserDetail: {
    isLoading: true,
    cuser: null,
  },
  columnsControl: {
    userId: true,
    userName: true,
    status: true,
  },
  currentPage: 1,
  totalSize: 40,
  sizePerPage: 10,
  addMorePage: true,
  isLoading: false,
  ccusers: {
    ccusersAndroid: [],
    ccusersIos: [],
    labels: [],
  },
}

export const concurrentUser = createAsyncThunk(
  'cusers/concurrentUser',
  async ({ version }, thunkAPI) => {
    try {
      const random = () => Math.round(Math.random() * 100)
      // const resA = await customFetch(
      //   `https://api-dev.everstar.vn/api/v1/connection/ccu?platform=android&version=${version}`,
      // )
      // const resI = await customFetch(
      //   `https://api-dev.everstar.vn/api/v1/connection/ccu?platform=ios&version=${version}`,
      // )
      const fakeA = random()
      const fakeB = random()
      return {
        resA: { data: { total: fakeA } },
        resI: { data: { total: fakeB } },
        moment: moment().format('HH:mm:ss'),
      }
    } catch (error) {
      console.log(error)
    }
  },
)
export const cusersList = createAsyncThunk('cusers/cusersList', listItemThunk)

export const getSpecificCuser = createAsyncThunk('cusers/getSpecificCuser', listItemThunk)
export const CuserToKol = createAsyncThunk('cusers/setCuserToKol', async (userId, thunkAPI) => {
  try {
    const res = await customFetch2.patch(`/auth/admin/v1/user/set-kol/${userId}`)
    thunkAPI.dispatch(addToast(BasicToast('#2eb85c', 'Set user to be a KOL successfully')))
    thunkAPI.dispatch(setCuserToKol(userId))
    console.log(res.data)
    return res.data.banned
  } catch (error) {
    thunkAPI.dispatch(
      addToast(BasicToast('#e55353', 'Set user to be a KOL failed', error.response.data.message)),
    )
  }
})
export const toggleBannedCuser = createAsyncThunk(
  'cusers/banndedCuser',
  async (userId, thunkAPI) => {
    try {
      const res = await customFetch2.patch(`/auth/admin/v1/user/toggle-banned/${userId}`)
      thunkAPI.dispatch(addToast(BasicToast('#2eb85c', 'Toggle ban user successfully')))
      thunkAPI.dispatch(bannedCuser(userId))
      console.log(res.data)
    } catch (error) {
      console.log(error)
      thunkAPI.dispatch(
        addToast(BasicToast('#e55353', 'Ban user failed', error.response.data.message)),
      )
    }
  },
)
const cusersSlice = createSlice({
  name: 'cusers',
  initialState,
  reducers: {
    ...usersPaginationReducers,
    setCuserToKol: (state, { payload }) => {
      state.cusers.forEach((user) => {
        if (user.id === payload) {
          user.kol = true
        }
      })
    },
    bannedCuser: (state, { payload }) => {
      state.cusers.forEach((user) => {
        if (user.id === payload) {
          user.banned = !user.banned
        }
      })
    },
    setColumnsControl: (state, { payload }) => {
      const { name, value } = payload
      state.columnsControl[name] = value
    },
    // Update user detail profile
    updateCuserDetail: (state, { payload }) => {
      state.cuserDetail.cuser.banned = payload
    },
    cuserDetailToKol: (state, { payload }) => {
      state.cuserDetail.cuser.kol = payload
    },
  },
  extraReducers: {
    [concurrentUser.fulfilled]: (state, { payload }) => {
      if (state.ccusers.ccusersAndroid.length < 7) {
        state.ccusers.ccusersAndroid.unshift(payload.resA.data.total)
        state.ccusers.ccusersIos.unshift(payload.resI.data.total)
        state.ccusers.labels.unshift(payload.moment)
      } else {
        //  for android
        state.ccusers.ccusersAndroid.pop()
        state.ccusers.ccusersAndroid.unshift(payload.resA.data.total)
        // for IOS
        state.ccusers.ccusersIos.pop()
        state.ccusers.ccusersIos.unshift(payload.resI.data.total)
        // for labels
        state.ccusers.labels.pop()
        state.ccusers.labels.unshift(payload.moment)
      }
    },
    [getSpecificCuser.pending]: (state) => {
      state.cuserDetail.isLoading = true
    },
    [getSpecificCuser.fulfilled]: (state, { payload }) => {
      console.log(payload)
      state.cuserDetail.cuser = payload[0]
      state.cuserDetail.isLoading = false
    },
    ...extraReducerList(cusersList, 'cusers'),
  },
})
export const {
  updateCurrentPage,
  updateTotalSize,
  setAddMMorePage,
  bannedCuser,
  setCuserToKol,
  setColumnsControl,
  updateCuserDetail,
  cuserDetailToKol,
} = cusersSlice.actions

export default cusersSlice.reducer
