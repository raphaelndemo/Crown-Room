"use server";
import { z } from "zod";

const Input = z.object({ bookingId: z.string(), newStartIso: z.string().datetime() });
export async function rescheduleBooking(input: z.infer<typeof Input>) {
  const { bookingId, newStartIso } = Input.parse(input);
  // TODO: Check availability, update booking times, and notify user
  return { ok: true, bookingId, newStartIso };
} 