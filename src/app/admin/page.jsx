"use client"

import { useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';

export default function Home() {
    const { data: session } = useSession();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            if (session && session.user.isAdmin) {
                const response = await fetch('/api/users');
                const data = await response.json();
                const allUsers = data.users;
                setUsers(allUsers)
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
                console.log(result.message);
            } else {
                const errorData = await response.json();
                console.error('Failed to delete user:', errorData.message);
            }
        } catch (error) {
            console.error('Error occurred while deleting user:', error);
        }
    };


    if (!session) {
        return <p>Loading...</p>;
    }

    if (!session.user.isAdmin) {
        return <p>Access denied. Only admins can view this page.</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="px-4 py-2 border">{user.name}</td>
                                <td className="px-4 py-2 border">{user.email}</td>
                                <td className="px-4 py-2 border">
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(user.email)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

// export async function getServerSideProps(context) {
//     const session = await getSession(context);

//     if (!session || !session.user.isAdmin) {
//         return {
//             redirect: {
//                 destination: '/api/auth/signin',
//                 permanent: false,
//             },
//         };
//     }

//     return {
//         props: {
//             session,
//         },
//     };
// }
