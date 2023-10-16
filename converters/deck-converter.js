import { getCardByCode } from 'services/card-service'

export function convertDecks(data) {
  const decksData = data.userByUsername.decks.data || []
  return decksData.map(deck => {
    const cardsData = deck.cards.data || []
    const cards = cardsData.map(cardData => {
      return {
        ...getCardByCode(cardData.code),
        position: cardData.position
      }
    })
    return {
      displayName: deck.displayName,
      cards
    }
  })
}