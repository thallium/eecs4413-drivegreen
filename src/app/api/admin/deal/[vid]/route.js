import { setHotDeal } from "@/app/backend/models/Vehicle";
import { isAdmin } from '@/app/backend/models/User';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { addHistory } from '@/app/backend/models/LoginHistory';


export async function POST(request, {params}){
    const session = await getServerSession({ req: request });
    // console.log(session);

    if (!session || !session.user || !(await isAdmin(session.user.email))) {
        return NextResponse.json(
            { message: 'You are not authorized to access this endpoint.' },
            { status: 401 }
        );
    }
    
    const req = await request.json();
    console.log(req);
    const hotDealed = req["hotDealed"];
    const vid = parseInt(params.vid);
    const data = await setHotDeal(vid, hotDealed);
    let ip =
      request.headers.get('x-real-ip') ||
      request.headers.get('x-forwarded-For').split(",")[0] ||
      '';

    const history = await addHistory(
    ip,
    session.user.email,
    'POST /api/admin/deal/' + vid
    );
    // console.log(data);
    return NextResponse.json({message: "updated hotDealed state of slected vehicle (id:" + vid + ")", hotDealed: data.hotDealed}, {status:200});
}