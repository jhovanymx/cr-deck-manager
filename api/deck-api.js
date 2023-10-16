import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const deckApi = createApi({
  reducerPath: 'deckApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/user/' 
  }),
  endpoints: (builder) => ({
    getDecksByUsername: builder.query({
      query: (username) => `${username}/decks`,
    }),
    addDeck: builder.mutation({
      query: ({username, ...deck}) => ({
        url: `${username}/decks`,
        method: "POST",
        body: deck
      })
    })
  })
})

export const {
  useGetDecksByUsernameQuery,
  useAddDeckMutation
} = deckApi