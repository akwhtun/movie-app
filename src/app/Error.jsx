import Link from "next/link"
import ThemeContext from "./context/ThemeContext"
import { useContext } from "react"
export default function Error() {
    const { theme, setTheme } = useContext(ThemeContext)
    return (
        <div className={`${theme == 'dark' ? 'bg-gray-800' : 'bg-gray-200'} h-screen flex flex-col items-center justify-center text-xl`}>
            <p className="text-red-500 mb-1">
                Something is wrong...
            </p>
            <Link href={"/"} className="underline text-blue-500">Try Again!</Link>
        </div>
    )
}
