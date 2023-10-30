import { NextResponse } from "next/server";
import { prisma } from "../../db/dbClient";

// To handle a GET request to /api
export async function GET(request, {params}) {
  const slug = params.slug
  // Do whatever you want
  const res = await fetch(env("DATABASE_URL"), {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  })
  const data = await res.json()

  // return Response.json(data)
  redirect('https://nextjs.org/')
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  const vehicle = await prisma.vehicle.create({
    data: {

    },
  })
  return NextResponse.status(201).json(vehicle);
}

// Same logic to add a `PATCH`, `DELETE`...