import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import uiSlice from './features/uiSlice'
import idolSlice from './features/idol/idolSlice'
import userSlice from './features/user/userSlice'
const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    idol: idolSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
