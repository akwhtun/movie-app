'use client';

import { FaRegMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { useContext } from "react";
import ThemeContext from "@/app/context/ThemeContext";

export default function ModeSwitch() {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <div>
            {theme === 'dark' ? (
                <FiSun
                    className="text-2xl cursor-pointer transition delay-150"
                    onClick={() => setTheme('light')}
                />
            ) : (
                <FaRegMoon
                    className="text-2xl cursor-pointer transition delay-150"
                    onClick={() => setTheme('dark')}
                />
            )}
        </div>
    );
}
