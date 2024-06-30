import React from 'react'
import Search from './Search'
import ModeSwitch from './ModeSwitch'
export default function Navbar() {
    return (
        <div className='flex items-center justify-between '>
            <h2 className="text-xl py-3">Featured Movies</h2>
            <Search />
            <ModeSwitch />
        </div>
    )
}
