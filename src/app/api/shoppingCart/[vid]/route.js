import { prisma } from "@/app/backend/db/dbClient.js";
import { addToShoppingCart } from "@/app/backend/service/shoppingCart/shoppingCartService.js";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function PUT(request, { params }) {
    const vid = params.vid;
    const session = await getServerSession({ req: request });
    console.log("session:"+session)
    let shoppingCart;
    if (session) {
        try {
            const email = session.user.email;
            const req = await request.json();
            const option = req.option;
            if(option === "add"){
                shoppingCart = await addToShoppingCart(email, parseInt(vid));
            }
            
            return NextResponse.json(shoppingCart, { status: 200 });
        } catch (error) {
            return new NextResponse(error.message, { status: 500 });
        }
    }
    else {
        return new NextResponse("Unauthorized", { status: 401 });
    }
}