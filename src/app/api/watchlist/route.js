import { getServerSession } from "next-auth";
import { prisma } from "@/app/backend/db/dbClient";
import { NextResponse } from "next/server";

/**
 * @param {Request} request
 */
export async function GET(request) {
    const session = await getServerSession();
    if (session) {
        const email = session.user.email;
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                },
                select: {
                    uid: true
                }
            });
            const uid = user.uid;
            const res = await prisma.watchListItem.findMany({
                where: {
                    userId: uid
                },
                select: {
                    vehicle: {
                        select: {
                            vid: true,
                            name: true,
                            hotDealed: true,
                        }
                    },
                }
            })
            return NextResponse.json(res, { status: 200 });
        } catch (error) {
            return new NextResponse(error.message, { status: 500 });
        }
    } else {
        return new NextResponse("Unauthorized", { status: 401 });
    }
}

/**
 * @param {Request} request
 */
export async function POST(request) {
    const session = await getServerSession();
    if (session) {
        const email = session.user.email;
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                },
                select: {
                    uid: true
                }
            });
            const uid = user.uid;
            const req = await request.json();
            const res = await prisma.watchListItem.create({
                data: {
                    userId: uid,
                    vehicleId: req.vehicleId
                }
            });
            return NextResponse.json(res, { status: 200 });
        } catch (error) {
            return new NextResponse(error.message, { status: 500 });
        }
    } else {
        return new NextResponse("Unauthorized", { status: 401 });
    }
}

export async function DELETE(request) {
    const session = await getServerSession();
    if (session) {
        const email = session.user.email;
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                },
                select: {
                    uid: true
                }
            });
            const uid = user.uid;
            const req = await request.json();
            const res = await prisma.watchListItem.delete({
                where: {
                    userId_vehicleId: {
                        userId: uid,
                        vehicleId: req.vehicleId
                    }
                }
            });
            return NextResponse.json(res, { status: 200 });
        } catch (error) {
            return new NextResponse(error.message, { status: 500 });
        }
    } else {
        return new NextResponse("Unauthorized", { status: 401 });
    }
}
