'use client';
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const ProfilePage = () => {
    const session = useSession({
        required: true,
        onUnauthorized: () => {
            redirect('/signin')
        }
    })
    return (
        <>
            <div className="p-4">Profile page</div>
            <div className="p-4">{session?.data?.user?.email}</div>
        </>
    )
}

export default ProfilePage
