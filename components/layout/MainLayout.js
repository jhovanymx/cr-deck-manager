import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "next-i18next"
import { signOut } from 'next-auth/react'
import { showLoader } from 'redux/slices/app-slice'
import { HiOutlineMenu, HiOutlineSearch, HiUser } from 'react-icons/hi'
import { MdLabelImportant } from "react-icons/md"
import Image from "next/image"

export default function MainLayout({ children }) {
  const { t } = useTranslation()
  const [openNavbar, setOpenNavbar] = useState(true)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const dispatch = useDispatch()
  const labels = useSelector(state => state.app.labels)

  const stateClass = !openNavbar ? "opacity-0" : "opacity-100"
  
  const onClickLogout = (e) => {
    e.preventDefault()
    dispatch(showLoader())
    signOut()
  }

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
          <h1 className={`text-gray-900 text-sm origin-left font-medium duration-300 py-2`}>CR Manager</h1>
        </div>
        <div className="flex flex-grow items-center rounded-2xl bg-sky-50 m-2 py-2 px-3 space-x-2">
          <HiOutlineSearch
            className="text-gray-500 cursor-pointer text-center w-6" />
          <input
            type="search"
            className={`bg-transparent text-gray-500 w-full origin-left focus:outline-none duration-300`}
            placeholder={t("header.search")} />
        </div>
        <div className="relative">
          <div 
            className="flex items-center justify-center mx-2 w-10 h-10 rounded-full cursor-pointer hover:bg-gray-200 duration-300" 
            onClick={() => setOpenUserMenu(!openUserMenu)}>
            <HiUser
                className="relative block w-full h-6" />
          </div>
          { openUserMenu && 
            <div
              className="fixed inset-0 z-10 w-full h-full"
              onClick={() => setOpenUserMenu(false)} />
          }
          { openUserMenu && 
            <div className="absolute right-0 z-10 w-48 mt-2 overflow-hidden bg-white rounded-md shadow-xl">
              <a 
                href="" 
                className="block px-4 py-2 text-sm text-gray-700"
                onClick={onClickLogout} >
                {t("header.logout")}
              </a>
            </div>
          }
        </div>
      </header>
      <div className="flex">
        <nav className="flex h-screen">
          <div className={`bg-gray-100 p-3 duration-300 ${openNavbar ? "w-40" : "w-10"}`}>
            <div className={`uppercase text-gray-500 text-sm mb-2 ${stateClass}`}>{t("navbar.labels")}</div>
            {
              labels.map((label) => (
                <div 
                  key={label.displayName} 
                  className="flex items-center space-x-2 mb-2">
                    <MdLabelImportant className="w-4 h-4 text-blue-400 flex-none" style={label.color && {color: label.color}}></MdLabelImportant>
                    <span className={`duration-300 flex-1 ${stateClass}`}>{label.displayName}</span>
                </div>
              ))
            }
          </div>
        </nav>
        <main>
          { children }
        </main>
      </div>
    </>
  )
}