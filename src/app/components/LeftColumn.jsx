import MenuItem from "./MenuItem"

export default function LeftColumn() {
    return (
        <div className="w-1/4  px-5 py-2">
            <div className=' py-3'>
                My Account
            </div>
            <nav className='mt-4'>
                <ul>
                    <li className='mb-2'><MenuItem title="My Movie App" address="/" /></li>
                    <li className='mb-2'><MenuItem title="Popular Movie" address="/" /></li>
                    <li className='mb-2'><MenuItem title="Top Related Movie" address="/" /></li>
                    <li className='mb-2'><MenuItem title="Favourite " address="/" /></li>
                </ul>
            </nav>
        </div>
    )
}
