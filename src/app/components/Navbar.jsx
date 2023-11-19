'use client';
import Link from "next/link";
import { useSession, signOut } from 'next-auth/react'

const Navbar = () => {
    const { data: session } = useSession({})
    return (
        <div className="h-20 w-full border-b-2 flex items-center justify-between p-2">
            <div className="flex">
                <Link className="p-2" href="/">Home</Link>
                {!session && <Link className="p-2" href="/signup">Sign Up</Link>}
                {!session && <Link className="p-2" href="/signin">Sign In</Link>}
                {session && <Link className="p-2" href="/profile">Profile</Link>}
                {session && <button className="p-2" onClick={() => signOut()}>Sign Out</button>}
            </div>
        </div>
    );
}

export default Navbar
