import { useContext } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ThemeContext from "@/app/context/ThemeContext";
import { useState } from "react";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
export default function MoviesList({ backdrop_path, id, original_language, original_title, overview, poster_path, release_date, vote_average, vote_count }) {

  const { theme, setTheme } = useContext(ThemeContext);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false)
  const handleAddFavourite = async () => {
    if (!session) {
      alert("You need to be logged in to add favorites");
      return;
    }

    setLoading(true);
    const response = await fetch('/api/favourite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: session.user.id,
        movieId: id,
        movieName: original_title,
        moviePoster: poster_path
      }),
    });
    const data = await response.json();

    setLoading(false)
    if (response.error) {
      alert(response.error)
    } else {
      alert(data.message)
    }
  };


  return (
    <>
      <div className={`lg:p-4 md:p-2 p-1 shadow-lg rounded-lg border ${theme === 'dark' ? 'border-gray-200' : 'border-gray-800'} mt-4  relative`}>
        {
          loading && (<div className="absolute spin">
            <span className="loader"></span>
          </div>)
        }

        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={original_title}
          className="w-full h-64 object-cover rounded-t-lg"
        />

        <div className={`p-4 relative lg:h-48 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>

          <h3 className="text-xl font-semibold mb-2 lg:h-14 lg:overflow-hidden">{original_title}</h3>



          <p className="text-sm mb-2">Rating: {vote_average} ({vote_count} votes)</p>



          <p className="mb-2 clamp">{overview}</p>
          <div className="flex items-center justify-between md:px-0 px-2">
            <Link href={`/movie/${id}`} className="text-blue-500 hover:underline">
              <span className="md:block hidden"> View Details</span>  <FaRegEye className="text-2xl md:hidden block" />
            </Link>

            <button className="text-blue-500 hover:underline" onClick={handleAddFavourite}>
              <span className="md:block hidden"> Add Favourite</span> <FaHeart className="text-2xl md:hidden block" />
            </button>

          </div>
        </div>
      </div>
    </>

  );
}
