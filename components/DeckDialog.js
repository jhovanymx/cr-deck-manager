import { useRef, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Transition  } from '@headlessui/react'
import { BiRename, HiFingerPrint } from 'react-icons/bi'
import { MdQrCode } from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify'
import { useTranslation } from "react-i18next"
import 'react-toastify/dist/ReactToastify.css'
import Card from 'components/Card'
import CurrentDeck from 'components/CurrentDeck'
import Button from 'components/common/Button'
import styles from 'styles/Form.module.css'
import appConfig from 'config/app.json'
import { setDisplayNameCurrentDeck, setCardsCurrentDeck, setSelectedCardCurrentDeck, clearCurrentDeck, showLoader, hideLoader } from 'redux/slices/app-slice'
import { parseCardsCode, validateInsertionToDeck } from 'services/card-service'
import { useAddDeckMutation } from 'api/deck-api'
import { showErrorMesssages, showErrorMesssage } from 'services/message-service'

export default function DeckDialog({ isOpen, setIsOpen, isEdit = false, deck }) {
  const { cards: cardList} = appConfig
  const { t } = useTranslation()
  const [addDeck] = useAddDeckMutation()
  const user = useSelector(state => state.user.user)
  const currentDeck = useSelector(state => state.app.currentDeck)
  const config = useSelector(state => state.app.config)
  const dispatch = useDispatch()

  const timerCardsCode = useRef(false)

  const onKeyUpCardsCode = e => {
    if (timerCardsCode.current !== false) {
      clearTimeout(timerCardsCode.current)
    }
    timerCardsCode.current = setTimeout(function(){
      timerCardsCode.current = false;
      processCardCode(e.target.value)
    }, 300);
  }

  const onChangeCardsCode = e => {
    processCardCode(e.target.value.trim())
  }

  const processCardCode = cardsCode => {
    const result = parseCardsCode(cardsCode, config)
    if (result.errors.length > 0) {
      showErrorMesssages(toast, t, result.errors)
      return
    }

    dispatch(setCardsCurrentDeck(result.cards))
  }

  const onClickSaveAddButton = () => {
    const deck = {
      username: user.email,
      userId: user._id,
      displayName: currentDeck.displayName,
      cards: currentDeck.cards.map((card) => ({
        code: card.code, 
        position: card.index
      }))
    }
    dispatch(showLoader())
    addDeck(deck).unwrap()
      .then(() => onAddDeckCompleted())
      .catch(() => onAddDeckError())
  }

  const onAddDeckCompleted = () => {
    dispatch(hideLoader())
    setIsOpen(false)
    dispatch(clearCurrentDeck())
  }

  const onAddDeckError = () => {
    dispatch(hideLoader())
  }

  const onClickCard = (card) => {
    const error = validateInsertionToDeck(currentDeck.cards, card.code)
    if (error) {
      showErrorMesssage(toast, t, error)
    } else {
      dispatch(setSelectedCardCurrentDeck(card.code))
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={() => {}}>
        {/* Overlay */}
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="max-w-md lg:max-w-2xl xl:max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {t(`deckDialog.${isEdit ? "editDeck" : "newDeck"}`)}
                </Dialog.Title>

                <ToastContainer />

                <div className={`mt-4 ${styles.input_group}`}>
                  <input
                    type="text"
                    name="deckName"
                    placeholder={t("deckDialog.deckName")}
                    className={styles.input_text}
                    value={deck?.displayName}
                    onChange={(e) => dispatch(setDisplayNameCurrentDeck(e.target.value))}
                  />
                  <span className="flex items-center px-4">
                    <BiRename size={20} />
                  </span>
                </div>

                <div className="flex flex-col lg:flex-row lg:space-x-5 lg:items-center space-y-5 mt-4">
                  <CurrentDeck />
                  <div className={`${styles.input_group} grow`}>
                    <input
                      type="text"
                      name="cardsCodes"
                      placeholder={t("deckDialog.cardsCode")}
                      className={styles.input_text}
                      value={deck?.displayName}
                      onChange={onChangeCardsCode}
                    />
                    <span className="flex items-center px-4">
                      <MdQrCode size={20} />
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap mt-4 gap-2 h-[270px] overflow-auto">
                  {
                    cardList.map(card => (
                      <Card
                        key={card.code}
                        code={card.code} 
                        onClickCard={onClickCard} />
                    ))
                  }
                </div>
                <div className="mt-4 space-x-2 text-right">
                  <Button text={t(`deckDialog.${isEdit ? "save" : "add"}`)} onButtonClick={() => onClickSaveAddButton()} />
                  <Button text={t("deckDialog.close")} onButtonClick={() => setIsOpen(false)} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}