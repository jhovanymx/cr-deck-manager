import { useDispatch, useSelector } from 'react-redux'
import Card from 'components/Card'
import { selectCardCurrentDeck } from 'redux/slices/app-slice'

export default function CurrentDeck () {
  const currentDeck = useSelector(state => state.app.currentDeck)
  const dispatch = useDispatch()

  const onClickCard = (card) => {
    dispatch(selectCardCurrentDeck(card.index))
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {currentDeck.cards.map(card => (
        <Card
          key={card.index}
          onClickCard={onClickCard}
          {...card} />
      ))}
    </div>
  )
}