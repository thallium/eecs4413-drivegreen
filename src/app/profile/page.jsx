import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { getUserProfile } from "../backend/service/profile/profile"
import Watchlist from "../components/Watchlist"
import Link from "next/link"

const ProfilePage = async () => {
    const session = await getServerSession()
    if (!session) {
        redirect('/signin')
    }
    const email = session?.user?.email
    const profile = await getUserProfile(email)
    return (
        <div className=" container mx-auto">
            <div className=" text-4xl font-bold py-4 mt-8">Profile</div>
            <div className="py-2">{`Name: ${profile.name}`}</div>
            <div className="py-2">{"Email: " + email}</div>
            <div className="py-2">{"Address: " + profile.address}</div>
            <div className=" text-3xl font-bold mt-8">Watch List</div>
            <Watchlist />
            <Link className="btn text-3xl font-bold my-8" href="/order">View My Orders</Link>
        </div>
    )
}

export default ProfilePage
