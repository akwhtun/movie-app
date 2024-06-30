import Movies from './Movies'
import Navbar from './Navbar'
export default function RightColumn() {

    return (
        <div className="w-3/4  px-5 py-2">
            <Navbar />
            <div>
                <Movies />
            </div>
        </div>
    )
}
