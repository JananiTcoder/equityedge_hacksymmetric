import { NextRequest, NextResponse } from "next/server";
import { searchCompanies } from "@/data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const sector = searchParams.get("sector") || undefined;

  // Simulate network delay for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 100));

  const results = searchCompanies(query, sector);

  return NextResponse.json({
    results: results.slice(0, 10),
    total: results.length,
  });
}
