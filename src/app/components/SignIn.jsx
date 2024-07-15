import { signIn } from "next-auth/react";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
export default function SignIn() {
    const { theme, setTheme } = useContext(ThemeContext)
    return (
        <button
            onClick={() => signIn('google')}
            className={`mx-auto lg:mt-1 mt-3 flex items-center px-4 py-2 border  rounded-md shadow-sm text-sm font-medium ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-900 ' : 'bg-gray-200 text-black border-gray-300'}`}
        >
            <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="w-5 h-5 mr-2"
            />
            Sign in with Google
        </button>
    )
}
