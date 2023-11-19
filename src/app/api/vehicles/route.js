import { NextResponse } from "next/server";
import { prisma } from "@/app/backend/db/dbClient.js";

export async function getAllVehicles() {
  return await prisma.vehicle.findMany();
}

// To handle a GET request to /api
export async function GET(request, { params }) {
  // const slug = params.slug
  const vehicles = await getAllVehicles();
  return NextResponse.json(vehicles, { status: 200 });
  // redirect('https://nextjs.org/')
}

// To handle a POST request to /api
export async function POST(request) {
  try {
    const json = await request.json();
    const vehicle = await prisma.vehicle.createMany({
      data: Array.from(json),
    })
    return new NextResponse(JSON.stringify(vehicle), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error.code === "P2002") {
      return new NextResponse("Vehicle with name already exists", {
        status: 409,
      });
    }
    return new NextResponse(error.message, { status: 500 });
  }
}

// Same logic to add a `PATCH`, `DELETE`...
