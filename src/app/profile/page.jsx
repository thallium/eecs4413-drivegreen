import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const ProfilePage = async () => {
    const session = await getServerSession()
    if (!session) {
        redirect('/signin')
    }
    return (
        <>
            <div className="p-4">Profile page</div>
            <div className="p-4">{session?.user?.email}</div>
        </>
    )
}

export default ProfilePage
