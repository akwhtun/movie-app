import Movies from './Movies'
import Navbar from './Navbar'
import ThemeContext from '../context/ThemeContext'
import { useContext } from 'react'
export default function RightColumn() {

    const { theme, setTheme } = useContext(ThemeContext)
    return (
        <div className={`w-3/4  px-5 py-2 ${theme == 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
            <Navbar />
            <div>
                <Movies />
            </div>
        </div>
    )
}
