import { NextResponse } from "next/server";
import { prisma } from "@/db/client";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const stylist = await prisma.stylist.findUnique({
    where: { id: params.id },
    include: {
      services: { where: { isActive: true } },
      location: true,
    },
  });
  if (!stylist) return NextResponse.json({ error: { message: "Not found" } }, { status: 404 });
  return NextResponse.json(stylist);
} 