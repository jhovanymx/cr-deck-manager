import { gql } from '@apollo/client'

// Queries
export const GET_USER_BY_USERNAME = gql`
query($username: String) {
  userByUsername(username: $username){
    _id
    configuration {
      cardOrdering
      allowDuplicateDecks
    }
  }
}`

export const GET_LABELS_BY_USERNAME = gql`
query($username: String) {
  labelsByUsername(username: $username) {
    data {
      _id
      color
      displayName
    }
  }
}`

export const DECKS_BY_USERNAME = gql`
query($username: String) {
  userByUsername(username: $username) {
    decks {
      data {
        displayName
        cards {
          data {
            _id
            code
            position
          }
        }
      }
    }
  }
}`

// Mutations
export const ADD_DECK = gql`
mutation($userId: ID, $displayName: String!, $cards: [CardInput]) {
  createDeck(data : {
    user: {
      connect: $userId
    },
    displayName: $displayName,
    cards: {
      create: $cards
    }
  }) {
    _id
  }
}`