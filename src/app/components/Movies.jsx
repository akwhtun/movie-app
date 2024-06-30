import { useEffect, useState } from 'react';
import MoviesList from "./MoviesList";
import Link from 'next/link';
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { useSearchParams } from 'next/navigation';
import { useContext } from "react";
import ThemeContext from "@/context/ThemeContext";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
export default function Movies() {
    const searchParam = useSearchParams();
    const searchPage = parseInt(searchParam.get("page")) || 1;
    const searchKey = searchParam.get("search");
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(searchPage);
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const { theme, setTheme } = useContext(ThemeContext);

    const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8]
    useEffect(() => {
        setPage(searchPage);
    }, [searchPage]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`);
                const data = await response.json();
                const moviesData = data.results;
                let moviesTotalPage = data.total_pages;

                const MAX_PAGE_LIMIT = 500;
                if (moviesTotalPage > MAX_PAGE_LIMIT) {
                    moviesTotalPage = MAX_PAGE_LIMIT;
                }

                setMovies(moviesData);
                setTotalPage(moviesTotalPage);

            } catch {
                setLoading(false);
            } finally {
                setLoading(false)
            }
        };

        const searchMovies = async () => {
            try {
                setLoading(true);
                const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchKey}&page=${page}
`);
                const data = await response.json();
                const moviesData = data.results;
                let moviesTotalPage = data.total_pages;

                const MAX_PAGE_LIMIT = 500;
                if (moviesTotalPage > MAX_PAGE_LIMIT) {
                    moviesTotalPage = MAX_PAGE_LIMIT;
                }

                setMovies(moviesData);
                setTotalPage(moviesTotalPage);

            } catch {

                setLoading(false);
            } finally {
                setLoading(false)
            }
        };

        if (searchKey !== '' && searchKey !== null) {
            searchMovies();
        } else {
            fetchMovies();
        }
    }, [page, searchKey]);

    if (loading) {
        return (


            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4'>
                {
                    loadingArray.map(arr => (
                        <div key={arr}>
                            <div className={`p-4 shadow-lg rounded-lg border ${theme === 'dark' ? 'border-gray-200' : 'border-gray-800'}`}>
                                <SkeletonTheme baseColor={theme === 'dark' ? '#202020' : '#ebebeb'} highlightColor={theme === 'dark' ? '#444' : '#f5f5f5'}>
                                    <Skeleton height={400} />
                                    <Skeleton height={40} count={3} />
                                </SkeletonTheme>
                            </div>
                        </div>
                    ))
                }
            </div>


        )
    }

    console.log(movies);

    return (

        <>
            {movies.length > 0 ?
                (<div>
                    {searchKey !== null && searchKey !== '' ? (
                        <p className='text-xl'>Search For : <span className="text-red-800 font-semibold text-2xl">{searchKey}</span></p>
                    ) : ('')}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        {movies.map(movie => (
                            <MoviesList key={movie.id} {...movie} loading={loading} />
                        ))}

                    </div>
                    {
                        searchKey !== null && searchKey !== '' ?
                            (<div className="flex justify-center items-center mt-4">
                                <Link
                                    href={`/?search=${searchKey}&page=${page > 1 ? page - 1 : 1}`}
                                    className={`px-4 py-2 m-2 ${page === 1 ? 'bg-gray-300 text-gray-600' : 'bg-blue-500 text-white'} rounded flex`}
                                >
                                    <RiArrowLeftDoubleFill className='text-2xl' />
                                    <p className='md:block hidden'>Previous</p>
                                </Link>
                                <Link
                                    href={`/?search=${searchKey}&page=1`}
                                    className={`px-4 py-2 m-2 ${searchPage === 1 ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'} rounded`}
                                >
                                    1
                                </Link>
                                <p className='text-3xl px-4 py-2'>.....</p>
                                {
                                    totalPage > 1 ? (
                                        <Link
                                            href={`/?search=${searchKey}&page=${totalPage}`}
                                            className={`px-4 py-2 m-2 ${searchPage === totalPage ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'} rounded`}
                                        >
                                            {totalPage}
                                        </Link>
                                    ) : (<></>)
                                }
                                <Link
                                    href={`/?search=${searchKey}&page=${totalPage > page ? page + 1 : page}`}
                                    className={`px-4 py-2 m-2 ${page === totalPage ? 'bg-gray-300 text-gray-600' : 'bg-blue-500 text-white'} rounded flex`}
                                >
                                    <p className='md:block hidden'>Next</p>
                                    <RiArrowRightDoubleLine className='text-2xl' />
                                </Link>
                            </div>
                            ) :
                            (<div className="flex justify-center items-center mt-4">
                                <Link
                                    href={`/?page=${page > 1 ? page - 1 : 1}`}
                                    className={`px-4 py-2 m-2 ${page === 1 ? 'bg-gray-300 text-gray-600' : 'bg-blue-500 text-white'} rounded flex`}
                                >
                                    <RiArrowLeftDoubleFill className='text-2xl' />
                                    <p className='md:block hidden'>Previous</p>
                                </Link>
                                <Link
                                    href={`/?page=1`}
                                    className={`px-4 py-2 m-2 ${searchPage === 1 ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'} rounded`}
                                >
                                    1
                                </Link>
                                <p className='text-3xl px-4 py-2'>.....</p>
                                {
                                    totalPage > 1 ? (
                                        <Link
                                            href={`/?page=${totalPage}`}
                                            className={`px-4 py-2 m-2 ${searchPage === totalPage ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'} rounded`}
                                        >
                                            {totalPage}
                                        </Link>
                                    ) : (<></>)
                                }
                                <Link
                                    href={`/?page=${totalPage > page ? page + 1 : page}`}
                                    className={`px-4 py-2 m-2 ${page === totalPage ? 'bg-gray-300 text-gray-600' : 'bg-blue-500 text-white'} rounded flex`}
                                >
                                    <p className='md:block hidden'>Next</p>
                                    <RiArrowRightDoubleLine className='text-2xl' />
                                </Link>
                            </div>)
                    }
                </div>)
                :
                (
                    <div className='flex flex-col items-center justify-center h-52 font-semibold text-xl'><p className='text-red-800 '>No Movies Data Found :( ...</p >
                        <Link href="/" className='underline text-blue-800 mt-5'>Go Back</Link></div>
                )
            }
        </>
    );
}
