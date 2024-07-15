import MenuItem from "./MenuItem"
import { IoMenu } from "react-icons/io5";
import { useEffect, useState, useContext } from "react"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ThemeContext from "../context/ThemeContext";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Error from "../Error";

import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { useSession } from "next-auth/react";
export default function LeftColumn() {

    const { data: session } = useSession();
    const { theme, setTheme } = useContext(ThemeContext)
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState();
    const [menu, setMenu] = useState(false);

    const searchParam = useSearchParams();
    const activeId = searchParam.get("genreId") || '';
    const activeFilter = searchParam.get("filter") || '';

    useEffect(() => {

        const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
        const fetchGenre = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
                const result = await response.json();
                setGenres(result.genres)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(true)
            }
        }

        fetchGenre()
    }, [])

    const toggleDropDown = () => {
        setIsOpen(pre => !pre)
    }

    const profileDropdown = () => {
        setDropdownOpen(pre => !pre)
    }
    const handleChange = () => {
        setMenu(pre => !pre)
    }

    if (error) {
        return (
            <Error />
        )
    }


    return (
        <>
            <div className='lg:hidden w-10 h-9 flex items-center justify-center fixed top-0 right-1 cursor-pointer z-50' onClick={handleChange}>
                <IoMenu className='text-3xl' />
            </div>
            <div className={`lg:w-1/5 w-72 h-full lg:px-5 lg:py-2 lg:block  lg:relative fixed top-0 left-0 z-10 ${theme == 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} ${menu ? 'block' : 'hidden'}`}>
                {
                    !session ? (

                        <SignIn />

                    ) : (



                        <div className="flex justify-start ps-4 mt-1 ms-2 ">
                            <div className="flex justify-between">
                                <div className="flex items-center">
                                    <div className="">
                                        <button
                                            onClick={profileDropdown}
                                            className="flex items-center space-x-2 focus:outline-none"
                                        >
                                            <img
                                                src={session.user.image}
                                                alt="User Profile"
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <p>
                                                {session.user.name}
                                            </p>

                                        </button>
                                        {dropdownOpen && (
                                            <div className={`  right-0 mt-2 w-48  border-2 ${theme === 'dark' ? 'bg-black text-white border-white' : 'bg-gray-200 text-black border-black'} rounded-md shadow-lg py-1`}>
                                                <p

                                                    className={`block px-4 py-2 text-sm  border-0 border-b-2 ${theme == 'dark' ? 'border-white' : 'border-black'}`}
                                                >
                                                    {session.user.email}
                                                </p>
                                                <Link
                                                    href={"/favourite"}
                                                    className={`block px-4 py-2 text-sm  border-0 border-b-2 ${theme == 'dark' ? 'border-white' : 'border-black'}`}
                                                >
                                                    Favourite Movies
                                                </Link>
                                                <SignOut />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                }
                <nav className="mt-2  p-3">
                    {
                        session && session.user.isAdmin ? (
                            <Link href={"/admin"} class="relative ms-2 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                <span class="relative px-5 py-1 transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0">
                                    View User
                                </span>
                            </Link>
                        ) : (
                            ''
                        )
                    }
                    <ul className="text-large">

                        <li className={`mb-2 border-0 border-b-2 p-2 border-black ${activeFilter == 'top_rated' ? 'bg-blue-500' : ''}`}><MenuItem title="Top Rated Movies" address="/?filter=top_rated" /></li>
                        <li className={`mb-2 border-0 border-b-2 p-2 border-black ${activeFilter == 'upcoming' ? 'bg-blue-500' : ''}`}><MenuItem title="Upcoming Movies" address="/?filter=upcoming" /></li>

                    </ul>
                </nav>
                <div className="relative">
                    <div className="px-2">
                        <button type="button" className="flex w-full items-center justify-between rounded-md text-large px-3 py-2 font-semiboldshadow-sm " id="menu-button" aria-expanded="true" aria-haspopup="true">
                            Genres
                            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" onClick={toggleDropDown}>
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>


                    {isOpen ? (
                        loading ? (
                            <SkeletonTheme
                                baseColor={theme === 'dark' ? '#202020' : '#ebebeb'}
                                highlightColor={theme === 'dark' ? '#444' : '#f5f5f5'}
                            >
                                <p>
                                    <Skeleton count={5} height={40} />
                                </p>
                            </SkeletonTheme>
                        ) : (
                            <div
                                className="absolute right-0 z-10 mt-2 w-full origin-top-right divide-y divide-black rounded-md shadow-lg outline-none"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                                tabIndex="-1"
                            >
                                {genres.map((genre) => (
                                    <div className={`py-1 ${activeId == genre.id ? 'bg-blue-500' : ''}`} role="none" key={genre.id}>
                                        <Link
                                            href={`/?genre=${genre.name}&genreId=${genre.id}`}
                                            className="block px-4 py-2 text-large"
                                            role="menuitem"
                                            tabIndex="-1"
                                            id="menu-item-0"
                                        >
                                            {genre.name}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )
                    ) : null}


                </div>

            </div >

        </>
    )
}
