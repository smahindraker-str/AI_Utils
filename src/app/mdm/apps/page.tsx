"use client";

import StatusBadge from "@/components/StatusBadge";
import { Search, Filter, Plus, RefreshCw } from "lucide-react";

const apps = [
  { name: "RetailConnect", version: "4.2.1", category: "Business", devices: 9520, installed: 9480, updating: 40, icon: "RC", color: "#007aff", mandatory: true, size: "42 MB" },
  { name: "InventoryPro", version: "3.8.0", category: "Productivity", devices: 7300, installed: 7300, updating: 0, icon: "IP", color: "#34c759", mandatory: true, size: "28 MB" },
  { name: "StoreComms", version: "2.1.5", category: "Communication", devices: 4200, installed: 4180, updating: 20, icon: "SC", color: "#ff9500", mandatory: true, size: "35 MB" },
  { name: "TrainingHub", version: "1.9.2", category: "Education", devices: 4200, installed: 3800, updating: 0, icon: "TH", color: "#af52de", mandatory: false, size: "85 MB" },
  { name: "ScheduleView", version: "5.0.3", category: "Productivity", devices: 4200, installed: 4200, updating: 0, icon: "SV", color: "#5ac8fa", mandatory: true, size: "18 MB" },
  { name: "PaymentTerminal", version: "6.1.0", category: "Finance", devices: 3100, installed: 3100, updating: 0, icon: "PT", color: "#ff3b30", mandatory: true, size: "52 MB" },
  { name: "CustomerLookup", version: "2.4.1", category: "CRM", devices: 4200, installed: 4190, updating: 10, icon: "CL", color: "#ff6b35", mandatory: false, size: "22 MB" },
  { name: "Apple Configurator", version: "2.17", category: "Utility", devices: 1800, installed: 1800, updating: 0, icon: "AC", color: "#6e6e73", mandatory: false, size: "64 MB" },
];

export default function AppsPage() {
  return (
    <div className="space-y-4">
      {/* Top Bar */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-border flex-1 max-w-sm">
          <Search size={14} className="text-text-tertiary" />
          <input type="text" placeholder="Search apps..." className="bg-transparent outline-none text-[13px] w-full" />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-border text-[13px] text-text-secondary">
          <Filter size={14} /> Category
        </button>
        <div className="flex-1" />
        <button className="flex items-center gap-2 px-3 py-2 bg-accent text-white rounded-lg text-[13px] font-medium">
          <Plus size={14} /> Add App
        </button>
      </div>

      {/* App Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {apps.map((app) => {
          const installRate = Math.round((app.installed / app.devices) * 100);
          return (
            <div key={app.name} className="card p-5 hover:shadow-hig-lg transition-shadow cursor-pointer">
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-hig-lg flex items-center justify-center text-white font-bold text-[14px] shrink-0"
                  style={{ backgroundColor: app.color }}
                >
                  {app.icon}
                </div>
                <div className="min-w-0">
                  <h4 className="text-[14px] font-semibold text-text-primary truncate">{app.name}</h4>
                  <p className="text-[12px] text-text-secondary">v{app.version}</p>
                  <p className="text-[11px] text-text-tertiary">{app.category} — {app.size}</p>
                </div>
              </div>

              {/* Install Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-text-secondary">Installation</span>
                  <span className="text-[11px] font-medium text-text-primary">{installRate}%</span>
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${installRate}%`, backgroundColor: app.color }} />
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-text-secondary">{app.installed.toLocaleString()} / {app.devices.toLocaleString()}</span>
                {app.updating > 0 ? (
                  <span className="flex items-center gap-1 text-warning">
                    <RefreshCw size={10} /> {app.updating} updating
                  </span>
                ) : (
                  <StatusBadge status="online" label="Up to date" />
                )}
              </div>

              {/* Tags */}
              <div className="flex gap-1.5 mt-3">
                {app.mandatory && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-medium">Mandatory</span>
                )}
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-secondary text-text-tertiary">VPP</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
