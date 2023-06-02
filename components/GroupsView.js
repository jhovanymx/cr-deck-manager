import { useSelector, useDispatch } from "react-redux"
import Accordion from 'components/common/Accordion'
import Deck from 'components/Deck'

export default function GroupsView () {
  const groups = useSelector(state => state.app.groups)

  return (
    <div>
      { groups.map(group => (
      <div className="bg-gray-200 rounded-md">
        <Accordion title={group.displayName}>
          <div className="flex">
          { group.decks.map(deck => (
            <Deck {...deck} />
          ))}
          </div>
        </Accordion>
      </div>
      ))}
    </div>
  )
}