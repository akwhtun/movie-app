"use client"
import React from 'react'
import Search from './Search'
import ModeSwitch from './ModeSwitch'
import { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'
export default function Navbar() {
    const { theme, setTheme } = useContext(ThemeContext)
    return (
        <div className={`w-full lg:flex lg:flex-row flex flex-col items-center justify-center fixed lg:top-3 top-0 left-0 shadow p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <h2 className="text-xl lg:w-2/4 w-full  lg:text-center text-start lg:p-0 ps-3">Featured Movies</h2>
            <div className='flex lg:mt-0 mt-3 lg:items-center lg:justify-around justify-between  px-3 lg:w-2/4 w-full '>
                <Search />
                <ModeSwitch />
            </div>
        </div>
    )
}
