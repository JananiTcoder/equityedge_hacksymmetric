"use client";

import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { CompanyCard, SearchFilters } from "@/components/company";
import { Company } from "@/types";
import { sectors } from "@/data";

export default function CompanySearchPage() {
  const [query, setQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompanies() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (query) params.set("q", query);
        if (selectedSector) params.set("sector", selectedSector);

        const res = await fetch(`/api/companies/search?${params}`);
        const data = await res.json();
        setCompanies(data.results);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setLoading(false);
      }
    }

    const debounce = setTimeout(fetchCompanies, 300);
    return () => clearTimeout(debounce);
  }, [query, selectedSector]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-[var(--text-display-sm)] font-bold text-[var(--color-deep-navy)]">
          Search Companies
        </h1>
        <p className="mt-4 text-[var(--text-body-lg)] text-[var(--color-cool-gray)]">
          Explore fundamentals of major Indian companies. Learn what the numbers
          mean and how to evaluate them.
        </p>
      </div>

      {/* Search bar */}
      <div className="mt-8 max-w-xl">
        <Input
          variant="search"
          placeholder="Search by company name, ticker, or sector..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="mt-6">
        <SearchFilters
          sectors={sectors}
          selectedSector={selectedSector}
          onSectorChange={setSelectedSector}
        />
      </div>

      {/* Results */}
      <div className="mt-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : companies.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-[var(--color-surface-muted)] mx-auto" />
            <h3 className="mt-4 text-[var(--text-h3)] font-semibold text-[var(--color-deep-navy)]">
              No companies found
            </h3>
            <p className="mt-2 text-[var(--text-body)] text-[var(--color-cool-gray)]">
              Try a different search term or clear the filters.
            </p>
          </div>
        ) : (
          <>
            <p className="text-[var(--text-body-sm)] text-[var(--color-cool-gray)] mb-4">
              Showing {companies.length} companies
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {companies.map((company, index) => (
                <CompanyCard key={company.id} company={company} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
