import { createSlice } from '@reduxjs/toolkit'
import { convertToCurrentCards } from 'converters/card-converter'
import { MAX_DECK_LENGTH } from 'constants/app-constants'

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
    isGroupView: false,
    config: {
      shortcutsEnabled: true
    },
    isLoaderVisible: false
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
    updateDeck: (state, { payload }) => {
      const deck = state.decks.filter(deck => deck.id = payload.id)
      if (deck) {
        deck.displayName = payload.displayName
        deck.cards = payload.cards
      }
    },
    deleteDeck: (state, { payload }) => {
      state.decks = state.decks.filter(deck => deck.id != payload)
    },
    setDecks: (state, { payload }) => {
      state.decks = payload
    },
    setCurrentDeck: (state, { payload }) => {
      state.currentDeck = payload
    },
    setDisplayNameCurrentDeck: (state, { payload }) => {
      state.currentDeck.displayName = payload
    },
    setCardsCurrentDeck: (state, { payload }) => {
      state.currentDeck.cards = convertToCurrentCards(payload)
    },
    selectCardCurrentDeck: (state, { payload }) => {
      const card = state.currentDeck.cards[payload]
      if (card) {
        state.currentDeck.cards.forEach(card => card.isSelected = false)
        card.isSelected = true
      }
    },
    setSelectedCardCurrentDeck: (state, { payload: code }) => {
      const selectedCard = state.currentDeck.cards.find(card => card.isSelected)
      if (selectedCard) {
        selectedCard.code = code
        selectedCard.isPlaceHolder = false
        const newIndex = (selectedCard.index + 1) % MAX_DECK_LENGTH
        appSlice.caseReducers.selectCardCurrentDeck(state, {payload: newIndex})
      }
    },
    clearCurrentDeck: (state) => {
      state.currentDeck.displayName = ""
      state.currentDeck.cards = convertToCurrentCards([])
    },
    setGroup: (state, { payload }) => {
      state.groups = payload
    },
    setGroupView: (state, { payload }) => {
      state.isGroupView = payload
    },
    showLoader: (state) => {
      state.isLoaderVisible = true
    },
    hideLoader: (state) => {
      state.isLoaderVisible = false
    }
  }
})

export const { 
  setLabels, addDeck, updateDeck, deleteDeck, setDecks, 
  setCurrentDeck, setDisplayNameCurrentDeck, setCardsCurrentDeck, selectCardCurrentDeck, setSelectedCardCurrentDeck, clearCurrentDeck,
  setGroup, setGroupView,
  showLoader, hideLoader
} = appSlice.actions
export default appSlice.reducer