import { prisma } from "@/app/backend/db/dbClient";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const vid = params.vid;
    try {
        const reviews = await prisma.review.findMany({
            where: {
                vehicleId: parseInt(vid)
            },
            select: {
                createdAt: true,
                title: true,
                rating: true,
                body: true,
                author: true,
            }
        })
        return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}
