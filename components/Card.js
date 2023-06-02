import { useDrag } from 'react-dnd'
import Image from 'next/image'
import appConfig from 'config/app.json'
import { getCardUrl } from 'services/card-service'

export default function Card ({ code, isPlaceHolder, index }) {
  const { cardSize } = appConfig

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "card",
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  const cardStyle = {height: cardSize.height, width: cardSize.width}

  return (
    <div ref={dragRef} className="rounded-lg">
      <div className="rounded-md bg-gray-400" style={cardStyle} >
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