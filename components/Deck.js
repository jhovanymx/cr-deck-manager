import Card from 'components/Card'

export default function Deck ({displayName, cards }) {
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
    </div>
  )
}