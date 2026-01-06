// types.ts
export interface Company {
  id: string;
  name: string;
  ticker: string;
  exchange: string;
  sector: string;
  industry: string;
  logo?: string; // ← add this
}
