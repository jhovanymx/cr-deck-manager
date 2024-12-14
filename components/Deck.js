import Card from "components/Card"
import { BiEditAlt, BiLabel } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import RatingDeck from "components/RatingDeck"
import LabelsDeck from "components/LabelsDeck"

export default function Deck(props) {
  const {
    id,
    displayName,
    rate = 0,
    cards,
    onClickEdit = () => {},
    onClickDelete = () => {}
  } = props

  const beforeOnEdit = () => {
    const deck = {
      id,
      displayName,
      cards: cards.map(card => ({...card}))
    }
    onClickEdit(deck)
  }

  const onChangeRating = () => {
    
  }

  const onChangeLabel = (labelInfo) => {
    console.log("labelInfo", labelInfo)
  }

  return (
    <div className="bg-gray-200 p-3 rounded-md">
      <div className="text-sm font-bold h-4">{ displayName }</div>
      <div className="grid grid-cols-4 gap-1 mt-2">
        {
          cards.map(card => (
            <Card key={card.code} {...card} />
          ))
        }
      </div>
      <div className="flex gap-3">
        <BiEditAlt 
          className="w-6 h-6 p-1 rounded-md hover:bg-gray-100"
          onClick={() => beforeOnEdit()} />
        <MdDelete 
          className="w-6 h-6 p-1 rounded-md hover:bg-gray-100"
          onClick={() => onClickDelete(id)} />
        <LabelsDeck
          onChangeLabel={onChangeLabel} />
        <RatingDeck
          starCount={rate}
          onChangeRating={onChangeRating} />
      </div>
    </div>
  )
}