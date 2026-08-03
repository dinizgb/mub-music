import { NextRequest, NextResponse } from "next/server";
import { handleSearchProducts } from "services/search/handleSearchProducts";

export const dynamic = "force-dynamic";

/**
 * Resolves a client key for rate limiting from request headers.
 * @param {NextRequest} request Incoming request.
 * @return {string} Client identifier.
 */
function getClientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "local";
  }
  return request.headers.get("x-real-ip") || "local";
}

/**
 * Product search API for client-side autofill.
 * GET /api/search/products?q=...
 * @param {NextRequest} request Incoming request.
 * @return {Promise<NextResponse>} JSON products list.
 */
export async function GET(request: NextRequest) {
  const result = await handleSearchProducts(
    request.nextUrl.searchParams.get("q"),
    { clientKey: getClientKey(request) }
  );
  return NextResponse.json(result.body, { status: result.status });
}
