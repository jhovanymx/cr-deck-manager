import { useQuery, gql } from '@apollo/client'
import client from 'utils/apollo-client'

const GET_LABELS_BY_USERNAME = gql`
query($username: String) {
  labelsByUsername(username: $username) {
    data {
      _id
      color
      displayName
    }
  }
}`

const DECKS_BY_USERNAME = gql`
query($username: String) {
  userByUsername(username: $username) {
    decks {
      data {
        displayName
        userCards {
          data {
            card {
              _id
              code
              elixirCost
              rarity
              type
              isWinCondition
              shortcuts
            }
            position
          }
        }
      }
    }
  }
}`

export const useLabelsByUsername = (username) => useQuery(GET_LABELS_BY_USERNAME, {variables: {username}})
export const getLabelsByUsername = async (username) => await client.query({query: GET_LABELS_BY_USERNAME, variables: {username}})

export const useDecksByUsername = (username) => useQuery(DECKS_BY_USERNAME, {variables: {username}})