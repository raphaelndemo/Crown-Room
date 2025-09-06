"use server";
import { z } from "zod";

const Input = z.object({ bookingId: z.string() });
export async function cancelBooking(input: z.infer<typeof Input>) {
  const { bookingId } = Input.parse(input);
  // TODO: Update booking status and free time slots if needed
  return { ok: true, bookingId };
} 