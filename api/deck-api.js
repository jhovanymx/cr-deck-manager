import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const deckApi = createApi({
  reducerPath: 'deckApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/user/' 
  }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getDecksByUserId: builder.query({
      query: (userId) => `${userId}/decks`,
    }),
    addDeck: builder.mutation({
      query: ({userId, ...deck}) => ({
        url: `${userId}/decks`,
        method: "POST",
        body: deck
      })
    }),
    updateDeck: builder.mutation({
      query: (deckId) => ({
        url: `decks/${deckId}`,
        method: "PUT"
      })
    }),
    deleteDeck: builder.mutation({
      query: (deckId) => ({
        url: `decks/${deckId}`,
        method: "DELETE"
      })
    })
  })
})

export const {
  useGetDecksByUserIdQuery,
  useAddDeckMutation,
  useUpdateDeckMutation,
  useDeleteDeckMutation
} = deckApi