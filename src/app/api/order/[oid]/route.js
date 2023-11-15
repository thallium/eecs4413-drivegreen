import { getOrders, createOrderFromShoppingCart, updateOrderPaymentStatus, getOrderById } from "@/app/backend/service/order/orderService.js";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function PUT(request, {params}) {
    const session = await getServerSession({ req: request });
    console.log("session:"+JSON.stringify(session));
    if (session) {
        try {
            const email = session.user.email;
            console.log("email:"+email);
            const req = await request.json();
            const paymentSuccess = req.paymentSuccess;
            const orderId = parseInt(params.oid);
            const order = await updateOrderPaymentStatus(orderId, paymentSuccess);
            console.log("order to be sent in response:" + JSON.stringify(order));
            return NextResponse.json(order, { status: 200 });
        } catch (error) {
            return new NextResponse(error.message, { status: 500 });
        }
    } else {
        return new NextResponse("Unauthorized", { status: 401 });
    }
}

export async function GET(request, {params}) {
    const session = await getServerSession({ req: request });
    console.log("session:"+JSON.stringify(session));
    if (session) {
        try {
            const email = session.user.email;
            console.log("email:"+email);
            const orderId = parseInt(params.oid);
            const order = await getOrderById(orderId);
            console.log("order retrieved:" + JSON.stringify(order));
            return NextResponse.json(order, { status: 200 });
        } catch (error) {
            return new NextResponse(error.message, { status: 500 });
        }
    } else {
        return new NextResponse("Unauthorized", { status: 401 });
    }
}
