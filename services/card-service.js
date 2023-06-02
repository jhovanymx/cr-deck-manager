import { CardRarity } from 'model/constants'

export function getCardUrl(code) {
  return `/cards/${code}.png`
}

export function parseCardsCode(cardsCode) {
  const { cards:cardList } = appConfig
  const errors = []
  const extractedCodes = cardsCode.split(" ").filter(code => code)
  
  if (extractedCodes.some(code => !cardList.includes(code))) {
    errors.push("errors.invalidCode")
  }
  
  if (extractedCodes.length > 8) {
    errors.push("errors.deckLength")
  }

  const championsOnDeck = extractedCodes.filter(code => CardRarity.CHAMPION === getCardRarityByCode(code))
  if (championsOnDeck.length > 1) {
    errors.push("errors.onlyOneChampion")
  }

  let i = 0
  const cards = extractedCodes.map(code => ({
    code,
    index: i++,
    isEdit: true
  }))

  return {cards, errors}
}

function getCardRarityByCode(code) {
  const card = appConfig.cards.find(card => card.code === code)
  return card?.rarity
}

function getCardByCode(code) {
  return appConfig.cards.find(card => card.code === code)
}