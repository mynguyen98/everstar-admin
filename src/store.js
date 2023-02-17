import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import uiSlice from './features/uiSlice'
import kolSlice from './features/kols/kolsSlice'
import userSlice from './features/user/userSlice'
import usersSlice from './features/users/usersSlice'
import cusersSlice from './features/cusers/cusersSlice'
import subsSlice from './features/subs/subsSlice'
import ckolsSlice from './features/cusers/ckolsSlice'
const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    kols: kolSlice,
    user: userSlice,
    users: usersSlice,
    cusers: cusersSlice,
    subs: subsSlice,
    ckols: ckolsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
