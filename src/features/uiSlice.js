import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toast: 0,
  sidebarShow: true,
  modal: {
    visible: false,
    modalContent: '',
    title: '',
    size: '',
  },
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
    showModal: (state, { payload }) => {
      const { title, modalContent, size } = payload
      state.modal.visible = true
      state.modal.modalContent = modalContent
      state.modal.title = title
      state.modal.size = size
    },
    closeModal: (state) => {
      state.modal.visible = false
    },
  },
})

export const { addToast, toggleSidebar, showModal, closeModal } = uiSlice.actions
export default uiSlice.reducer
