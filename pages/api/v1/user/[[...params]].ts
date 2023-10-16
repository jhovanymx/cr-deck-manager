import { Body, createHandler, Get, Param, Post } from 'next-api-decorators'
import client from '../../../../clients/graphql-client'
import { convertDecks } from '../../../../converters/deck-converter'
import { ADD_DECK, DECKS_BY_USERNAME } from '../../../../constants/graphql-constants'

class DecksHandler {
  @Get("/:username/decks")
  async getDecksByUsername(@Param("username") username: string) {
    const { data } = await client.query({
      query: DECKS_BY_USERNAME, 
      variables: {username}
    })
    return convertDecks(data)
  }

  @Post("/:username/decks")
  async addDeck(@Param("username") username: string, @Body() deck: any) {
    await client.mutate({
      mutation: ADD_DECK,
      variables: {
        userId: deck.userId,
        displayName: deck.displayName,
        cards: deck.cards
      }
    })
  }
}

export default createHandler(DecksHandler)