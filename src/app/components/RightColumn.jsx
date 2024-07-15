import Movies from './Movies'
import Navbar from './Navbar'
import ThemeContext from '../context/ThemeContext'
import { useContext } from 'react'
export default function RightColumn() {

    const { theme, setTheme } = useContext(ThemeContext)
    return (
        <div className={`lg:w-4/5 w-full px-5 py-2 ${theme == 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
            <Navbar />
            <div className='lg:mt-14 mt-20'>
                <Movies />
            </div>
        </div>
    )
}
