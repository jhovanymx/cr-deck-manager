import { MAX_DECK_LENGTH } from 'constants/app-constants'

export function convertToCurrentCards(cards) {
  for (let i = 0; i < MAX_DECK_LENGTH; i++) {
    if (!cards[i]) {
      cards.push({
        index: i,
        isSelectable: true,
        isPlaceHolder: true
      })
    } else {
      cards[i].index = i
      cards[i].isSelectable = true
    }
  }
  if (!cards.some(card => !!card.isSelected)) {
    cards[0].isSelected = true
  }
  return cards
}