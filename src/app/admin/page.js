import AdminLayout from "../components/admin/AdminLayout";
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';

export async function getServerSideProps({ request }) {
    const session = await getServerSession({ req: request });
    let authorized = true;
    console.log('session', session);
    if (!session || !session.user || !(await isAdmin(session.user.email))) {
        authorized = false;
    } else {
        const ip = request.headers['x-real-ip'] || request.connection.remoteAddress;

        await addHistory(
            session.user.id,
            ip,
            session.user.email,
            request.method + ' /admin'
        );
    }

    return {
        props: {
            authorized: authorized,
        },
    };
}


export default function Admin({authorized}) {
    return <>
        {!authorized && <>
            <h1>You are not authorized to access this page. Please try sign in.</h1><br />
            <a href="/signin">Sign In</a>
        </>
        }

        {authorized && 
            <AdminLayout />
        }
    </>
}