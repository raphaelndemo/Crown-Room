import { NextResponse } from "next/server";

export async function POST() {
  // TODO: Verify Stripe signature using STRIPE_WEBHOOK_SECRET and handle events
  return NextResponse.json({ received: true });
} 