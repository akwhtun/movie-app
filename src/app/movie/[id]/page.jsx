"use client"

import { useState, useEffect, useContext } from "react";
import LeftColumn from "@/app/components/LeftColumn";
import Movie from "./Movie";
import Navbar from "@/app/components/Navbar";
import ThemeContext from "@/app/context/ThemeContext";
import Error from "@/app/Error";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function page({ params }) {

    const { theme, setTheme } = useContext(ThemeContext);
    const [movie, setMovie] = useState();
    const [credits, setCredits] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const movieId = params.id;
    const castLoadig = [1, 2, 3, 4, 5, 6, 7, 8];

    useEffect(() => {

        const fetchMovieData = async () => {
            try {
                const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
                const data = await response.json();
                setMovie(data);

                const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`);
                const creditsData = await creditsResponse.json();
                setCredits(creditsData);
                setLoading(false)
            }
            catch (error) {
                setLoading(false)
                setError(true)
            }
        }
        fetchMovieData()
    }, [movieId])

    if (error) {
        return (
            <>
                <Error />
            </>
        )
    }

    if (loading) {
        return (

            <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>

                <LeftColumn />
                <div className="lg:w-4/5 w-full  px-5 py-2">
                    <Navbar />
                    <div>
                        <div className="p-4 max-w-4xl mx-auto">
                            <SkeletonTheme baseColor={theme === 'dark' ? '#202020' : '#ebebeb'} highlightColor={theme === 'dark' ? '#444' : '#f5f5f5'}>
                                <div className="lg:flex lg:flex-row flex-col lg:items-start items-center lg:justify-between justify-center lg:gap-4 gap-2 mt-20">

                                    <Skeleton height={370} width={280} />

                                    <div>
                                        <h2 className="text-xl font-semibold mb-2">Details</h2>
                                        <Skeleton height={40} width={210} count={4} />

                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold mb-2">Rating</h2>
                                        <Skeleton height={40} width={210} count={2} />

                                    </div>
                                </div>
                                <Skeleton height={40} width={180} />
                                <Skeleton height={40} />

                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-2">Production</h2>
                                    <Skeleton height={40} count={2} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">Cast</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {
                                            castLoadig.map(load => (
                                                <div key={load}>
                                                    <Skeleton height={300} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </SkeletonTheme>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
    return (

        <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>

            <LeftColumn />
            <div className="lg:w-4/5 w-full  px-5 py-2">
                <Navbar />
                <div>
                    <Movie movie={movie} credits={credits} />
                </div>
            </div>

        </div>



    )
}

