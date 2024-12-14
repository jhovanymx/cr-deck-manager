import { useState } from "react"
import { Popover } from "@headlessui/react"
import { Float } from "@headlessui-float/react"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"

export default function RatingDeck({ starCount = 0 }) {
  const MAX_STARS = 5
  const [rating, setRating] = useState(starCount);

  const renderStars = (closePopover) => {
    const unfilledStarCount = MAX_STARS - rating
    let masterCount = 1
    const filledStars = []
    const unfilledStars = []
    for (let i = 0; i < rating; i++, masterCount++) {
      filledStars.push((
        <AiFillStar
          key={masterCount}
          className="w-6 h-6 p-1 rounded-md hover:bg-gray-100"
          onClick={createHandler(masterCount, closePopover)}
        />
      ))
    }
    for (let i = 0; i < unfilledStarCount; i++, masterCount++) {
      unfilledStars.push((
        <AiOutlineStar
          key={masterCount}
          className="w-6 h-6 p-1 rounded-md hover:bg-gray-100"
          onClick={createHandler(masterCount, closePopover)}
        />
      ))
    }
    return [...filledStars, ...unfilledStars]
  }

  const createHandler = (count, closePopover) => {
    return () => {
      onClickStar(count, closePopover)
    }
  }

  const onClickStar = (count, closePopover) => {
    if (count != rating) {
      closePopover()
      setRating(count)
    }
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
            <AiFillStar className="w-6 h-6 p-1" />
            <span className="text-sm p-1">{rating}</span>
          </Popover.Button>
          <Popover.Panel className="absolute z-10 ">
            <div className="flex items-center bg-gray-200 rounded-md shadow-md">
              {renderStars(close)}
            </div>
          </Popover.Panel>
        </Float>
      )}
    </Popover>
  )
}