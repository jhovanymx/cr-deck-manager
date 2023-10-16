import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'redux/slices/user-slice'
import appReducer from 'redux/slices/app-slice'
import { deckApi } from 'api/deck-api'

export default configureStore({
  reducer: {
    [deckApi.reducerPath]: deckApi.reducer,
    user: userReducer,
    app: appReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(deckApi.middleware)
})