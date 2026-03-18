"use client";

import StatusBadge from "@/components/StatusBadge";
import ChartCard from "@/components/ChartCard";
import { Rocket, Calendar, MapPin, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const deployments = [
  {
    id: "DEP-2026-042",
    name: "iOS 18.4 Rollout — West Region",
    type: "OS Update",
    stores: 42,
    devices: 2840,
    progress: 78,
    status: "online" as const,
    startDate: "Mar 10, 2026",
    eta: "Mar 22, 2026",
  },
  {
    id: "DEP-2026-041",
    name: "POS Terminal Refresh — Phase 2",
    type: "Hardware",
    stores: 15,
    devices: 180,
    progress: 45,
    status: "online" as const,
    startDate: "Mar 5, 2026",
    eta: "Apr 2, 2026",
  },
  {
    id: "DEP-2026-040",
    name: "RetailConnect v4.2 — All Stores",
    type: "App Update",
    stores: 160,
    devices: 9520,
    progress: 92,
    status: "warning" as const,
    startDate: "Mar 1, 2026",
    eta: "Mar 19, 2026",
  },
  {
    id: "DEP-2026-039",
    name: "Network Config Update — Chicago District",
    type: "Configuration",
    stores: 8,
    devices: 432,
    progress: 100,
    status: "online" as const,
    startDate: "Feb 25, 2026",
    eta: "Mar 1, 2026",
  },
  {
    id: "DEP-2026-038",
    name: "iPad Kiosk Mode — New York Flagship",
    type: "Configuration",
    stores: 1,
    devices: 24,
    progress: 100,
    status: "online" as const,
    startDate: "Feb 20, 2026",
    eta: "Feb 22, 2026",
  },
];

export default function DeploymentsPage() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Active Deployments", value: "3", icon: <Rocket size={16} />, color: "#007aff" },
          { label: "Completed This Month", value: "5", icon: <CheckCircle size={16} />, color: "#34c759" },
          { label: "Devices In Progress", value: "3,452", icon: <Clock size={16} />, color: "#ff9500" },
          { label: "Failed / Paused", value: "2", icon: <AlertTriangle size={16} />, color: "#ff3b30" },
        ].map((card) => (
          <div key={card.label} className="card p-5">
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color: card.color }}>{card.icon}</span>
              <span className="text-[13px] text-text-secondary">{card.label}</span>
            </div>
            <p className="text-[24px] font-semibold text-text-primary">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Deployment List */}
      <ChartCard title="Deployment Pipeline" subtitle="Active and recent deployments">
        <div className="space-y-3">
          {deployments.map((dep) => (
            <div key={dep.id} className="p-4 rounded-hig bg-surface-secondary hover:bg-black/[0.04] transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono text-text-tertiary">{dep.id}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">{dep.type}</span>
                  </div>
                  <h4 className="text-[14px] font-semibold text-text-primary">{dep.name}</h4>
                </div>
                <StatusBadge status={dep.status} label={dep.progress === 100 ? "Complete" : dep.progress > 0 ? "In Progress" : "Pending"} />
              </div>

              <div className="flex items-center gap-6 text-[12px] text-text-secondary mb-3">
                <span className="flex items-center gap-1"><MapPin size={12} /> {dep.stores} stores</span>
                <span className="flex items-center gap-1"><Rocket size={12} /> {dep.devices.toLocaleString()} devices</span>
                <span className="flex items-center gap-1"><Calendar size={12} /> {dep.startDate} → {dep.eta}</span>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${dep.progress}%`,
                      backgroundColor: dep.progress === 100 ? "#34c759" : dep.status === "warning" ? "#ff9500" : "#007aff",
                    }}
                  />
                </div>
                <span className="text-[12px] font-medium text-text-primary w-10 text-right">{dep.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
