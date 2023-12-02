import { isAdmin } from '@/app/backend/models/User';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET(request) {
  // auth first
  const session = await getServerSession({ req: request });
  // console.log(session);
  // console.log('admin access', session.user);
  if (!session || !session.user || !(await isAdmin(session.user.email))) {
    return NextResponse.json(
      { message: 'This is not an admin' },
      { status: 401 }
    );
  }

  return NextResponse.json({ message: 'Yes, this is an admin' }, { status: 200})
}