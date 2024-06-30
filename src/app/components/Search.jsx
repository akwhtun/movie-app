import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
export default function Search() {
    const [searchKeyword, setSearchKeyword] = useState("");
    const searchParam = useSearchParams();
    const searchKey = searchParam.get("search");

    const handleSearch = (e) => {
        e.preventDefault();
        window.location.href = `/?search=${searchKeyword}`
    }

    return (
        <div className='bg-gray-200 flex items-center border rounded-lg overflow-hidden'>
            <p>
                <IoSearchSharp className='text-3xl text-black' />
            </p>
            <form onSubmit={handleSearch}>
                <input type="text" className='text-md w-72 bg-gray-200 outline-none text-black p-0.5' placeholder='Enter search keyword...'
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)} />
            </form>
        </div>
    )
}
