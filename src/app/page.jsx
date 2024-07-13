"use client";
import LeftColumn from "./components/LeftColumn";
import RightColumn from "./components/RightColumn";
import ThemeContext from "@/app/context/ThemeContext";
import { useContext, useEffect } from "react";
import Link from "next/link";
export default function Home() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
      <Link href={"/admin"}>Go Admin</Link>
      <LeftColumn />
      <RightColumn />
    </div>
  );
}
