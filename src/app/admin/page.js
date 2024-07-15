"use client"

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { FaArrowLeftLong } from "react-icons/fa6";
export default function Page() {
    const { data: session } = useSession();
    const [users, setUsers] = useState([]);
    const [denied, setDenied] = useState(false)
    const { theme } = useContext(ThemeContext);
    useEffect(() => {
        const fetchUser = async () => {

            if (session && session.user.isAdmin) {
                const response = await fetch('/api/users');
                const data = await response.json();
                const allUsers = data.users;
                setUsers(allUsers)
            } else {
                setDenied(true)
            }

        }
        fetchUser();
    }, [session]);

    const handleDelete = async (email) => {
        try {
            const response = await fetch('/api/users', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const result = await response.json();
                // setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));
                setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));
                console.log(result.message);
            } else {
                const errorData = await response.json();
                console.error('Failed to delete user:', errorData.message);
            }
        } catch (error) {
            console.error('Error occurred while deleting user:', error);
        }
    };


    if (denied) {
        return <div className={`w-screen h-screen flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
            <p> Access denied. Only admins can view this page.</p>
            <Link href={"/"} className='underline mt-2'>Go Back</Link>
        </div>

    }

    return (
        <div className={`container mx-auto p-4 w-screen h-screen ${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-black'}`}>
            <div className='flex items-center my-4'>
                <Link href={'/'}><FaArrowLeftLong className='text-2xl text-violet-700 ' /></Link>
                <h1 className="text-2xl font-bold ms-3">User List</h1>
            </div>
            <div className="">
                <table className="min-w-full ">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Role</th>
                            <th className="px-4 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className='text-center'>
                                <td className="px-4 py-2 border">{user.name}</td>
                                <td className="px-4 py-2 border">{user.email}</td>
                                <td className="px-4 py-2 border">{user.isAdmin ? 'Admin' : 'User'}</td>
                                {
                                    !user.isAdmin && (<td className="px-4 py-2 border">
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(user.email)}>Delete</button>
                                    </td>)
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

