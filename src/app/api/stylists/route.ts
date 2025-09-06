import { NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { z } from "zod";

const Query = z.object({
  q: z.string().optional(),
  city: z.string().optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  take: z.coerce.number().min(1).max(50).default(20),
  cursor: z.string().optional(),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parsed = Query.safeParse(Object.fromEntries(url.searchParams));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  const { q, city, rating, take, cursor } = parsed.data;

  const where: any = { };
  if (q) where.OR = [
    { displayName: { contains: q, mode: "insensitive" } },
    { services: { some: { name: { contains: q, mode: "insensitive" } } } },
  ];
  if (city) where.location = { city: { contains: city, mode: "insensitive" } };
  if (rating) where.ratingAvg = { gte: rating };

  const items = await prisma.stylist.findMany({
    where, take: take + 1, ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    orderBy: { ratingAvg: "desc" },
    include: {
      services: { where: { isActive: true }, take: 3, select: { id: true, name: true, priceCents: true, durationMin: true } },
      location: { select: { city: true, country: true } },
    },
  });
  const nextCursor = items.length > take ? items.pop()!.id : null;
  return NextResponse.json({ items, nextCursor });
} 