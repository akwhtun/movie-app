import { useEffect, useState } from 'react';
import MoviesList from "./MoviesList";
import Link from 'next/link';
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { useSearchParams } from 'next/navigation';

export default function Movies() {
    const searchParams = useSearchParams();
    const searchPage = parseInt(searchParams.get("page")) || 1;
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(searchPage);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        setPage(searchPage);
    }, [searchPage]);

    useEffect(() => {
        const fetchMovies = async () => {
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

        };
        fetchMovies();
    }, [page]);

    const handleNextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, totalPage));
    };

    const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {movies.map(movie => (
                    <MoviesList key={movie.id} {...movie} />
                ))}
            </div>
            <div className="flex justify-center items-center mt-4">
                <Link href={`/?page=${page > 1 ? page - 1 : 1}`} className={`px-4 py-2 m-2 ${page === 1 ? 'bg-gray-300 text-gray-600' : 'bg-blue-500 text-white'} rounded flex`}>
                    <RiArrowLeftDoubleFill className='text-2xl' />
                    <p className='md:block hidden'>Previous</p>
                </Link>
                <Link href={`/?page=1`} className={`px-4 py-2 m-2 ${searchPage == 1 ?
                    'bg-gray-300 text-black' : 'bg-blue-500 text-white'}  rounded`}>
                    1
                </Link>
                <p className='text-3xl px-4 py-2'>.....</p>
                <Link href={`/?page=${totalPage}`} className={`px-4 py-2 m-2 ${searchPage == totalPage ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'}rounded`}>
                    {totalPage}
                </Link>
                <Link href={`/?page=${totalPage > page ? page + 1 : page}`} className={`px-4 py-2 m-2 ${page === totalPage ? 'bg-gray-300 text-gray-600' : 'bg-blue-500 text-white'} rounded flex`}>
                    <p className='md:block hidden'>Next</p>
                    <RiArrowRightDoubleLine className='text-2xl' />
                </Link>
            </div>
        </div>
    );
}
