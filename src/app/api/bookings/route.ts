import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/db/client";
import { auth } from "@/server/auth/session";

const Body = z.object({
  serviceId: z.string(),
  stylistId: z.string(),
  startIso: z.string().datetime(),
  payNow: z.boolean().default(true),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: { message: "Unauthorized" } }, { status: 401 });
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 });

  const { serviceId, stylistId, startIso } = parsed.data;
  const svc = await prisma.service.findUnique({ where: { id: serviceId }, select: { durationMin: true, priceCents: true, currency: true, stylistId: true } });
  if (!svc || svc.stylistId !== stylistId) return NextResponse.json({ error: { message: "Invalid service" } }, { status: 400 });

  const start = new Date(startIso);
  const end = new Date(start.getTime() + svc.durationMin * 60 * 1000);

  try {
    const result = await prisma.$transaction(async (tx) => {
      const free = await tx.timeSlot.count({ where: { stylistId, start: { gte: start }, end: { lte: end }, booked: false } });
      const needed = Math.ceil(svc.durationMin / 15);
      if (free < needed) throw new Error("Slot unavailable");

      await tx.timeSlot.updateMany({ where: { stylistId, start: { gte: start }, end: { lte: end }, booked: false }, data: { booked: true } });

      const booking = await tx.booking.create({
        data: {
          userId: (session.user as any).id,
          stylistId, serviceId, start, end,
          status: "PENDING",
          priceCents: svc.priceCents, currency: svc.currency,
        },
      });

      return { bookingId: booking.id, clientSecret: null };
    });

    return NextResponse.json(result, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: { message: e.message } }, { status: 409 });
  }
} 