import { useState } from "react"
import { HiOutlineMenu, HiOutlineSearch } from 'react-icons/hi'
import { useSelector } from "react-redux"
import { signOut} from 'next-auth/react'

export default function Navbar({ children }){
  const [openNavbar, setOpenNavbar] = useState(true)
  const labels = useSelector(state => state.app.labels)

  let labelsContent = <></>
  if (labels && labels.length) {
    const array = labels.map((l) => (
      <div key={l.displayName} className="" style={{color: l.color}}>{l.displayName}</div>
    ))
    labelsContent = <>
      <div className="uppercase">Labels</div>
      {array}
    </>
  }

  const scaleClass = !openNavbar && "scale-0"

  const onC = (e) => {
    signOut()
  }

  return (
    <>
      <div className="flex items-center space-x-10 bg-gray-100">
        <div className={`flex items-center space-x-3`}>
          <div 
              className="flex items-center justify-center ml-2 p-1 w-10 h-10 rounded-full cursor-pointer hover:bg-gray-200 duration-300" 
              onClick={() => setOpenNavbar(!openNavbar)}>
            <HiOutlineMenu className="text-gray-900 w-full leading-none" />
          </div>
          <h1 className={`text-gray-900 text-sm origin-left font-medium duration-300 py-2`}> Clash Royale Manager</h1>
        </div>
        <div className="flex items-center rounded-md bg-slate-500 m-2 py-2 px-3 space-x-4">
          <HiOutlineSearch
            className="text-white cursor-pointer text-center"
            onClick={() => setOpenNavbar(true)} />
          <input
            type="search"
            className={`bg-transparent text-white w-full origin-left focus:outline-none duration-300`}
            placeholder="Search" />
        </div>
      </div>
      <div className="flex h-screen">
        <div className={`bg-gray-100 p-3 relative duration-300 ${openNavbar ? "w-60" : "w-24"}`}>
          <div>
            <button onClick={onC}>X</button>
          </div>
          { labelsContent }
        </div>
        { children }
      </div>
    </>
  )
}