import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "next-i18next"
import { useDeleteDeckMutation } from "api/deck-api"
import { setDisplayNameCurrentDeck, setCardsCurrentDeck, deleteDeck, showLoader, hideLoader } from 'redux/slices/app-slice'
import { showErrorMesssage } from 'services/message-service'
import { toast } from 'react-toastify'
import useConfirm from "components/ConfirmDialog"
import Deck from 'components/Deck'

export default function DecksView ({ setIsOpenDeckDialog }) {
  const { t } = useTranslation()
  const decks = useSelector(state => state.app.decks)
  const dispatch = useDispatch()
  const [deleteDeckMutation] = useDeleteDeckMutation()
  const confirm = useConfirm()

  const onDeleteDeck = async (id) => {
    const yesChoice = await confirm({
      title: t("common.comfirmAction"),
      message: t("deck.confirmDelete")
    })
    if (yesChoice) {
      doDeleteDeck(id)
    }
  }

  const doDeleteDeck = (id) => {
    dispatch(showLoader())
    deleteDeckMutation(id).unwrap()
      .then(() => {
        dispatch(deleteDeck(id))
        dispatch(hideLoader())
      })
      .catch(() => {
        dispatch(hideLoader())
        showErrorMesssage(toast, t, "error.onDeleteDeck")
      })
  }

  const onEditDeck = (deck) => {
    dispatch(setDisplayNameCurrentDeck(deck.displayName))
    dispatch(setCardsCurrentDeck(deck.cards))
    setIsOpenDeckDialog(true)
  }
  
  return (
    <>
      <div className="flex flex-wrap mt-4 gap-4">
        {
          decks.map((deck, index) => (
            <Deck
              key={index}
              onClickDelete={onDeleteDeck}
              onClickEdit={onEditDeck}
              {...deck} />
          ))
        }
      </div>
    </>
  )
}