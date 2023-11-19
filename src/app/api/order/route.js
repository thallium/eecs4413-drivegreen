import { getOrders, createOrderFromShoppingCart, updateOrderPaymentStatus } from "@/app/backend/service/order/orderService.js";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(request) {
    const session = await getServerSession({ req: request });
    console.log("session:"+JSON.stringify(session));
    if (session) {
        try {
            const email = session.user.email;
            console.log("email:"+email);
            const orders = await getOrders(email);
            console.log("orders retrieved:" + JSON.stringify(orders));
            return NextResponse.json(orders, { status: 200 });
        } catch (error) {
            return new NextResponse(error.message, { status: 500 });
        }
    } else {
        return new NextResponse("Unauthorized", { status: 401 });
    }
}

export async function POST(request) {
    const session = await getServerSession({ req: request });
    console.log("session:"+JSON.stringify(session));
    if (session) {
        try {
            const email = session.user.email;
            console.log("email:"+email);
            const req = await request.json();
            const shoppingCart = req.shoppingCart;
            const shippingAddr = req.shippingAddr;
            const paymentSuccess = req.paymentSuccess;
            const order = await createOrderFromShoppingCart(shoppingCart, shippingAddr, paymentSuccess);
            console.log("order to be sent in response:" + JSON.stringify(order));
            return NextResponse.json(order, { status: 201 });
        } catch (error) {
            return new NextResponse(error.message, { status: 500 });
        }
    } else {
        return new NextResponse("Unauthorized", { status: 401 });
    }
}

