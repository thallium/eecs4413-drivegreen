import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { app_reports, sale_reports } from '@/app/backend/service/admin/reports';
import { isAdmin } from '@/app/backend/models/User';
import { getDeals } from '@/app/backend/models/Vehicle';
import { addHistory } from '@/app/backend/models/LoginHistory';


export async function GET(request) {
  // auth first
  const session = await getServerSession({ req: request });
  // console.log(session);
  console.log('admin api user', session.user);
  if (!session || !session.user || !(await isAdmin(session.user.email))) {
    return NextResponse.json(
      { message: 'You are not authorized to access this endpoint.' },
      { status: 401 }
    );
  }
  // get sales, hotdeal, login history
  const login = await app_reports();
  const sales = await sale_reports();
  const deals = await getDeals();
  let ip =
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-For').split(':')[0] ||
    '';
  // const method = request.method;
  console.log("api headers", request.headers);

  // add login history
  const data = await addHistory(ip, session.user.email, "GET /api/admin");

  return NextResponse.json({login_histories: login, sales: sales, deals: deals}, {status:200});
}
