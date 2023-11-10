import { useState } from "react"
import { HiOutlineMenu, HiOutlineSearch } from 'react-icons/hi'
import { useSelector } from "react-redux"
import Image from "next/image"
import { signOut} from 'next-auth/react'

export default function MainLayout({ children }) {
  const [openNavbar, setOpenNavbar] = useState(true)
  const labels = useSelector(state => state.app.labels)

  const stateClass = !openNavbar ? "opacity-0" : "opacity-100"

  return (
    <>
      <header className="flex items-center space-x-10 bg-gray-100">
        <div className={`flex items-center space-x-3`}>
          <div 
              className="flex items-center justify-center ml-2 p-1 w-10 h-10 rounded-full cursor-pointer hover:bg-gray-200 duration-300" 
              onClick={() => setOpenNavbar(!openNavbar)}>
            <HiOutlineMenu className="text-gray-900 w-full leading-none" />
          </div>
          <Image src="/images/logo.svg" width={10} height={10} alt="Github Image" className="w-8 h-8" />
          <h1 className={`text-gray-900 text-sm origin-left font-medium duration-300 py-2`}> Clash Royale Manager</h1>
        </div>
        <div className="flex items-center rounded-2xl bg-sky-50 m-2 py-2 px-3 space-x-2">
          <HiOutlineSearch
            className="text-gray-500 cursor-pointer text-center w-6" />
          <input
            type="search"
            className={`bg-transparent text-gray-500 w-full origin-left focus:outline-none duration-300`}
            placeholder="Search" />
        </div>
      </header>
      <div className="flex">
        <nav className="flex h-screen">
          <div className={`bg-gray-100 p-3 duration-300 ${openNavbar ? "w-40" : "w-10"}`}>
            <div className={`uppercase text-gray-500 text-sm mb-2 ${stateClass}`}>Labels</div>
            {
              labels.map((label) => (
                <div 
                  key={label.displayName} 
                  className="flex items-center space-x-2 mb-2">
                    <span className="w-4 h-4 bg-blue-400 flex-none" style={label.color && {backgroundColor: label.color}}></span>
                    <span className={`duration-300 flex-1 ${stateClass}`}>{label.displayName}</span>
                </div>
              ))
            }import Image from "next/image"
          </div>
        </nav>
        <main>
          { children }
        </main>
      </div>
    </>
  )
}