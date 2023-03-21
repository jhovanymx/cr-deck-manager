import { createSlice } from '@reduxjs/toolkit'

export const deckSlice = createSlice({
  name: "deck",
  initialState: {
    decks: [],
    labels: []
  },
  reducers: {
    addDeck: (state, action) => {
      state.decks.push(action.payload)
    },
    setLabels: (state, action) => {
      state.labels = action.payload
    }
  }
})

export const { addDeck, setLabels } = deckSlice.actions
export default deckSlice.reducer