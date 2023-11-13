import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import {app_reports, sale_reports} from '@/app/backend/service/admin/reports';
import {isAdmin} from '@/app/backend/models/user';

export async function GET(request) {
  // auth first
  const session = await getServerSession({ req: request });
  console.log(session);

  if (!session || !session.user || !isAdmin(session.user.email)) {
    return NextResponse.json(
      { message: 'You are not authorized to access this endpoint.' },
      { status: 401 }
    );
  }
  // get sales, hotdeal, login history
  const {login} = app_reports();
  const {sales} = sale_reports();
  
  return NextResponse.json({status:200}, {login_histories: login});
}
