import { type NextRequest, NextResponse } from "next/server"
import { getCategories } from "@/lib/category-actions"
import { isOriginAllowed, getApiConfig } from "@/lib/api-config"

export async function GET(request: NextRequest) {
  // Get API key from query parameters
  const apiKey = request.nextUrl.searchParams.get("apiKey")

  // Get origin from request headers
  const origin = request.headers.get("origin") || ""

  // Get API configuration
  const config = await getApiConfig()

  // Validate API key if required
  if (apiKey !== config.apiKey) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
  }

  try {
    const categories = await getCategories()

    // Set CORS headers if enabled
    const headers: HeadersInit = {}

    if (config.enableCors) {
      if (config.allowedOrigins.includes("*")) {
        headers["Access-Control-Allow-Origin"] = "*"
      } else if (await isOriginAllowed(origin)) {
        headers["Access-Control-Allow-Origin"] = origin
      }

      headers["Access-Control-Allow-Methods"] = "GET, OPTIONS"
      headers["Access-Control-Allow-Headers"] = "Content-Type"
    }

    return NextResponse.json(categories, { headers })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function OPTIONS(request: NextRequest) {
  // Get origin from request headers
  const origin = request.headers.get("origin") || ""

  // Get API configuration
  const config = await getApiConfig()

  // Set CORS headers if enabled
  const headers: HeadersInit = {}

  if (config.enableCors) {
    if (config.allowedOrigins.includes("*")) {
      headers["Access-Control-Allow-Origin"] = "*"
    } else if (await isOriginAllowed(origin)) {
      headers["Access-Control-Allow-Origin"] = origin
    }

    headers["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    headers["Access-Control-Allow-Headers"] = "Content-Type"
  }

  return new NextResponse(null, { headers })
}
