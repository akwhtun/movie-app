import { useEffect, useState, useContext } from 'react';
import MoviesList from "./MoviesList";
import Link from 'next/link';
import { RiArrowRightDoubleLine, RiArrowLeftDoubleFill } from "react-icons/ri";
import { useSearchParams } from 'next/navigation';
import ThemeContext from "@/app/context/ThemeContext";
import Error from '../Error';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Movies() {
    const searchParam = useSearchParams();
    const searchPage = parseInt(searchParam.get("page")) || 1;
    const searchKey = searchParam.get("search");
    const filterKey = searchParam.get("filter");
    const genreKey = searchParam.get("genreId");
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(searchPage);
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [movieError, setMovieError] = useState(false);
    const [searchError, setSearchError] = useState(false);
    const [filterError, setFilterError] = useState(false);
    const [genreError, setGenreError] = useState(false);
    const { theme } = useContext(ThemeContext);
    const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8];

    useEffect(() => {
        setPage(searchPage);
    }, [searchPage]);



    useEffect(() => {
        const fetchMovies = async () => {
            try {
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
                setLoading(false);
            } catch {
                setLoading(false);
                setMovieError(true);
            }
        };

        const searchMovies = async () => {
            try {
                const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchKey}&page=${page}`);
                const data = await response.json();
                const moviesData = data.results;
                let moviesTotalPage = data.total_pages;

                const MAX_PAGE_LIMIT = 500;
                if (moviesTotalPage > MAX_PAGE_LIMIT) {
                    moviesTotalPage = MAX_PAGE_LIMIT;
                }

                setMovies(moviesData);
                setTotalPage(moviesTotalPage);
                setLoading(false);
            } catch {
                setLoading(false);
                setSearchError(true);
            }
        };

        const filterMovies = async () => {
            try {
                const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                const response = await fetch(`https://api.themoviedb.org/3/movie/${filterKey}?api_key=${API_KEY}&language=en-US&page=${page}`);
                const data = await response.json();
                const moviesData = data.results;
                let moviesTotalPage = data.total_pages;

                const MAX_PAGE_LIMIT = 500;
                if (moviesTotalPage > MAX_PAGE_LIMIT) {
                    moviesTotalPage = MAX_PAGE_LIMIT;
                }

                setMovies(moviesData);
                setTotalPage(moviesTotalPage);
                setLoading(false);
            } catch {
                setLoading(false);
                setFilterError(true);
            }
        };

        const filterMoviesWithGenre = async () => {
            try {
                const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreKey}&page=${page}`);
                const data = await response.json();
                const moviesData = data.results;
                let moviesTotalPage = data.total_pages;

                const MAX_PAGE_LIMIT = 500;
                if (moviesTotalPage > MAX_PAGE_LIMIT) {
                    moviesTotalPage = MAX_PAGE_LIMIT;
                }

                setMovies(moviesData);
                setTotalPage(moviesTotalPage);
                setLoading(false);
            } catch {
                setLoading(false);
                setGenreError(true);
            }
        }

        if (searchKey !== '' && searchKey !== null) {
            searchMovies();
        } else if (filterKey !== '' && filterKey !== null) {
            filterMovies();
        } else if (genreKey !== '' && genreKey !== null) {
            filterMoviesWithGenre();
        }
        else {
            fetchMovies();
        }
    }, [page, searchKey, filterKey, genreKey]);

    if (movieError || searchError || filterError || genreError) {
        return <Error />;
    }

    if (loading) {
        return (
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-10'>
                {loadingArray.map(arr => (
                    <div key={arr} className='mt-6'>
                        <div className={`lg:p-4 md:p-2 p:1 shadow-lg rounded-lg border ${theme === 'dark' ? 'border-gray-200' : 'border-gray-800'}`}>
                            <SkeletonTheme baseColor={theme === 'dark' ? '#202020' : '#ebebeb'} highlightColor={theme === 'dark' ? '#444' : '#f5f5f5'}>
                                <Skeleton height={400} />
                                <Skeleton height={40} count={3} />
                            </SkeletonTheme>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <>
            {movies.length > 0 ? (
                <div>
                    {searchKey !== null && searchKey !== '' && (
                        <p className='text-xl lg:mt-24 mt-28'>Search For: <span className="text-red-800 font-semibold text-2xl">{searchKey}</span></p>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 ">
                        {movies.map(movie => (
                            <MoviesList key={movie.id} {...movie} loading={loading} />
                        ))}
                    </div>
                    {searchKey !== null && searchKey !== '' ? (
                        <div className="flex justify-center items-center mt-4">
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
                            {totalPage > 1 && (
                                <Link
                                    href={`/?search=${searchKey}&page=${totalPage}`}
                                    className={`px-4 py-2 m-2 ${searchPage === totalPage ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'} rounded`}
                                >
                                    {totalPage}
                                </Link>
                            )}
                            <Link
                                href={`/?search=${searchKey}&page=${totalPage > page ? page + 1 : page}`}
                                className={`px-4 py-2 m-2 ${page === totalPage ? 'bg-gray-300 text-gray-600' : 'bg-blue-500 text-white'} rounded flex`}
                            >
                                <p className='md:block hidden'>Next</p>
                                <RiArrowRightDoubleLine className='text-2xl' />
                            </Link>
                        </div>
                    ) :
                        filterKey !== null && filterKey !== '' ? (
                            <div className="flex justify-center items-center mt-4">
                                <Link
                                    href={`/?filter=${filterKey}&page=${page > 1 ? page - 1 : 1}`}
                                    className={`px-4 py-2 m-2 ${page === 1 ? 'bg-gray-300 text-gray-600' : 'bg-blue-500 text-white'} rounded flex`}
                                >
                                    <RiArrowLeftDoubleFill className='text-2xl' />
                                    <p className='md:block hidden'>Previous</p>
                                </Link>
                                <Link
                                    href={`/?filter=${filterKey}&page=1`}
                                    className={`px-4 py-2 m-2 ${searchPage === 1 ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'} rounded`}
                                >
                                    1
                                </Link>
                                <p className='text-3xl px-4 py-2'>.....</p>
                                {totalPage > 1 && (
                                    <Link
                                        href={`/?filter=${filterKey}&page=${totalPage}`}
                                        className={`px-4 py-2 m-2 ${searchPage === totalPage ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'} rounded`}
                                    >
                                        {totalPage}
                                    </Link>
                                )}
                                <Link
                                    href={`/?filter=${filterKey}&page=${totalPage > page ? page + 1 : page}`}
                                    className={`px-4 py-2 m-2 ${page === totalPage ? 'bg-gray-300 text-gray-600' : 'bg-blue-500 text-white'} rounded flex`}
                                >
                                    <p className='md:block hidden'>Next</p>
                                    <RiArrowRightDoubleLine className='text-2xl' />
                                </Link>
                            </div>
                        ) :
                            genreKey !== null && genreKey !== '' ? (
                                <div className="flex justify-center items-center mt-4">
                                    <Link
                                        href={`/?genreId=${genreKey}&page=${page > 1 ? page - 1 : 1}`}
                                        className={`px-4 py-2 m-2 ${page === 1 ? 'bg-gray-300 text-gray-600' : 'bg-blue-500 text-white'} rounded flex`}
                                    >
                                        <RiArrowLeftDoubleFill className='text-2xl' />
                                        <p className='md:block hidden'>Previous</p>
                                    </Link>
                                    <Link
                                        href={`/?genreId=${genreKey}&page=1`}
                                        className={`px-4 py-2 m-2 ${searchPage === 1 ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'} rounded`}
                                    >
                                        1
                                    </Link>
                                    <p className='text-3xl px-4 py-2'>.....</p>
                                    {totalPage > 1 && (
                                        <Link
                                            href={`/?genreId=${genreKey}&page=${totalPage}`}
                                            className={`px-4 py-2 m-2 ${searchPage === totalPage ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'} rounded`}
                                        >
                                            {totalPage}
                                        </Link>
                                    )}
                                    <Link
                                        href={`/?genreId=${genreKey}&page=${totalPage > page ? page + 1 : page}`}
                                        className={`px-4 py-2 m-2 ${page === totalPage ? 'bg-gray-300 text-gray-600' : 'bg-blue-500 text-white'} rounded flex`}
                                    >
                                        <p className='md:block hidden'>Next</p>
                                        <RiArrowRightDoubleLine className='text-2xl' />
                                    </Link>
                                </div>
                            )
                                : (
                                    <div className="flex justify-center items-center mt-4">
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
                                        {totalPage > 1 && (
                                            <Link
                                                href={`/?page=${totalPage}`}
                                                className={`px-4 py-2 m-2 ${searchPage === totalPage ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'} rounded`}
                                            >
                                                {totalPage}
                                            </Link>
                                        )}
                                        <Link
                                            href={`/?page=${totalPage > page ? page + 1 : page}`}
                                            className={`px-4 py-2 m-2 ${page === totalPage ? 'bg-gray-300 text-gray-600' : 'bg-blue-500 text-white'} rounded flex`}
                                        >
                                            <p className='md:block hidden'>Next</p>
                                            <RiArrowRightDoubleLine className='text-2xl' />
                                        </Link>
                                    </div>
                                )}
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center h-52 font-semibold text-xl'>
                    <p className='text-red-800'>No Movies Data Found :( ...</p>
                    <Link href="/" className='underline text-blue-800 mt-5'>Go Back</Link>
                </div>
            )}
        </>
    );
}
