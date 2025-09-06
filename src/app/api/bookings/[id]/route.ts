import { NextResponse } from "next/server";
import { prisma } from "@/db/client";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const booking = await prisma.booking.findUnique({ where: { id: params.id }, include: { service: true, stylist: true } });
  if (!booking) return NextResponse.json({ error: { message: "Not found" } }, { status: 404 });
  return NextResponse.json(booking);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  // TODO: Implement authenticated cancel flow via Server Action, then reflect here
  return NextResponse.json({ ok: true });
} 