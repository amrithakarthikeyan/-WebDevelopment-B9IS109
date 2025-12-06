import { Router } from "express";
import { assets, addAsset, updateAsset, deleteAsset } from "../data/assets";
import { Asset, AssetStatus } from "../interfaces/asset";

const router = Router();

// GET /api/assets - list all assets
router.get("/", (_req, res) => {
  res.json(assets);
});

// POST /api/assets - create new asset
router.post("/", (req, res) => {
  const { tag, type, brand, model, status, assignedTo, purchaseDate } = req.body as Partial<Asset>;

  if (!tag || !type) {
    return res.status(400).json({ message: "tag and type are required" });
  }

  const allowedStatuses: AssetStatus[] = ["IN_STOCK", "ASSIGNED", "MAINTENANCE", "RETIRED"];
  const finalStatus: AssetStatus = allowedStatuses.includes(status as AssetStatus)
    ? (status as AssetStatus)
    : "IN_STOCK";

  const newAsset = addAsset({
    tag,
    type,
    brand,
    model,
    status: finalStatus,
    assignedTo: assignedTo ?? null,
    purchaseDate,
  });

  res.status(201).json(newAsset);
});

// PUT /api/assets/:id - update asset
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updated = updateAsset(id, req.body);

  if (!updated) {
    return res.status(404).json({ message: "Asset not found" });
  }

  res.json(updated);
});

// DELETE /api/assets/:id - delete asset
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const removed = deleteAsset(id);

  if (!removed) {
    return res.status(404).json({ message: "Asset not found" });
  }

  res.status(204).send();
});

export default router;
