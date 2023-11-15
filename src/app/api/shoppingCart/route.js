import { prisma } from "@/app/backend/db/dbClient.js";
import { getShoppingCart } from "@/app/backend/service/shoppingCart/shoppingCartService.js";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(request) {
    const session = await getServerSession({ req: request });
    console.log("session:"+session);
    if (session) {
        try {
            const email = session.user.email;
            console.log("email:"+email);
            const shoppingCart = await getShoppingCart(email);
            console.log("shopping Cart:" + shoppingCart);
            return NextResponse.json(shoppingCart, { status: 200 });
        } catch (error) {
            return new NextResponse(error.message, { status: 500 });
        }
    } else {
        return new NextResponse("Unauthorized", { status: 401 });
    }
}


