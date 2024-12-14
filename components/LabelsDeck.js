import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "next-i18next"
import { Popover } from "@headlessui/react"
import { Float } from "@headlessui-float/react"
import { BiLabel } from "react-icons/bi"
import Checkbox from "components/common/Checkbox"
import Button from 'components/common/Button'

export default function LabelsDeck({ labelsDeck = [], onChangeLabel = () => {} }) {
  const { t } = useTranslation()
  const allLabels = useSelector(state => state.app.labels)
  const processedLabels = allLabels.map((label) => {
    const isEnabled = labelsDeck.includes(label.displayName)
    return {
      label: label.displayName,
      isEnabled
    }
  })

  const onClickAddLabel = () => {

  }

  return (
    <Popover className="relative">
      {({ close }) => (
        <Float
            placement="bottom-start"
            enter="transition duration-200 ease-out"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition duration-150 ease-in"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
        >
          <Popover.Button className="flex items-center rounded-md outline-none hover:bg-gray-100">
            <BiLabel
              className="w-6 h-6 p-1 rounded-md hover:bg-gray-100" />
          </Popover.Button>
          <Popover.Panel className="absolute z-10">
            <div className="flex flex-col space-y-2 p-3 bg-gray-200 border border-gray-500 rounded-md shadow-lg w-[190px] overflow-auto">
              <div className="flex items-center space-x-1">
                <input
                  type="text"
                  name="labelName"
                  placeholder={t("deck.label.new")}
                  className="w-full p-1 text-sm"
                  onChange={(e) => dispatch(setDisplayNameCurrentDeck(e.target.value))}
                />
                <button
                  className=""
                  onClick={onClickAddLabel} >
                  {t("deck.label.add")}
                </button>
              </div>
              <div className="max-h-24 space-y-2 overflow-auto">
                {
                  processedLabels.map((item) => (
                    <Checkbox
                      key={item.label}
                      className="text-sm"
                      label={item.label}
                      isEnabled={item.isEnabled} 
                      onChange={onChangeLabel}/>
                  ))
                }
              </div>
            </div>
          </Popover.Panel>
        </Float>
      )}
    </Popover>
  )
}