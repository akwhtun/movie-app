import { signOut } from "next-auth/react";
export default function SignOut() {
    return (
        <button className="block w-full text-left px-4 py-2 text-sm" onClick={() => signOut()}>
            sign out
        </button>
    )
}
