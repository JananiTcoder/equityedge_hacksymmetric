"use client";

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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Skeleton className="h-8 w-48 mb-8" />
        <Skeleton className="h-12 w-96 mb-4" />
        <Skeleton className="h-6 w-64 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-deep-navy)]">
          Company not found
        </h1>
        <p className="mt-2 text-[var(--color-cool-gray)]">
          The company with ticker &quot;{ticker}&quot; could not be found.
        </p>
        <Button asChild className="mt-4">
          <Link href="/company/search">Back to Search</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/company/search"
        className="inline-flex items-center gap-2 text-[var(--color-cool-gray)] hover:text-[var(--color-muted-teal)] transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Search
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-[var(--radius-xl)] bg-[var(--color-soft-teal)] flex items-center justify-center flex-shrink-0">
          <Building2 className="h-8 w-8 text-[var(--color-muted-teal)]" />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[var(--text-display-sm)] font-bold text-[var(--color-deep-navy)]">
              {company.name}
            </h1>
            <Badge variant="outline" size="lg">
              {company.exchange}:{company.ticker}
            </Badge>
          </div>
          <div className="mt-2 flex items-center gap-4">
            <Badge variant="blue">{company.sector}</Badge>
            <span className="text-[var(--text-body-sm)] text-[var(--color-cool-gray)]">
              {company.industry}
            </span>
          </div>
          {company.description && (
            <p className="mt-3 text-[var(--text-body)] text-[var(--color-cool-gray)] max-w-2xl">
              {company.description}
            </p>
          )}
        </div>
      </div>

      {/* Data freshness */}
      <div className="mt-6 flex items-center gap-4 text-[var(--text-body-xs)] text-[var(--color-cool-gray)]">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          Last updated: 2025-01-07
        </div>
        <div className="flex items-center gap-1">
          <Database className="h-4 w-4" />
          Source: {company.dataSource}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="fundamentals" className="mt-8">
        <TabsList>
          <TabsTrigger value="fundamentals">Key Metrics</TabsTrigger>
          <TabsTrigger value="ratios">Financial Ratios</TabsTrigger>
        </TabsList>

        {/* Fundamentals Tab */}
        <TabsContent value="fundamentals">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricCard
              label="Revenue"
              data={company.revenue}
              tooltip="Total income from business operations"
            />
            <MetricCard
              label="Net Profit"
              data={company.netProfit}
              tooltip="Profit after all expenses and taxes"
            />
            <MetricCard
              label="Profit Margin"
              data={company.profitMargin}
              tooltip="Percentage of revenue that becomes profit"
            />
            <MetricCard
              label="Debt to Equity"
              data={company.debtToEquity}
              tooltip="How much debt vs. shareholder equity"
            />
            <MetricCard
              label="Operating Cash Flow"
              data={company.operatingCashFlow}
              tooltip="Cash generated from core business"
            />
            <MetricCard
              label="Cash Reserves"
              data={company.cashReserves}
              tooltip="Cash and equivalents on hand"
            />
          </div>
        </TabsContent>

        {/* Ratios Tab */}
        <TabsContent value="ratios">
          <div className="mb-6 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info-light)]">
            <p className="text-[var(--text-body-sm)] text-[var(--color-info)]">
              <strong>Tip:</strong> Click the info icon on any ratio to learn what it means,
              how it&apos;s calculated, and how to interpret it.
            </p>
          </div>
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

      {/* Educational disclaimer */}
      <div className="mt-12 p-6 rounded-[var(--radius-xl)] bg-[var(--color-surface-subtle)] border border-[var(--color-surface-muted)]">
        <h3 className="font-semibold text-[var(--color-deep-navy)]">
          Educational Purpose Only
        </h3>
        <p className="mt-2 text-[var(--text-body-sm)] text-[var(--color-cool-gray)]">
          This data is for learning purposes. Always verify information from official sources
          (company filings, BSE, NSE) before making any investment decisions. Past performance
          doesn&apos;t guarantee future results.
        </p>
      </div>

      {/* Ratio Education Modal */}
      <RatioEducationModal
        ratio={selectedRatio}
        isOpen={selectedRatio !== null}
        onClose={() => setSelectedRatio(null)}
      />
    </div>
  );
}
