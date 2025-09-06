import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Return aggregated availability for a stylist
  return NextResponse.json({ slots: [] });
} 