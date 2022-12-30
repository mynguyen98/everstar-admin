import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toast: 0,
  sidebarShow: true,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addToast: (state, action) => {
      state.toast = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarShow = !state.sidebarShow
    },
  },
})

export const { addToast, toggleSidebar } = uiSlice.actions
export default uiSlice.reducer
