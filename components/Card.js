import { useDrag } from 'react-dnd'
import Image from 'next/image'
import appConfig from 'config/app.json'
import { getCardUrl } from 'services/card-service'

export default function Card ({ index, code, isSelected, isSelectable, isPlaceHolder, onClickCard = () => {} }) {
  const { cardSize } = appConfig
  const cardStyle = {height: cardSize.height, width: cardSize.width}

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "card",
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  const onClickCardHandler = () => {
    onClickCard({index, code, isSelectable})
  }

  return (
    <div ref={dragRef} className="rounded-lg">
      <div className={`rounded-md ${isSelectable && "bg-gray-400"} ${isSelected && 'animate-waving-hand'} cursor-pointer`} style={cardStyle} onClick={onClickCardHandler}>
        { !isPlaceHolder && 
          <Image 
            className=""
            width={cardSize.width}
            height={cardSize.height}
            alt="Card Image"
            src={getCardUrl(code)}
          />
        }
      </div>
    </div>
  )
}