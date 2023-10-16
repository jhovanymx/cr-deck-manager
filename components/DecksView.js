import { useSelector, useDispatch } from "react-redux"
import Deck from 'components/Deck'

export default function DecksView () {
  const decks = useSelector(state => state.app.decks)
  const decksAlt = useSelector(state => state.deckApi.decks)
  
  return (
    <div className="flex flex-wrap mt-4 gap-4">
      {
        decks.map((deck, index) => (
          <Deck key={index} {...deck} />
        ))
      }
    </div>
  )
}