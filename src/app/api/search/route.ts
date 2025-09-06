import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Implement search across stylists/services with pagination
  return NextResponse.json({ items: [], nextCursor: null });
} 