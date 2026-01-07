"use client";

/* -------------------- IMPORTS MUST COME FIRST -------------------- */
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2, Calendar, Database } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { MetricCard } from "@/components/company";
import { RatioCard, RatioEducationModal } from "@/components/ratios";

import { CompanyFundamentals, FinancialRatio } from "@/types";

/* -------------------- COMPONENT -------------------- */
export default function CompanyDetailPage() {
  const params = useParams();
  const ticker = params.ticker as string;

  const [company, setCompany] = useState<CompanyFundamentals | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRatio, setSelectedRatio] = useState<FinancialRatio | null>(null);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const res = await fetch(`/api/companies/${ticker}`);
        if (res.ok) {
          const data = await res.json();
          setCompany(data);
        }
      } catch (error) {
        console.error("Failed to fetch company:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCompany();
  }, [ticker]);

  /* -------------------- LOADING -------------------- */
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Skeleton className="h-8 w-48 mb-6" />
        <Skeleton className="h-12 w-96 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  /* -------------------- NOT FOUND -------------------- */
  if (!company) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold">Company not found</h1>
        <Button asChild className="mt-4">
          <Link href="/company/search">Back to Search</Link>
        </Button>
      </div>
    );
  }

  /* -------------------- MAIN UI -------------------- */
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link
        href="/company/search"
        className="inline-flex items-center gap-2 mb-8 text-gray-500 hover:text-teal-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Search
      </Link>

      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-xl bg-teal-100 flex items-center justify-center">
          <Building2 className="h-8 w-8 text-teal-600" />
        </div>

        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{company.name}</h1>
            <Badge variant="outline">
              {company.exchange}:{company.ticker}
            </Badge>
          </div>

          <div className="mt-2 flex gap-3">
            <Badge variant="blue">{company.sector}</Badge>
            <span className="text-sm text-gray-500">{company.industry}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-6 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          Last updated: 2025-01-07
        </div>
        <div className="flex items-center gap-1">
          <Database className="h-4 w-4" />
          Source: {company.dataSource}
        </div>
      </div>

      <Tabs defaultValue="fundamentals" className="mt-8">
        <TabsList>
          <TabsTrigger value="fundamentals">Key Metrics</TabsTrigger>
          <TabsTrigger value="ratios">Financial Ratios</TabsTrigger>
        </TabsList>

        <TabsContent value="fundamentals">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard label="Revenue" data={company.revenue} />
            <MetricCard label="Net Profit" data={company.netProfit} />
            <MetricCard label="Debt to Equity" data={company.debtToEquity} />
          </div>
        </TabsContent>

        <TabsContent value="ratios">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {company.ratios.map((ratio) => (
              <RatioCard
                key={ratio.id}
                ratio={ratio}
                onLearnMore={setSelectedRatio}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <RatioEducationModal
        ratio={selectedRatio}
        isOpen={selectedRatio !== null}
        onClose={() => setSelectedRatio(null)}
      />
    </div>
  );
}
