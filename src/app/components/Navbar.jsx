'use client';
import Link from "next/link";
import { useSession, signOut } from 'next-auth/react'

const Navbar = () => {
    // const session = useSession({
    //     required: true,
    //     onUnauthorized: () => { }
    // })
    return (
        <div className="h-20 w-full border-b-2 flex items-center justify-between p-2">
            <ul className="flex">
                <li className="p-2 cursor-pointer">
                    <Link href="/">Home</Link>
                </li>
                <li className="p-2 cursor-pointer">
                    <Link href="/signup">Sign Up</Link>
                </li>
                <li className="p-2 cursor-pointer">
                    <Link href="/signin">Sign In</Link>
                </li>
                <li className="p-2 cursor-pointer">
                    <Link href="/profile">Profile</Link>
                </li>
                <li className="p-2 cursor-pointer">
                    <button onClick={() => signOut()}>Sign Out</button>
                </li>
            </ul>
        </div>
    );
}

export default Navbar
