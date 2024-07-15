import React from 'react'
import { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'
export default function Footer() {
    const { theme } = useContext(ThemeContext)
    return (
        <footer className={`${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-gray-300 text-black'} w-full py-4 flex justify-center items-center`}>
            <p>© {new Date().getFullYear()} All rights reserved.</p>
        </footer>
    )
}
