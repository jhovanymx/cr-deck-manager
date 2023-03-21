import { useState } from "react"
import { HiOutlineMenu, HiOutlineSearch } from 'react-icons/hi'
import { useSelector } from "react-redux"

export default function Navbar(){
  const [openNavbar, setOpenNavbar] = useState(true)
  const labels = useSelector((state) => state.labels)

  let labelsContent = <></>
  if (labels && labels.length) {
    const array = labels.map((l) => (
      <div className="" style={{color: l.color}}>{l.displayName}</div>
    ))
    labelsContent = <>
      <div className="uppercase">Labels</div>
      {array}
    </>
  }

  const scaleClass = !openNavbar && "scale-0"

  return (
    <div className="flex bg-gray-200 h-screen">
      <div className={`bg-white p-3 relative duration-300 ${openNavbar ? "w-72" : "w-20"}`}>
        <div className="flex items-center space-x-3">
          <div 
              className="flex items-center justify-center p-1 w-16 h-16 rounded-full cursor-pointer hover:bg-gray-200 duration-300" 
              onClick={(e) => setOpenNavbar(!openNavbar)}>
            <HiOutlineMenu className="text-gray-900 w-full leading-none" />
          </div>
          <h1 className={`text-gray-900 text-sm origin-left font-medium duration-300 ${scaleClass}`}> Clash Royale Manager</h1>
        </div>
        <div className="flex items-center rounded-md bg-slate-500 m-2 py-2 px-3 space-x-4">
          <HiOutlineSearch
            className="text-white cursor-pointer text-center"
            onClick={(e) => setOpenNavbar(true)} />
          <input
            type="search"
            className={`bg-transparent text-white w-full origin-left focus:outline-none duration-300 ${scaleClass}`}
            placeholder="Search" />
        </div>
        { labelsContent }
      </div>
    </div>
  )
}