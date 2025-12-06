import React, { useState } from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { useAssets } from "../hooks/useAssets";
import { useCreateAsset } from "../hooks/useCreateAsset";
import { useUpdateAsset } from "../hooks/useUpdateAsset";
import { useDeleteAsset } from "../hooks/useDeleteAsset";

export const AssetsPage: React.FC = () => {
  const { data, isLoading, isError } = useAssets();
  const { mutateAsync: createAsset, isPending: creating } = useCreateAsset();
  const { mutateAsync: updateAsset, isPending: updating } = useUpdateAsset();
  const { mutateAsync: deleteAsset, isPending: deleting } = useDeleteAsset();

  const [showForm, setShowForm] = useState(false);
  const [tag, setTag] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBrand, setEditBrand] = useState("");
  const [editModel, setEditModel] = useState("");
  const [editStatus, setEditStatus] = useState("IN_STOCK");
  const [editAssignedTo, setEditAssignedTo] = useState("");

  const handleSubmitNew = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tag || !type) {
      alert("Tag and Type are required");
      return;
    }

    await createAsset({
      tag,
      type,
      brand,
      model,
      status: "IN_STOCK",
      assignedTo: null,
      purchaseDate: new Date().toISOString().slice(0, 10),
    });

    setTag("");
    setType("");
    setBrand("");
    setModel("");
    setShowForm(false);
  };

  const startEditing = (assetId: string) => {
    const asset = data?.find((a) => a.id === assetId);
    if (!asset) return;

    setEditingId(asset.id);
    setEditBrand(asset.brand || "");
    setEditModel(asset.model || "");
    setEditStatus(asset.status);
    setEditAssignedTo(asset.assignedTo || "");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditBrand("");
    setEditModel("");
    setEditStatus("IN_STOCK");
    setEditAssignedTo("");
  };

  const saveEditing = async (id: string) => {
    await updateAsset({
      id,
      updates: {
        brand: editBrand || undefined,
        model: editModel || undefined,
        status: editStatus as any,
        assignedTo: editAssignedTo || null,
      },
    });
    cancelEditing();
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Are you sure you want to delete this asset?");
    if (!ok) return;

    await deleteAsset({ id });
  };

  return (
    <DashboardLayout title="Assets">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800">Assets</h2>
        <button
          className="px-3 py-2 rounded bg-slate-900 text-white text-sm hover:bg-slate-800"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "Cancel" : "+ Add Asset"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmitNew}
          className="mb-4 bg-white rounded-lg shadow p-4 grid gap-4 grid-cols-1 md:grid-cols-5 items-end"
        >
          <div>
            <label className="block text-xs mb-1 text-slate-600">Tag*</label>
            <input
              className="w-full border rounded px-2 py-1 text-sm"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="LAP-101"
              required
            />
          </div>

          <div>
            <label className="block text-xs mb-1 text-slate-600">Type*</label>
            <input
              className="w-full border rounded px-2 py-1 text-sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Laptop"
              required
            />
          </div>

          <div>
            <label className="block text-xs mb-1 text-slate-600">Brand</label>
            <input
              className="w-full border rounded px-2 py-1 text-sm"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Dell"
            />
          </div>

          <div>
            <label className="block text-xs mb-1 text-slate-600">Model</label>
            <input
              className="w-full border rounded px-2 py-1 text-sm"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Latitude 3440"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={creating}
              className="w-full px-3 py-2 rounded bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500 disabled:bg-slate-400"
            >
              {creating ? "Saving..." : "Save Asset"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading && (
          <p className="p-4 text-sm text-slate-500">Loading assets…</p>
        )}

        {isError && (
          <p className="p-4 text-sm text-red-600">
            Failed to load assets. Please try again.
          </p>
        )}

        {!isLoading && !isError && (
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-2 text-left">Tag</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Brand / Model</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Assigned To</th>
                <th className="px-4 py-2 text-left">Purchase Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((asset) => {
                  const isEditing = editingId === asset.id;

                  return (
                    <tr key={asset.id} className="border-t">
                      <td className="px-4 py-2 font-mono text-xs">
                        {asset.tag}
                      </td>
                      <td className="px-4 py-2">{asset.type}</td>
                      <td className="px-4 py-2">
                        {isEditing ? (
                          <div className="flex gap-2">
                            <input
                              className="border rounded px-2 py-1 text-xs w-24"
                              value={editBrand}
                              onChange={(e) => setEditBrand(e.target.value)}
                              placeholder="Brand"
                            />
                            <input
                              className="border rounded px-2 py-1 text-xs w-28"
                              value={editModel}
                              onChange={(e) => setEditModel(e.target.value)}
                              placeholder="Model"
                            />
                          </div>
                        ) : (
                          [asset.brand, asset.model]
                            .filter(Boolean)
                            .join(" ") || (
                            <span className="text-slate-400">—</span>
                          )
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {isEditing ? (
                          <select
                            className="border rounded px-2 py-1 text-xs"
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                          >
                            <option value="IN_STOCK">IN_STOCK</option>
                            <option value="ASSIGNED">ASSIGNED</option>
                            <option value="MAINTENANCE">MAINTENANCE</option>
                            <option value="RETIRED">RETIRED</option>
                          </select>
                        ) : (
                          asset.status
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {isEditing ? (
                          <input
                            className="border rounded px-2 py-1 text-xs"
                            value={editAssignedTo}
                            onChange={(e) =>
                              setEditAssignedTo(e.target.value)
                            }
                            placeholder="Assigned To"
                          />
                        ) : asset.assignedTo ? (
                          asset.assignedTo
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-xs text-slate-500">
                        {asset.purchaseDate || (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-xs">
                        {isEditing ? (
                          <div className="flex gap-2">
                            <button
                              className="px-2 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-500 disabled:bg-slate-400"
                              onClick={() => saveEditing(asset.id)}
                              disabled={updating}
                            >
                              Save
                            </button>
                            <button
                              className="px-2 py-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
                              onClick={cancelEditing}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              className="px-2 py-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
                              onClick={() => startEditing(asset.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-500 disabled:bg-red-300"
                              onClick={() => handleDelete(asset.id)}
                              disabled={deleting}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="border-t">
                  <td
                    className="px-4 py-4 text-sm text-slate-500"
                    colSpan={7}
                  >
                    No assets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        You can now create, edit, and delete assets using the API:
        <code> /api/assets </code>.
      </p>
    </DashboardLayout>
  );
};
