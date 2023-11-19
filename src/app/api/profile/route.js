import { prisma } from "@/app/backend/db/dbClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
/**
 * @param {Request} request
 */
export async function POST(request) {
    const session = await getServerSession();
    if (session) {
        try {
            const req = await request.json();
            const email = session.user.email;
            const res = await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    name: req.name,
                    email: email,
                    address: req.address,
                },
            })
            return NextResponse.json(res, { status: 200 });
        } catch (error) {
            return new NextResponse(error.message, { status: 500 });
        }
    } else {
        return new NextResponse("Unauthorized", { status: 401 });
    }
}
