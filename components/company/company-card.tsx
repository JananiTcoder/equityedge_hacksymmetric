"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ---------------------------------------------
   HARD-CODED COMPANY DATA (10 COMPANIES)
--------------------------------------------- */

const companies = [
  {
    id: "tcs",
    name: "Tata Consultancy Services",
    ticker: "TCS",
    exchange: "NSE",
    sector: "Technology",
    industry: "IT Services",
    logo: "tcs.png",
  },
  {
    id: "infosys",
    name: "Infosys",
    ticker: "INFY",
    exchange: "NSE",
    sector: "Technology",
    industry: "IT Services",
    logo: "infosys.png",
  },
  {
    id: "wipro",
    name: "Wipro",
    ticker: "WIPRO",
    exchange: "NSE",
    sector: "Technology",
    industry: "IT Services",
    logo: "wipro.png",
  },
  {
    id: "hcltech",
    name: "HCL Technologies",
    ticker: "HCLTECH",
    exchange: "NSE",
    sector: "Technology",
    industry: "IT Services",
    logo: "hcl.png",
  },
  {
    id: "hdfcbank",
    name: "HDFC Bank",
    ticker: "HDFCBANK",
    exchange: "NSE",
    sector: "Banking",
    industry: "Private Bank",
    logo: "hdfc.png",
  },
  {
    id: "icicibank",
    name: "ICICI Bank",
    ticker: "ICICIBANK",
    exchange: "NSE",
    sector: "Banking",
    industry: "Private Bank",
    logo: "icici.png",
  },
  {
    id: "sbin",
    name: "State Bank of India",
    ticker: "SBIN",
    exchange: "NSE",
    sector: "Banking",
    industry: "Public Bank",
    logo: "sbi.png",
  },
  {
    id: "kotakbank",
    name: "Kotak Mahindra Bank",
    ticker: "KOTAKBANK",
    exchange: "NSE",
    sector: "Banking",
    industry: "Private Bank",
    logo: "kotak.png",
  },
  {
    id: "reliance",
    name: "Reliance Industries",
    ticker: "RELIANCE",
    exchange: "NSE",
    sector: "Oil & Gas",
    industry: "Integrated Oil & Gas",
    logo: "reliance.png",
  },
  {
    id: "ongc",
    name: "Oil & Natural Gas Corporation",
    ticker: "ONGC",
    exchange: "NSE",
    sector: "Oil & Gas",
    industry: "Oil Exploration",
    logo: "ongc.png",
  },
];

/* ---------------------------------------------
   COMPONENT
--------------------------------------------- */

export function CompanyCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {companies.map((company, index) => (
        <motion.div
          key={company.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Link href={`/company/${company.id}`}>
            <Card variant="elevated" className="p-5 group cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {/* LOGO ONLY */}
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center overflow-hidden border">
                    <img
                      src={`/logos/${company.logo}`}
                      alt={`${company.name} logo`}
                      className="h-10 w-10 object-contain"
                    />
                  </div>

                  {/* TEXT */}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[var(--color-deep-navy)] group-hover:text-[var(--color-muted-teal)] transition-colors">
                        {company.name}
                      </h3>
                      <Badge variant="outline" size="sm">
                        {company.exchange}:{company.ticker}
                      </Badge>
                    </div>
                    <div className="mt-1 flex items-center gap-3">
                      <Badge variant="blue" size="sm">
                        {company.sector}
                      </Badge>
                      <span className="text-xs text-[var(--color-cool-gray)]">
                        {company.industry}
                      </span>
                    </div>
                  </div>
                </div>

                <ArrowRight className="h-5 w-5 text-[var(--color-surface-muted)] group-hover:text-[var(--color-muted-teal)] group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
