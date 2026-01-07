export interface Company {
  id: string;
  name: string;
  ticker: string;
  exchange: "NSE" | "BSE";
  sector: string;
  industry: string;
  description?: string;
  logo?: string; // this must exist
}

export interface CompanyFundamentals extends Company {
  revenue: MetricData;
  netProfit: MetricData;
  profitMargin: MetricData;
  debtToEquity: MetricData;
  operatingCashFlow: MetricData;
  cashReserves: MetricData;
  ratios: FinancialRatio[];
  lastUpdated: string;
  dataSource: string;
}
