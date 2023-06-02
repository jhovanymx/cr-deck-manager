import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'redux/slices/user-slice'
import appReducer from 'redux/slices/app-slice'

export default configureStore({
  reducer: {
    user: userReducer,
    app: appReducer
  }
})