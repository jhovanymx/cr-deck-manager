import { useSelector, useDispatch } from "react-redux"
import Deck from 'components/Deck'

export default function Decks () {
  const decks = useSelector(state => state.app.decks)
  
  return (
    <div className="flex mt-4 space-x-4">
      { decks.map(deck => (
        <Deck {...deck} />
      ))}
    </div>
  )
}