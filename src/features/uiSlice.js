import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toast: 0,
  sidebarShow: true,
  unfoldable: false,
  modal: {
    visible: false,
    modalContent: '',
    title: '',
    size: '',
    type: 'modal',
  },
  modal2: {
    visible: false,
    modalContent: '',
    title: '',
    size: '',
    type: 'modal2',
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
    toggleUnfoldable: (state) => {
      state.unfoldable = !state.unfoldable
    },
    setFoldable: (state, { payload }) => {
      state.unfoldable = payload
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
    showModal2: (state, { payload }) => {
      const { title, modalContent, size } = payload
      state.modal2.visible = true
      state.modal2.modalContent = modalContent
      state.modal2.title = title
      state.modal2.size = size
    },
    closeModal2: (state) => {
      state.modal2.visible = false
    },
  },
})

export const {
  addToast,
  toggleSidebar,
  showModal,
  closeModal,
  setCloseMenu,
  setToggleMenu,
  showModal2,
  closeModal2,
  toggleUnfoldable,
  setFoldable,
} = uiSlice.actions
export default uiSlice.reducer
