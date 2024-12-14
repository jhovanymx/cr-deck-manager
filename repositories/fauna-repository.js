import client from '../clients/faunadb-client'
import { fql } from "fauna"

export const getUserByUsername = async (username) => {
  const query = fql`User.all().where(.username == ${username}).first() {
    id,
    configuration {
      cardOrdering,
      allowDuplicateDecks
    }
  }`
  const result = await client.query(query)
  return result?.data
}

export const getLabelsByUserId = async (userId) => {
  const query = fql`User.all().where(.id == ${userId}).first() {
    labels {
      id,
      displayName,
      color
    }
  }`
  const result = await client.query(query)
  if (!result?.data) {
    return null
  }
  return result.data.labels?.data || []
}

export const getDecksByUserId = async (userId) => {
  const query = fql`User.all().where(.id == ${userId}).first() {
    decks {
      id,
      displayName,
      cards,
      rate
    }
  }`
  const result = await client.query(query)
  return result?.data?.decks?.data || []
}

export const createDeck = async (userId, deck) => {
  const query = fql`Deck.create({
    user: User.byId(${userId}),
    ...${deck}
  })`
  return client.query(query)
}

export const deleteDeck = async (deckId) => {
  const query = fql`Deck.byId(${deckId}).delete()`
  return await client.query(query)
}

export const updateDeck = async (deckId, deck) => {
  const query = fql`Deck.byId(${deckId})!.update(${deck})`
  return await client.query(query)
}