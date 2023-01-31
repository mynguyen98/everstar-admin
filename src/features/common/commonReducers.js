// Reducers for pagination
export const usersPaginationReducers = {
  updateCurrentPage: (state, { payload }) => {
    state.currentPage = payload
  },
  updateTotalSize: (state, { payload }) => {
    if (payload === 'update') {
      state.totalSize = state.totalSize * 2
    }
    if (payload === 'truncate') {
      state.totalSize = state.sizePerPage * state.currentPage
    }
    if (payload === 'reduce') {
      state.totalSize = state.totalSize - state.sizePerPage
      state.currentPage = state.currentPage - 1
    }
  },
  setAddMMorePage: (state, { payload }) => {
    state.addMorePage = payload
  },
}
