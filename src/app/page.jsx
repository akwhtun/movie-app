"use client";
import LeftColumn from "./components/LeftColumn";
import RightColumn from "./components/RightColumn";
import ThemeContext from "@/app/context/ThemeContext";
import { useContext, useEffect } from "react";
import Footer from "./components/Footer";
import Link from "next/link";
export default function Home() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
        <LeftColumn />
        <RightColumn />
      </div>
      <Footer />
    </>

  );
}
