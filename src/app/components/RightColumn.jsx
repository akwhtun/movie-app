import MoviesList from './MoviesList'

export default function RightColumn() {
    return (
        <div className="w-3/4 bg-gray-100 px-5 py-2">
            <div className='flex item-center justify-between bg-blue-600'>
                <h2 className="text-xl py-3">Featured Movies</h2>
                <h2 className=''>Search Bar</h2>
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
