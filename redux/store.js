import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'redux/slices/user-slice'
import deckReducer from 'redux/slices/deck-slice'

export default configureStore({
  reducer: {
    user: userReducer,
    deck: deckReducer
  }
})