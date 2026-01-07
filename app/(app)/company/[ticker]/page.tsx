"use client";

/* ===================== IMPORTS (TOP ONLY) ===================== */
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

/* ===================== TYPES (INLINE – NO IMPORT) ===================== */
type Company = {
  id: string;
  name: string;
  ticker: string;
  exchange: "NSE" | "BSE";
  sector: string;
  industry: string;
};

/* ===================== STATIC DATA ===================== */
const COMPANIES: Company[] = [
  { id: "tcs", name: "Tata Consultancy Services", ticker: "TCS", exchange: "NSE", sector: "Technology", industry: "IT Services" },
  { id: "infy", name: "Infosys", ticker: "INFY", exchange: "NSE", sector: "Technology", industry: "IT Services" },
  { id: "wipro", name: "Wipro", ticker: "WIPRO", exchange: "NSE", sector: "Technology", industry: "IT Services" },
  { id: "hcltech", name: "HCL Technologies", ticker: "HCLTECH", exchange: "NSE", sector: "Technology", industry: "IT Services" },
  { id: "hdfcbank", name: "HDFC Bank", ticker: "HDFCBANK", exchange: "NSE", sector: "Banking", industry: "Private Bank" },
  { id: "icicibank", name: "ICICI Bank", ticker: "ICICIBANK", exchange: "NSE", sector: "Banking", industry: "Private Bank" },
  { id: "sbin", name: "State Bank of India", ticker: "SBIN", exchange: "NSE", sector: "Banking", industry: "Public Bank" },
  { id: "kotakbank", name: "Kotak Mahindra Bank", ticker: "KOTAKBANK", exchange: "NSE", sector: "Banking", industry: "Private Bank" },
  { id: "reliance", name: "Reliance Industries", ticker: "RELIANCE", exchange: "NSE", sector: "Oil & Gas", industry: "Integrated Oil & Gas" },
  { id: "ongc", name: "ONGC", ticker: "ONGC", exchange: "NSE", sector: "Oil & Gas", industry: "Oil Exploration" },
];

/* ===================== PAGE ===================== */
export default function CompanyPage() {
  const params = useParams();
  const ticker = params.ticker as string;

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = COMPANIES.find(
      (c) => c.ticker.toLowerCase() === ticker.toLowerCase()
    );
    setCompany(found ?? null);
    setLoading(false);
  }, [ticker]);

  if (loading) {
    return (
      <div className="p-8">
        <Skeleton className="h-10 w-64" />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl font-bold">Company not found</h1>
        <Button asChild className="mt-4">
          <Link href="/company">Back</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link href="/company" className="flex items-center gap-2 mb-6 text-gray-500">
        <ArrowLeft size={16} /> Back
      </Link>

      <h1 className="text-3xl font-bold">{company.name}</h1>
      <Badge className="mt-2">
        {company.exchange}:{company.ticker}
      </Badge>

      <p className="mt-4 text-gray-600">
        {company.sector} · {company.industry}
      </p>
    </div>
  );
}
