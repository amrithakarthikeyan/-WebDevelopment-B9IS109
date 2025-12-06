import { Asset } from "../interfaces/asset";
import { randomUUID } from "crypto";

// Initial mock data
export let assets: Asset[] = [
  {
    id: randomUUID(),
    tag: "LAP-001",
    type: "Laptop",
    brand: "Dell",
    model: "Latitude 3440",
    status: "ASSIGNED",
    assignedTo: "Demo User",
    purchaseDate: "2024-01-15",
  },
  {
    id: randomUUID(),
    tag: "MON-010",
    type: "Monitor",
    brand: "Dell",
    model: "24\"",
    status: "IN_STOCK",
    assignedTo: null,
    purchaseDate: "2023-11-02",
  },
];

export const addAsset = (asset: Omit<Asset, "id">): Asset => {
  const newAsset: Asset = { ...asset, id: randomUUID() };
  assets.push(newAsset);
  return newAsset;
};

export const updateAsset = (id: string, updates: Partial<Asset>): Asset | null => {
  const index = assets.findIndex((a) => a.id === id);
  if (index === -1) return null;
  assets[index] = { ...assets[index], ...updates };
  return assets[index];
};

export const deleteAsset = (id: string): boolean => {
  const before = assets.length;
  assets = assets.filter((a) => a.id !== id);
  return assets.length < before;
};
