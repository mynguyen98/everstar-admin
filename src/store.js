import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import uiSlice from './features/uiSlice'
const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
