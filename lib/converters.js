export function convertDecks(data) {
  const decksData = data.userByUsername.decks.data || []
  return decksData.map(deck => {
    const cardsData = deck.userCards.data || []
    const cards = cardsData.map(cardData => {
      return {
        ...cardData.card,
        position: cardData.position
      }
    })
    return {
      displayName: deck.displayName,
      cards
    }
  })
}

export function convertToCurrentCards(cards) {
  const MAX_DECK_LENGTH = 8

  for (let i = 0; i < MAX_DECK_LENGTH; i++) {
    if (!cards[i]) {
      cards.push({isPlaceHolder: true})
    }
  }
  return cards
}
