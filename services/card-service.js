import appConfig from 'config/app.json'
import { CardRarity } from 'model/constants'

const { cards:cardList } = appConfig

export function getCardUrl(code) {
  return `/cards/${code}.png`
}

export function parseCardsCode(cardsCode, config) {
  const errors = []
  const extractedCards = extractCards(cardsCode, config.shortcutsEnabled)
  
  const invalidCards = extractedCards.filter(card => !card.isValid)
  if (invalidCards.length > 0) {
    errors.push({
      key: "errors.invalidCode",
      params: {
        codes: invalidCards.map(card => card.code).join(" ")
      }
    })
  }
  
  if (extractedCards.length > 8) {
    errors.push({key: "errors.deckLength"})
  }

  const numberOfChampions = extractedCards.filter(card => CardRarity.CHAMPION === getCardRarityByCode(card.code))
  if (numberOfChampions.length > 1) {
    errors.push({key: "errors.onlyOneChampion"})
  }

  return {cards: extractedCards, errors}
}

function extractCards(cardsCode, shortcutsEnabled) {
  let i = 0
  return cardsCode.split(" ").map(code => {
    let validCode = convertToValidCardCode(code, shortcutsEnabled)
    return {
      code: validCode || code,
      isValid: !!validCode,
      index: i++,
      isEdit: true
    }
  })
}

function convertToValidCardCode(code, shortcutsEnabled) {
  const extractor = (field) => {
    const map = {}
    cardList.forEach(card => map[card[field]] = card)
    return map
  }
  const cardMap = extractor(shortcutsEnabled ? "shortcut" : "code")
  return cardMap[code]?.code
}

function getCardRarityByCode(code) {
  const card = appConfig.cards.find(card => card.code === code)
  return card?.rarity
}

export function getCardByCode(code) {
  return appConfig.cards.find(card => card.code === code)
}

export function validateInsertionToDeck(cards, code) {
  const isDuplicated = cards.some(card => !card.isPlaceHolder && card.code === code)
  if (isDuplicated) {
    return "errors.noDupes"
  }

  const numberOfChampions = [{code}, ...cards].reduce((total, card) => {
    return total + (CardRarity.CHAMPION === getCardRarityByCode(card.code) ? 1 : 0)
  }, 0)
  if (numberOfChampions > 1) {
    return "errors.onlyOneChampion"
  }

  return null
}