import { useContext, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import ThemeContext from "@/app/context/ThemeContext";
export default function Movie({ movie, credits }) {

    const { theme, setTheme } = useContext(ThemeContext)

    const handleGoogleSearch = (castName) => {
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(castName)}`;
        window.open(searchUrl, "_blank");
    }
    return (

        <div className="flex justify-start lg:mt-14 mt-24 lg:p-2 p-0 ">
            <div className="cursor-pointer ">
                <p onClick={() => history.back()}><FaArrowLeftLong className="text-2xl" /></p>
            </div>
            <div className="lg:p-4 p-1  w-full">
                <div className="lg:flex lg:flex-row flex-col lg:items-start items-center lg:justify-between justify-center lg:gap-4 gap-2">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="mb-4 rounded-lg w-80 h-96 object-cover" />

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Details</h2>
                        <p className="mb-2"><strong>Release Date:</strong> {movie.release_date}</p>
                        <p className="mb-2"><strong>Runtime:</strong> {movie.runtime} minutes</p>
                        <p className="mb-2"><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
                        <p className="mb-2"><strong>Language:</strong> {movie.original_language}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Rating</h2>
                        <p className="mb-2"><strong>Average Rating:</strong> {movie.vote_average}</p>
                        <p className="mb-2"><strong>Vote Count:</strong> {movie.vote_count}</p>
                    </div>
                </div>
                <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
                <p className="text-gray-600 mb-4">{movie.overview}</p>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Production</h2>
                    <p><strong>Companies:</strong> {movie.production_companies.map(company => company.name).join(', ')}</p>
                    <p><strong>Countries:</strong> {movie.production_countries.map(country => country.name).join(', ')}</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Cast</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 gap-2">
                        {credits.cast.slice(0, 8).map((castMember) => (
                            <div key={castMember.cast_id} className={`${theme == 'dark' ? 'bg-black' : 'bg-white'} lg:p-4 md:p-2 p-1 cursor-pointer shadow rounded`} onClick={() => handleGoogleSearch(castMember.name)}>
                                <img src={`https://image.tmdb.org/t/p/w200${castMember.profile_path}`} alt={castMember.name} className="mb-2 rounded" />
                                <h3 className={`${theme == 'dark' ? 'text-white' : 'text-black'}text-lg font-semibold `}>{castMember.name}</h3>
                                <p className="text-gray-600">{castMember.character}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}