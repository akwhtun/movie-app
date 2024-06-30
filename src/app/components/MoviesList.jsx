import { useContext, useState } from "react";
import ThemeContext from "@/context/ThemeContext";
import Link from "next/link";

export default function MoviesList({ backdrop_path, id, original_language, original_title, overview, poster_path, release_date, vote_average, vote_count }) {

  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className={`p-4 shadow-lg rounded-lg border ${theme === 'dark' ? 'border-gray-200' : 'border-gray-800'}`}>

      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={original_title}
        className="w-full h-64 object-cover rounded-t-lg"
      />

      <div className={`p-4 relative lg:h-48 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>

        <h3 className="text-xl font-semibold mb-2 lg:h-14 lg:overflow-hidden">{original_title}</h3>



        <p className="text-sm mb-2">Rating: {vote_average} ({vote_count} votes)</p>



        <p className="mb-2 line-clamp-2">{overview}</p>
        <Link href={`/movie/${id}`} className="text-blue-500 hover:underline absolute bottom-0">
          View Details
        </Link>
      </div>
    </div>
  );
}
