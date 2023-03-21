import { useQuery, gql } from '@apollo/client'
import client from 'utils/apollo-client'

const GET_LABELS_BY_USERNAME = gql`
query($username: String) {
  userByUsername(username: $username) {
    decks {
      data {
        labels {
          data {
            color
            displayName
          }
        }
      }
    }
  }
}
`

export const useLabelsByUsername = (username) => useQuery(GET_LABELS_BY_USERNAME, {variables: {username}})
export const getLabelsByUsername = async (username) => await client.query({query: GET_LABELS_BY_USERNAME, variables: {username}})