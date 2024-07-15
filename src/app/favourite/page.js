"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import Link from "next/link";
import LeftColumn from "../components/LeftColumn";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaRegEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
export default function Movie() {
    const { data: session } = useSession();
    const [movies, setMovies] = useState([]);
    const { theme, setTheme } = useContext(ThemeContext)
    const [loading, setLoading] = useState(false);
    const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8];
    useEffect(() => {
        const fetchFavouriteMovie = async () => {
            if (!session) {
                alert("You need to login");
                return;
            }
            const userId = session.user.id;
            setLoading(true);
            const response = await fetch(`/api/favourite?userId=${userId}`);
            const data = await response.json();
            setMovies(data)
            setLoading(false);
        };
        fetchFavouriteMovie();
    }, [session]);
    const handleRemove = async (userId, movieId) => {
        try {
            const response = await fetch('/api/favourite', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, movieId }),
            });

            if (response.ok) {
                const result = await response.json();
                setMovies((preMovies) => preMovies.filter((movie) => movie.movieId !== movieId))
                alert("Removed from favourite")
            } else {
                const errorData = await response.json();
                console.error('Failed to remove:', errorData.message);
            }
        } catch (error) {
            console.error('Error occurred while removing:', error);
        }
    }

    console.log(movies);

    return (
        <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
            <LeftColumn />
            <div className={`lg:w-4/5 w-full px-5 py-2 ${theme == 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
                <Navbar />
                {
                    loading ? (
                        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-14'>
                            {loadingArray.map(arr => (
                                <div key={arr}>
                                    <div className={`lg:p-4 md:p-2 p:1 shadow-lg rounded-lg border ${theme === 'dark' ? 'border-gray-200' : 'border-gray-800'}`}>
                                        <SkeletonTheme baseColor={theme === 'dark' ? '#202020' : '#ebebeb'} highlightColor={theme === 'dark' ? '#444' : '#f5f5f5'}>
                                            <Skeleton height={400} />
                                            <Skeleton height={40} count={3} />
                                        </SkeletonTheme>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='lg:mt-14 mt-20'>
                            <p className="text-2xl text-blue-700 pt-1">Your FavouriteMovie List..</p>
                            {
                                movies.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:mt-4">
                                        {movies.map(mov => (
                                            <div key={mov._id} className={`lg:p-4 md:p-2 p-1 shadow-lg rounded-lg border ${theme === 'dark' ? 'border-gray-200' : 'border-gray-800'} mt-4  relative`}>

                                                <img
                                                    src={`https://image.tmdb.org/t/p/w500${mov.moviePoster}`}
                                                    alt={mov.movieName}
                                                    className="w-full h-64 object-cover rounded-t-lg"
                                                />

                                                <div className={`p-4 relative lg:h-48 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>

                                                    <h3 className="text-xl font-semibold mb-2 lg:h-14 lg:overflow-hidden">{mov.movieName}</h3>

                                                    <div className="flex items-center justify-between">
                                                        <Link href={`/movie/${mov.movieId}`} className="text-blue-500 hover:underline">
                                                            <span className="md:block hidden">View Details </span>
                                                            <FaRegEye className="text-2xl md:hidden block" />
                                                        </Link>
                                                        <button className="text-blue-500 hover:underline" onClick={() => handleRemove(mov.userId, mov.movieId)} >
                                                            <span className="md:block hidden">Remove Favourite</span>
                                                            <FaHeart className="text-2xl md:hidden block text-red-600" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='flex flex-col items-center justify-center h-52 font-semibold text-xl'>
                                        <p className='text-red-800'>No Movies Added :( ...</p>
                                        <Link href="/" className='underline text-blue-800 mt-5'>Go Back</Link>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>

    )
}
