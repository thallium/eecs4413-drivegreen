import { NextResponse } from 'next/server';
//import {LoginHistory} from '@/app/backend/model/LoginHistory';
//import order, history, hotdeal

export async function GET(request) {
  // auth first

  // get sales, hotdeal, login history
  // const sales = await Order.findMany();

  return NextResponse.json({ success: true, message: "admin accessed successfully!" });
}
