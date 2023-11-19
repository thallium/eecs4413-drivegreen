import { prisma } from "@/app/backend/db/dbClient.js";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const vid = Number(params.vid);
  const vehicle = await prisma.vehicle.findUnique({
    where: {
      vid,
    },
  });

  if (!vehicle) {
    return new NextResponse("No vehicle with ID found", { status: 404 });
  }

  return NextResponse.json(vehicle);
}

export async function PATCH(request, { params }) {
  const vid = Number(params.vid);
  let json = await request.json();

  const updated_vehicle = await prisma.vehicle.update({
    where: { vid },
    data: json,
  });

  if (!updated_vehicle) {
    return new NextResponse("No vehicle with ID found", { status: 404 });
  }

  return NextResponse.json(updated_vehicle);
}

export async function DELETE(request, { params }) {
  try {
    const vid = Number(params.vid);
    const deleted_vehicle = await prisma.vehicle.delete({
      where: { vid },
    });

    return NextResponse.json(deleted_vehicle, { status: 200 });
  } catch (error) {
    if (error.code === "P2025") {
      return new NextResponse("No vehicle with ID found", { status: 404 });
    }

    return new NextResponse(error.message, { status: 500 });
  }
}
