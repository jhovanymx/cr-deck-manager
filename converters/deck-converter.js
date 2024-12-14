import { getCardByCode } from 'services/card-service'

export function convertDecks(data) {
  const decksData = data || []
  return decksData.map(deck => {
    const cardsData = deck.cards || []
    let position = 0
    const cards = cardsData.map(code => {
      return {
        ...getCardByCode(code),
        position: position++
      }
    })
    return {
      id: deck.id,
      displayName: deck.displayName,
      cards
    }
  })
}