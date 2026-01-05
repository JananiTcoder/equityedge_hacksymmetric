import { NextResponse } from "next/server";
import { marketStatistics, behavioralPatterns } from "@/data";

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return NextResponse.json({
    statistics: marketStatistics,
    patterns: behavioralPatterns,
  });
}
