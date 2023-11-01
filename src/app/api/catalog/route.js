import { NextResponse } from "next/server";
import { prisma } from "../../backend/db/dbClient.js";

// To handle a GET request to /api
export async function GET(request, {params}) {
  const slug = params.slug
  // Do whatever you want
  const vehicles = await prisma.vehicle.findMany();

  // return Response.json(data)
  redirect('https://nextjs.org/')
  return NextResponse.json(vehicles, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  const json = await request.json();
  const vehicle = await prisma.vehicle.create({
    data: json,
  })
  return NextResponse.status(201).json(vehicle);
}

// Same logic to add a `PATCH`, `DELETE`...