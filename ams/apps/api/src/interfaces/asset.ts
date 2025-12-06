export type AssetStatus = "IN_STOCK" | "ASSIGNED" | "MAINTENANCE" | "RETIRED";

export interface Asset {
  id: string;            // simple string ID for now
  tag: string;           // e.g. LAP-001
  type: string;          // e.g. Laptop, Monitor
  brand?: string;
  model?: string;
  status: AssetStatus;
  assignedTo?: string | null;
  purchaseDate?: string; // ISO string
}
