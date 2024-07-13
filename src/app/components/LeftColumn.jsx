import MenuItem from "./MenuItem"
import { useEffect, useState, useContext } from "react"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ThemeContext from "../context/ThemeContext";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Error from "../Error";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
export default function LeftColumn() {

    const { data: session } = useSession();
    const { theme, setTheme } = useContext(ThemeContext)
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false);

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

    if (error) {
        return (
            <Error />
        )
    }
    return (
        <div className="w-1/4  px-5 py-2">
            {
                !session ? (
                    <>
                        Not signedIn <br />
                        <button className='text-center py-3' onClick={() => signIn("google")}>
                            Sing In With Google
                        </button>
                    </>
                ) : (

                    <>
                        {session.user.email}
                        {session.user.name}
                        <img src={session.user.image} alt={session.user.name} />
                        <button className='text-center py-3' onClick={() => signOut()}>
                            sign out
                        </button>
                    </>
                )
            }
            <nav className="mt-4  p-3">
                <ul className="text-large">
                    <li className={`mb-2 border-0 border-b-2 p-2 border-black ${activeFilter == 'top_rated' ? 'bg-blue-500' : ''}`}><MenuItem title="Top Rated Movies" address="/?filter=top_rated" /></li>
                    <li className={`mb-2 border-0 border-b-2 p-2 border-black ${activeFilter == 'upcoming' ? 'bg-blue-500' : ''}`}><MenuItem title="Upcoming Movies" address="/?filter=upcoming" /></li>
                </ul>
            </nav>
            <div className="relative">
                <div>
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
    )
}
