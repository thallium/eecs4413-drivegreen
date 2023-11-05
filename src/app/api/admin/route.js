import { NextResponse } from 'next/server';
//import {LoginHistory} from '@/app/backend/model/LoginHistory';
//import order, history, hotdeal
import { getServerSession } from 'next-auth';
import {app_reports} from '@/app/backend/service/admin/reports';
//import isAdmin

export async function GET(request) {
  // auth first
  const session = await getServerSession({ req: request });
  console.log(session);
  if (!session || !session.user || !isAdmin(session.user)) {
    //
    return NextResponse.json(
      {
        message: 'Not authorized. Please login.',
      },
      { status: 401 }
    );
  }
  // get sales, hotdeal, login history
  const {login} = app_reports();
  //
  //
  return NextResponse.json({status:200}, {login_histories: login});
}
