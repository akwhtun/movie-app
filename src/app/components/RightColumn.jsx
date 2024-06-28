import MoviesList from './MoviesList'
import ModeSwitch from './ModeSwitch'
export default function RightColumn() {
    return (
        <div className="w-3/4  px-5 py-2">
            <div className='flex items-center justify-between '>
                <h2 className="text-xl py-3">Featured Movies</h2>
                <h2 className=''>Search Bar</h2>
                <ModeSwitch/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <MoviesList />
                <MoviesList />
                <MoviesList />
                <MoviesList />
                <MoviesList />
            </div>
        </div>
    )
}
