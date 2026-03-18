"use client";

import DataTable from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import { MapPin, Search, Filter } from "lucide-react";

const stores = [
  { id: "1247", name: "San Francisco — Market St", region: "West", devices: 68, uptime: 97.2, status: "warning" as const, issues: 3 },
  { id: "892", name: "Chicago — Michigan Ave", region: "Central", devices: 54, uptime: 98.8, status: "warning" as const, issues: 1 },
  { id: "2103", name: "Miami — Brickell", region: "South", devices: 45, uptime: 95.1, status: "offline" as const, issues: 5 },
  { id: "445", name: "Seattle — University Village", region: "West", devices: 62, uptime: 99.9, status: "online" as const, issues: 0 },
  { id: "1890", name: "New York — Fifth Ave", region: "Northeast", devices: 88, uptime: 99.7, status: "online" as const, issues: 0 },
  { id: "3301", name: "Boston — Newbury St", region: "Northeast", devices: 41, uptime: 99.2, status: "online" as const, issues: 0 },
  { id: "1022", name: "Dallas — NorthPark", region: "South", devices: 52, uptime: 98.4, status: "online" as const, issues: 1 },
  { id: "760", name: "Los Angeles — The Grove", region: "West", devices: 71, uptime: 99.5, status: "online" as const, issues: 0 },
];

type StoreRow = typeof stores[number];

const columns = [
  {
    key: "name",
    label: "Store",
    render: (row: StoreRow) => (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-surface-secondary flex items-center justify-center">
          <MapPin size={14} className="text-text-tertiary" />
        </div>
        <div>
          <p className="font-medium text-text-primary">#{row.id}</p>
          <p className="text-[11px] text-text-secondary">{row.name}</p>
        </div>
      </div>
    ),
  },
  { key: "region", label: "Region" },
  { key: "devices", label: "Devices" },
  {
    key: "uptime",
    label: "Uptime",
    render: (row: StoreRow) => (
      <span className={row.uptime < 97 ? "text-danger font-medium" : row.uptime < 99 ? "text-warning" : "text-success"}>
        {row.uptime}%
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row: StoreRow) => <StatusBadge status={row.status} />,
  },
  {
    key: "issues",
    label: "Open Issues",
    render: (row: StoreRow) => (
      <span className={row.issues > 0 ? "text-warning font-medium" : "text-text-tertiary"}>
        {row.issues}
      </span>
    ),
  },
];

export default function StoresPage() {
  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-border flex-1 max-w-sm">
          <Search size={14} className="text-text-tertiary" />
          <input
            type="text"
            placeholder="Search stores..."
            className="bg-transparent outline-none text-[13px] text-text-primary placeholder:text-text-tertiary w-full"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-border text-[13px] text-text-secondary hover:bg-surface-secondary transition-colors">
          <Filter size={14} />
          Region
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-border text-[13px] text-text-secondary hover:bg-surface-secondary transition-colors">
          <Filter size={14} />
          Status
        </button>
      </div>

      <DataTable columns={columns} data={stores} />
    </div>
  );
}
