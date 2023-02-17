// Reducers for pagination
export const usersPaginationReducers = {
  updateCurrentPage: (state, { payload }) => {
    state.currentPage = payload
  },
  updateTotalSize: (state, action) => {
    console.log(state, action)
    const payload = action.payload
    if (payload === 'update') {
      state.totalSize = state.totalSize * 2
    }
    if (payload === 'truncate') {
      state.totalSize = state.sizePerPage * state.currentPage
    }
    if (payload === 'reduce') {
      state.totalSize = state.totalSize - state.sizePerPage
      state.currentPage = 1
    }
  },
  setAddMMorePage: (state, { payload }) => {
    state.addMorePage = payload
  },
}

// extra Reducer for fetching list data pagination
export const extraReducerList = (asyncThunk, type) => {
  return {
    [asyncThunk.pending]: (state) => {
      state.isLoading = true
    },
    [asyncThunk.fulfilled]: (state, { payload }) => {
      const { addMorePage, currentPage, totalSize, sizePerPage } = state
      state.isLoading = false
      state[type] = payload
      if (
        addMorePage &&
        totalSize / sizePerPage === currentPage &&
        payload.length === sizePerPage
      ) {
        state.totalSize = state.totalSize * 2
      }
      if (payload.length < sizePerPage) {
        state.totalSize = state.sizePerPage * state.currentPage
        // if there is no user, not add more page anymore and reduce one page
        if (payload.length === 0 && currentPage != 1) {
          state.addMorePage = false
          state.totalSize = state.totalSize - state.sizePerPage
          // state.currentPage = state.currentPage - 1
          state.currentPage = state.currentPage - 1
        }
        if (payload.length === 0 && currentPage === 1) {
          console.log('running')
          state.addMorePage = true
          // thunkAPI.dispatch(updateTotalSize('update'))
        }
      }
    },
  }
}

// async ({ email, name, isBanned, isKol, limit, offset }, thunkAPI) => {
//   try {
//     const response = await customFetch2.get(
//       `/auth/admin/v1/user?${email ? `email=${email}` : ''}${name ? `&search=${name}` : ''}${
//         isBanned ? `&banned=${isBanned}` : ''
//       }${isKol ? `&kol=${isKol}` : ''}&limit=${limit}&offset=${offset > 0 ? offset : 0}`,
//     )
//     console.log(response.data)
//     // get specific pagination and pagination control

//     // const { addMorePage, currentPage, totalSize, sizePerPage } = thunkAPI.getState()[type]
//     // // /////CONTROL PAGINATION//////////////////////
//     const cusers = response.data.data
//     // console.log(cusers)
//     // // update totalsize if the lastpage has number of item equal to size per page
//     // if (addMorePage && totalSize / sizePerPage === currentPage && cusers.length === sizePerPage) {
//     //   thunkAPI.dispatch(updateTotalSize('update'))
//     // }
//     // if (cusers.length < sizePerPage) {
//     //   thunkAPI.dispatch(updateTotalSize('truncate'))
//     //   // if there is no user, not add more page anymore and reduce one page
//     //   if (cusers.length === 0 && currentPage != 1) {
//     //     thunkAPI.dispatch(setAddMMorePage(false))
//     //     thunkAPI.dispatch(updateTotalSize('reduce'))
//     //   }
//     //   if (cusers.length === 0 && currentPage === 1) {
//     //     console.log('running')
//     //     thunkAPI.dispatch(setAddMMorePage(true))
//     //     // thunkAPI.dispatch(updateTotalSize('update'))
//     //   }
//     // }
//     // console.log(cusers)
//     return cusers
//   } catch (error) {
//     console.log(error)
//   }
// }
