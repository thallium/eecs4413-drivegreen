import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { getUserProfile } from "../backend/service/profile/profile"

const ProfilePage = async () => {
    const session = await getServerSession()
    if (!session) {
        redirect('/signin')
    }
    const email = session?.user?.email
    const profile = await getUserProfile(email)
    return (
        <>
            <div className="p-4">Profile page</div>
            <div className="p-4">{profile.name}</div>
            <div className="p-4">{email}</div>
            <div className="p-4">{profile.address}</div>
        </>
    )
}

export default ProfilePage
