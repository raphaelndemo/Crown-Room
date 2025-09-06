"use server";
import { z } from "zod";

const Input = z.object({
  serviceId: z.string(),
  stylistId: z.string(),
  startIso: z.string().datetime(),
});

export async function createBooking(input: z.infer<typeof Input>) {
  const body = Input.parse(input);
  const res = await fetch(`${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/api/bookings`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...body, payNow: true }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Booking failed");
  return res.json();
} 