import { useRef, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Transition  } from '@headlessui/react'
import { BiRename, HiFingerPrint } from 'react-icons/bi'
import { MdQrCode } from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify'
import { useTranslation } from "react-i18next"
import 'react-toastify/dist/ReactToastify.css';
import Card from 'components/Card'
import CurrentDeck from 'components/CurrentDeck'
import Button from 'components/common/Button'
import styles from 'styles/Form.module.css'
import appConfig from 'config/app.json'
import { setCardsCurrentDeck } from 'redux/slices/app-slice'
import { parseCardsCode } from 'services/card-service'

export default function DeckDialog({ isOpen, setIsOpen, isEdit = false, deck }) {
  const { cards: cardList} = appConfig
  const { t } = useTranslation()

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

  const dispatch = useDispatch()

  const processCardCode = cardsCode => {
    const result = parseCardsCode(cardsCode)
    if (result.errors.length) {
      let i = 0
      const errorMessage = <div>
        <ul>
          <span>{t("errors.check")}</span>
          {
            result.errors.map(error => <li key={i++} className="list-disc ml-4">{ t(error) }</li>)
          }
        </ul>
      </div>
      toast.error(errorMessage)
      return
    }

    dispatch(setCardsCurrentDeck(result.cards))
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
              <Dialog.Panel className="w-full max-w-md lg:max-w-lg xl:max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {t(`deckDialog.${isEdit ? "newDeck" : "editDeck"}`)}
                </Dialog.Title>

                <ToastContainer />

                <div className={`mt-4 ${styles.input_group}`}>
                  <input
                    type="text"
                    name="deckName"
                    placeholder={t("deckDialog.deckName")}
                    className={styles.input_text}
                    value={deck?.displayName}
                  />
                  <span className="flex items-center px-4">
                    <BiRename size={20} />
                  </span>
                </div>

                <div className="flex flex-col xl:flex-row xl:space-x-5 space-y-5 mt-4">
                  <CurrentDeck />
                  <div className={`${styles.input_group} grow`}>
                    <input
                      type="text"
                      name="cardsCodes"
                      placeholder={t("deckDialog.cardsCode")}
                      className={styles.input_text}
                      value={deck?.displayName}
                      onKeyUp={onKeyUpCardsCode}
                    />
                    <span className="flex items-center px-4">
                      <MdQrCode size={20} />
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-0.5 mt-4">
                  {
                    cardList.map(card => <Card key={card.code} code={card.code} />)
                  }
                </div>
                <div className="mt-4 space-x-2 text-right">
                  <Button text={t(`deckDialog.${isEdit ? "save" : "add"}`)} onButtonClick={() => setIsOpen(false)} />
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