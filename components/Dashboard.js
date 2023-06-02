import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FaObjectGroup } from 'react-icons/fa'
import { GrAddCircle } from 'react-icons/gr'
import { useTranslation } from 'next-i18next'
import { useDecksByUsername } from 'lib/queries'
import { convertDecks } from 'lib/converters'
import { extractFromQuery as extract } from 'services/data-service'
import { setDecks } from 'redux/slices/app-slice'
import Button from 'components/common/Button'
import DeckDialog from 'components/DeckDialog'
import GroupsView from 'components/GroupsView'
import DecksView from 'components/DecksView'

export default function Dashboard () {
  const user = useSelector(state => state.user.user)
  const isGroupView = useSelector(state => state.app.isGroupView)

  const [isOpenDeckDialog, setIsOpenDeckDialog] = useState(false)
  
  const dispatch = useDispatch()
  extract(useDecksByUsername(user.email), data => dispatch(setDecks(convertDecks(data))))

  const { t } = useTranslation()

  const onGroupByClick = () => {

  }

  const onNewDeckClick = () => {
    setIsOpenDeckDialog(true)
  }

  return (
    <section className="p-2 rounded-md">
      <div className="flex items-center justify-start space-x-2 rounded-md bg-white">
        <Button icon={<FaObjectGroup />} text={t("dashboard.groupBy")} onButtonClick={onGroupByClick} />
        <Button icon={<GrAddCircle />} text={t("dashboard.newDeck")} onButtonClick={onNewDeckClick} />
      </div>
      <DeckDialog isOpen={isOpenDeckDialog} setIsOpen={setIsOpenDeckDialog} />
      {isGroupView ? <GroupsView /> : <DecksView />}
    </section>
  )
}