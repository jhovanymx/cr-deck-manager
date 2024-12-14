import { Body, createHandler, Param, Get, Post, Put, Delete } from 'next-api-decorators'
import * as repository from '../../../../repositories/fauna-repository'
import { convertDecks } from '../../../../converters/deck-converter'

class DecksHandler {
  @Get("/:userId/decks")
  async getDecks(@Param("userId") userId: string) {
    const data = await repository.getDecksByUserId(userId)
    return convertDecks(data)
  }

  @Post("/:userId/decks")
  async createDeck(@Param("userId") userId: string, @Body() deck: any) {
    const result = await repository.createDeck(userId, deck)
    console.log("result", result)
    return {
      id: result.data?.id
    }
  }

  @Put("/decks/:deckId")
  async updateDeck(@Param("deckId") deckId: string, @Body() deck: any) {
    const result = await repository.updateDeck(deckId, deck)
    return {
      id: result.data.id
    }
  }

  @Delete("/decks/:deckId")
  async deleteDeck(@Param("deckId") deckId: string) {
    return await repository.deleteDeck(deckId)
  }
}

export default createHandler(DecksHandler)