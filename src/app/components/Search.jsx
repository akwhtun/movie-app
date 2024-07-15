import { useSearchParams } from "next/navigation";
import { useState, useContext } from "react";
import { IoSearchSharp } from "react-icons/io5";
import ThemeContext from "../context/ThemeContext";

export default function Search() {
    const [searchKeyword, setSearchKeyword] = useState("");
    const searchParam = useSearchParams();
    const searchKey = searchParam.get("search");
    const { theme } = useContext(ThemeContext);

    const handleSearch = (e) => {
        e.preventDefault();
        window.location.href = `/?search=${searchKeyword}`;
    }

    return (
        <div className={`border ${theme === 'dark' ? 'bg-gray-800 border-gray-200' : 'bg-gray-200 border-gray-800'} flex items-center rounded-lg overflow-hidden`}>
            <p>
                <IoSearchSharp className={`text-3xl ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
            </p>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    className={`${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'} text-md lg:w-72 w-64 outline-none p-0.5`}
                    placeholder='Enter search keyword...'
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
            </form>
        </div>
    )
}
