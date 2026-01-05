import { NextRequest, NextResponse } from "next/server";
import { generateCompanyFundamentals } from "@/data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ ticker: string }> }
) {
  const { ticker } = await params;

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 150));

  const fundamentals = generateCompanyFundamentals(ticker.toUpperCase());

  if (!fundamentals) {
    return NextResponse.json(
      { error: "Company not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(fundamentals);
}
