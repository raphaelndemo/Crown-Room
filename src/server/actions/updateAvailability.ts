"use server";
import { z } from "zod";

const Input = z.object({ stylistId: z.string(), slots: z.array(z.object({ startIso: z.string().datetime(), endIso: z.string().datetime() })) });
export async function updateAvailability(input: z.infer<typeof Input>) {
  const { stylistId, slots } = Input.parse(input);
  // TODO: Upsert TimeSlot rows for stylist
  return { ok: true, stylistId, slotsCount: slots.length };
} 