import client from 'clients/graphql-client'
import { GET_USER_BY_USERNAME, GET_LABELS_BY_USERNAME } from 'constants/graphql-constants'

export const getUserByUsername = async (username) => await client.query({query: GET_USER_BY_USERNAME, variables: {username}})
export const getLabelsByUsername = async (username) => await client.query({query: GET_LABELS_BY_USERNAME, variables: {username}})