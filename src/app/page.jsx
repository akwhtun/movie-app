"use client"

import LeftColumn from "./components/LeftColumn"
import RightColumn from "./components/RightColumn"
import ThemeContext from "../context/ThemeContext";  
import { useState } from "react"
export default function Home() {

  const [theme, setTheme] = useState("dark");

  return (

    <ThemeContext.Provider value={{ theme, setTheme }}>

      <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>

        <LeftColumn />
        <RightColumn />

      </div>

    </ThemeContext.Provider>
  )
}

