'use client'
import Link from "next/link";
import { useSession, getSession, signOut } from 'next-auth/react'
import { baseURL } from "@/util";
import { useEffect, useState } from "react";

const Navbar = () => {
    const { data: session } = useSession({});
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch(baseURL() + '/api/admin/access', {cache: "no-store"}).then((res) => {
            if (!res.ok) {
                // console.log('Not Admin!\n');
                return;
            }
            setIsAdmin(true);
            // console.log('Admin' + isAdmin);
        });
    }, [session]);


    return (
        <div className="navbar bg-primary text-primary-content">
            <div className="flex-1">
                <Link className="p-2" href="/">Home</Link>
                {!session && <Link className="p-2" href="/signup">Sign Up</Link>}
                {!session && <Link className="p-2" href="/signin">Sign In</Link>}
                {session && <Link className="p-2" href="/profile">Profile</Link>}
                {session && <button className="p-2" onClick={() => signOut()}>Sign Out</button>}
                {session && isAdmin && <Link className="p-2" href="/admin">Admin Dashboard</Link>}
            </div>
            <div className="flex-none">
                <button className="pr-16" onClick={() => { }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Navbar
