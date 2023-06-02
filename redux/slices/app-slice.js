import { createSlice } from '@reduxjs/toolkit'
import { convertToCurrentCards } from 'lib/converters'

export const appSlice = createSlice({
  name: "app",
  initialState: {
    locale: "en",
    decks: [],
    currentDeck: {
      displayName: "",
      cards: convertToCurrentCards([])
    },
    groups: [],
    labels: [],
    isGroupView: false
  },
  reducers: {
    setLabels: (state, { payload }) => {
      state.locale = payload
    },
    setLabels: (state, { payload }) => {
      state.labels = payload
    },
    addDeck: (state, { payload }) => {
      state.decks.push(payload)
    },
    setDecks: (state, { payload }) => {
      state.decks = payload
    },
    setCurrentDeck: (state, { payload }) => {
      state.currentDeck = payload
    },
    setCardsCurrentDeck: (state, { payload }) => {
      state.currentDeck.cards = convertToCurrentCards(payload)
    },
    clearCurrentDeck: (state) => {
      state.currentDeck.displayName = ""
      state.currentDeck.cards = []
    },
    setGroup: (state, { payload }) => {
      state.groups = payload
    },
    setGroupView: (state, { payload }) => {
      state.isGroupView = payload
    },
  }
})

export const { 
  setLabels, addDeck, setDecks, setCurrentDeck, setCardsCurrentDeck, clearCurrentDeck,
  setGroup, setGroupView
} = appSlice.actions
export default appSlice.reducer