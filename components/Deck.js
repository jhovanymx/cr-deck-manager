import Card from 'components/Card'

export default function Deck ({displayName, cards }) {
  return (
    <div className="bg-gray-200 p-3 rounded-md">
      <div className="text-sm font-bold">{ displayName }</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 mt-2">
        { cards.map(card => (
          <Card {...card} />
        ))}
      </div>
    </div>
  )
}