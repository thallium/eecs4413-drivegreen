import { prisma } from "@/app/backend/db/dbClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession();
    if (session) {
        const email = session.user.email;
        try {
            const watchlist = await prisma.user.findUnique({
                where: {
                    email: email
                },
                select: {
                    watchList: {
                        select: {
                            vehicle: {
                                select: {
                                    name: true,
                                    hotDealed: true,
                                }
                            }
                        }
                    }
                }
            });
            const hotDealedCar = watchlist.watchList
                .filter((item) => item.vehicle.hotDealed)
                .map((item) => item.vehicle.name);
            return NextResponse.json(hotDealedCar, { status: 200 });
        } catch (error) {
            return new NextResponse(error.message, { status: 500 });
        }
    } else {
        return new NextResponse("Unauthorized", { status: 401 });
    }
}
