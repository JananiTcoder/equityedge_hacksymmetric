export interface Company {
  id: string;
  name: string;
  exchange: string;
  ticker: string;
  sector: string;
  industry: string;
  logo?: string; // ✅ ADD THIS LINE
}
