import { prisma } from "@/app/backend/db/dbClient.js";
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
            const authorId = req.authorId;
            const res = await prisma.user.findUnique({
                where: {
                    uid: authorId
                },
                select: {
                    orders: {
                        select: {
                            orderItems: true
                        }
                    }
                },
            });
            let found = false;
            if (res && res.orders) {
                outer: for (let o of res.orders) {
                    for (let oi of o.orderItems) {
                        if (oi.vehicleId === req.vehicleId) {
                            found = true;
                            break outer;
                        }
                    }
                }
            }
            if (!found) {
                return new NextResponse("User doesn't have an order associated with this vehicle", { status: 403 });
            }
            const review = await prisma.review.create({
                data: req,
            })
            return NextResponse.json(review, { status: 201 });
        } catch (error) {
            return new NextResponse(error.message, { status: 500 });
        }
    } else {
        return new NextResponse("Unauthorized", { status: 401 });
    }
}

export async function GET() {
    try {
        const reviews = await prisma.review.findMany();
        return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}
