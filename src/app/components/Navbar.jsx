"use client"
import React from 'react'
import Search from './Search'
import ModeSwitch from './ModeSwitch'
import { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'
import Link from 'next/link'
export default function Navbar() {
    const { theme, setTheme } = useContext(ThemeContext)
    return (
        <div className={`w-full lg:flex lg:flex-row flex flex-col lg:items-center items-start lg:justify-end fixed lg:top-3 top-0 left-0 shadow lg:p-1 p-0 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <Link href={"/"} className="text-xl   lg:text-start text-start lg:p-0 ps-3">
                <img src="/logo.png" width={50} height={50} alt="logo" />
            </Link>
            <div className='flex lg:mt-0 mt-3 lg:items-center  lg:justify-around justify-between  px-3 lg:w-3/4 w-full '>
                <Search />
                <ModeSwitch />
            </div>
        </div>
    )
}
