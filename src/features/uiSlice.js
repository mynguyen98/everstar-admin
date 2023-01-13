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
  showMenu: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setToggleMenu: (state) => {
      state.showMenu = !state.showMenu
    },
    setCloseMenu: (state) => {
      state.showMenu = false
    },
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

export const { addToast, toggleSidebar, showModal, closeModal, setCloseMenu, setToggleMenu } =
  uiSlice.actions
export default uiSlice.reducer
