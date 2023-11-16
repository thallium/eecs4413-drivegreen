import AdminLayout from "../components/admin/AdminLayout";
// import { NextRequest } from 'next/server';
import { headers } from 'next/headers';

import { isAdmin } from '@/app/backend/models/User';
import { getServerSession } from 'next-auth';
import { addHistory } from '@/app/backend/models/LoginHistory';


export const dynamic = 'force-dynamic';// force dynamic

async function auth() {
    const header = headers();
    const session = await getServerSession();
    let authorized = true;
    // console.log('session', session);
    
    if (!session || !session.user || !(await isAdmin(session.user.email))) {
        authorized = false;
    } else {
        const ip = header.get('x-forwarded-host') || '';
        // console.log("headers", header);
        await addHistory(
            ip,
            session.user.email,
            'GET /admin'
        );
    }

    return authorized;
}


export default async function Admin() {
    const authorized = await auth();
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