import { usersPaginationReducers } from '../common/commonReducers'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  currentPage: 1,
  totalSize: 30,
  sizePerPage: 10,
  addMorePage: true,
  subs: [],
}

export const createSubSlice = ({ name, initialStateMore, reducers, extraReducers }) => {
  return createSlice({
    name,
    initialState: { ...initialStateMore, ...initialState },
    reducers: {
      ...usersPaginationReducers,
      ...reducers,
    },
    extraReducers: {
      ...extraReducers,
    },
  })
}
