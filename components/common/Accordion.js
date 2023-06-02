import { useState } from "react"
import { BiChevronUp } from 'react-icons/bi'

export default function Accordion ({ initial = true, title, children }) {
  const [open, setOpen] = useState(initial)
  return (
    <div>
        <div className="flex">
          <BiChevronUp className={`duration-300 ${open && 'rotate-180'}`} />
          <span className="text-sm text-gray-50">{ title }</span>
        </div>
      <div className={`${!open && 'hidden'}`}>
        { children }
      </div>
    </div>
  )
}