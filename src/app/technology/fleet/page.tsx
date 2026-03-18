"use client";

import DataTable from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import MetricCard from "@/components/MetricCard";
import { Search, Filter, Smartphone, Tablet, Laptop, Download } from "lucide-react";

const devices = [
  { serial: "F2LXK4H8HG", model: "iPhone 15 Pro", os: "iOS 18.3", store: "#1247 — San Francisco", enrolled: "2024-01-15", status: "online" as const, battery: 94, storage: 72 },
  { serial: "DLXQ92MF7N", model: "iPad Pro 12.9\"", os: "iPadOS 18.3", store: "#1247 — San Francisco", enrolled: "2023-08-22", status: "online" as const, battery: 87, storage: 45 },
  { serial: "C02ZW1KVMD6", model: "MacBook Air M3", os: "macOS 15.3", store: "#892 — Chicago", enrolled: "2024-06-10", status: "warning" as const, battery: 62, storage: 88 },
  { serial: "F2LXH9P2KQ", model: "iPhone 14", os: "iOS 17.6", store: "#2103 — Miami", enrolled: "2022-11-05", status: "offline" as const, battery: 78, storage: 91 },
  { serial: "DMPD3KQFVN", model: "iPad Air M2", os: "iPadOS 18.3", store: "#445 — Seattle", enrolled: "2024-03-18", status: "online" as const, battery: 95, storage: 38 },
  { serial: "FVFYJ0A1Q6", model: "Apple TV 4K", os: "tvOS 18.3", store: "#1890 — New York", enrolled: "2024-09-01", status: "online" as const, battery: 100, storage: 22 },
  { serial: "C02FC4Y9MD6", model: "Mac mini M4", os: "macOS 15.3", store: "#3301 — Boston", enrolled: "2025-01-12", status: "online" as const, battery: 100, storage: 55 },
  { serial: "F2LYQR8JKM", model: "iPhone 16 Pro", os: "iOS 18.3", store: "#760 — Los Angeles", enrolled: "2025-02-28", status: "online" as const, battery: 100, storage: 18 },
];

type DeviceRow = typeof devices[number];

const columns = [
  {
    key: "model",
    label: "Device",
    render: (row: DeviceRow) => {
      const Icon = row.model.includes("iPhone") ? Smartphone : row.model.includes("iPad") ? Tablet : Laptop;
      return (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-surface-secondary flex items-center justify-center">
            <Icon size={14} className="text-text-tertiary" />
          </div>
          <div>
            <p className="font-medium text-text-primary text-[13px]">{row.model}</p>
            <p className="text-[11px] text-text-tertiary">{row.serial}</p>
          </div>
        </div>
      );
    },
  },
  { key: "os", label: "OS Version" },
  { key: "store", label: "Store" },
  {
    key: "battery",
    label: "Battery",
    render: (row: DeviceRow) => (
      <div className="flex items-center gap-2">
        <div className="w-12 h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${row.battery}%`,
              backgroundColor: row.battery > 80 ? "#34c759" : row.battery > 50 ? "#ff9500" : "#ff3b30",
            }}
          />
        </div>
        <span className="text-[12px] text-text-secondary">{row.battery}%</span>
      </div>
    ),
  },
  {
    key: "storage",
    label: "Storage Used",
    render: (row: DeviceRow) => (
      <span className={`text-[13px] ${row.storage > 80 ? "text-warning font-medium" : "text-text-secondary"}`}>
        {row.storage}%
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row: DeviceRow) => <StatusBadge status={row.status} />,
  },
];

export default function FleetPage() {
  return (
    <div className="space-y-4">
      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard title="Total Managed" value="9,520" color="#007aff" />
        <MetricCard title="Online" value="9,248" color="#34c759" />
        <MetricCard title="Warning" value="184" color="#ff9500" />
        <MetricCard title="Offline" value="88" color="#ff3b30" />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-border flex-1 max-w-sm">
          <Search size={14} className="text-text-tertiary" />
          <input
            type="text"
            placeholder="Search by serial, model, or store..."
            className="bg-transparent outline-none text-[13px] text-text-primary placeholder:text-text-tertiary w-full"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-border text-[13px] text-text-secondary hover:bg-surface-secondary transition-colors">
          <Filter size={14} />
          Device Type
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-border text-[13px] text-text-secondary hover:bg-surface-secondary transition-colors">
          <Filter size={14} />
          Status
        </button>
        <div className="flex-1" />
        <button className="flex items-center gap-2 px-3 py-2 bg-accent text-white rounded-lg text-[13px] font-medium hover:bg-accent-hover transition-colors">
          <Download size={14} />
          Export
        </button>
      </div>

      <DataTable columns={columns} data={devices} />
    </div>
  );
}
