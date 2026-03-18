"use client";

import DataTable from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import { Search, Filter, Plus, Smartphone, Tablet, Laptop, Shield, CheckCircle, XCircle } from "lucide-react";

const devices = [
  { serial: "F2LXK4H8HG", model: "iPhone 15 Pro", user: "Store Associate", store: "#1247", mdmStatus: "online" as const, supervised: true, compliance: "compliant", lastSeen: "Just now", profiles: 8 },
  { serial: "DLXQ92MF7N", model: "iPad Pro 12.9\"", user: "POS Kiosk", store: "#1247", mdmStatus: "online" as const, supervised: true, compliance: "compliant", lastSeen: "2 min ago", profiles: 12 },
  { serial: "C02ZW1KVMD6", model: "MacBook Air M3", user: "Store Manager", store: "#892", mdmStatus: "warning" as const, supervised: true, compliance: "partial", lastSeen: "15 min ago", profiles: 6 },
  { serial: "F2LXH9P2KQ", model: "iPhone 14", user: "Floor Associate", store: "#2103", mdmStatus: "offline" as const, supervised: true, compliance: "non-compliant", lastSeen: "3 hrs ago", profiles: 8 },
  { serial: "DMPD3KQFVN", model: "iPad Air M2", user: "Inventory Scanner", store: "#445", mdmStatus: "online" as const, supervised: true, compliance: "compliant", lastSeen: "Just now", profiles: 10 },
  { serial: "FVFYJ0A1Q6", model: "Apple TV 4K", user: "Signage Display", store: "#1890", mdmStatus: "online" as const, supervised: true, compliance: "compliant", lastSeen: "5 min ago", profiles: 4 },
  { serial: "C02FC4Y9MD6", model: "Mac mini M4", user: "Back Office", store: "#3301", mdmStatus: "online" as const, supervised: false, compliance: "partial", lastSeen: "1 hr ago", profiles: 5 },
  { serial: "F2LYQR8JKM", model: "iPhone 16 Pro", user: "District Manager", store: "#760", mdmStatus: "online" as const, supervised: true, compliance: "compliant", lastSeen: "Just now", profiles: 9 },
];

type DevRow = typeof devices[number];

const complianceColors: Record<string, { label: string; color: string; bg: string }> = {
  compliant: { label: "Compliant", color: "#34c759", bg: "#34c75915" },
  partial: { label: "Partial", color: "#ff9500", bg: "#ff950015" },
  "non-compliant": { label: "Non-Compliant", color: "#ff3b30", bg: "#ff3b3015" },
};

const columns = [
  {
    key: "model",
    label: "Device",
    render: (row: DevRow) => {
      const Icon = row.model.includes("iPhone") ? Smartphone : row.model.includes("iPad") ? Tablet : Laptop;
      return (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-surface-secondary flex items-center justify-center">
            <Icon size={14} className="text-text-tertiary" />
          </div>
          <div>
            <p className="font-medium text-[13px]">{row.model}</p>
            <p className="text-[11px] text-text-tertiary">{row.serial}</p>
          </div>
        </div>
      );
    },
  },
  { key: "user", label: "Assigned To" },
  { key: "store", label: "Store" },
  {
    key: "supervised",
    label: "Supervised",
    render: (row: DevRow) => row.supervised
      ? <CheckCircle size={16} className="text-success" />
      : <XCircle size={16} className="text-text-tertiary" />,
  },
  {
    key: "compliance",
    label: "Compliance",
    render: (row: DevRow) => {
      const c = complianceColors[row.compliance];
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-medium" style={{ backgroundColor: c.bg, color: c.color }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />
          {c.label}
        </span>
      );
    },
  },
  { key: "profiles", label: "Profiles" },
  {
    key: "mdmStatus",
    label: "MDM Status",
    render: (row: DevRow) => <StatusBadge status={row.mdmStatus} />,
  },
  { key: "lastSeen", label: "Last Seen" },
];

export default function MDMDevicesPage() {
  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-border flex-1 max-w-sm">
          <Search size={14} className="text-text-tertiary" />
          <input type="text" placeholder="Search devices..." className="bg-transparent outline-none text-[13px] w-full" />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-border text-[13px] text-text-secondary">
          <Filter size={14} /> Compliance
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-border text-[13px] text-text-secondary">
          <Shield size={14} /> Supervised
        </button>
        <div className="flex-1" />
        <button className="flex items-center gap-2 px-3 py-2 bg-accent text-white rounded-lg text-[13px] font-medium">
          <Plus size={14} /> Enroll Device
        </button>
      </div>

      <DataTable columns={columns} data={devices} />
    </div>
  );
}
