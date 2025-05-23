import { NextResponse } from "next/server"

export async function GET() {
  // Redirect to the frontend website
  return NextResponse.redirect(new URL("/frontend", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"))
}
