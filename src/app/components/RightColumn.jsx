import Movies from './Movies'
import ModeSwitch from './ModeSwitch'

export default function RightColumn() {
    
    return (
        <div className="w-3/4  px-5 py-2">
            <div className='flex items-center justify-between '>
                <h2 className="text-xl py-3">Featured Movies</h2>
                <h2 className=''>Search Bar</h2>
                <ModeSwitch/>
            </div>
            <div>
                <Movies />
            </div>
        </div>
    )
}
