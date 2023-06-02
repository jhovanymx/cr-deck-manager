import { useDispatch, useSelector } from 'react-redux'
import Card from 'components/Card'

export default function CurrentDeck () {


  const currentDeck = useSelector(state => state.app.currentDeck)
  const dispatch = useDispatch()

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      { currentDeck.cards.map(card => <Card {...card} /> ) }
    </div>
  )
}