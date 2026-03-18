"use client";

import StatusBadge from "@/components/StatusBadge";
import { Shield, Lock, Wifi, AppWindow, Eye, Globe, Plus, Search, Settings } from "lucide-react";

const policies = [
  {
    name: "Retail Device Security",
    type: "Security",
    icon: <Shield size={18} />,
    color: "#34c759",
    devices: 9520,
    compliance: 94.2,
    status: "online" as const,
    settings: ["Passcode Required (6-digit)", "Auto-Lock 2 min", "Encryption Enabled", "Touch ID / Face ID Required"],
  },
  {
    name: "POS Kiosk Lock",
    type: "Restriction",
    icon: <Lock size={18} />,
    color: "#007aff",
    devices: 3100,
    compliance: 99.1,
    status: "online" as const,
    settings: ["Single App Mode", "Disable Safari", "Disable App Store", "Guided Access Enabled"],
  },
  {
    name: "Corporate WiFi Config",
    type: "Network",
    icon: <Wifi size={18} />,
    color: "#5ac8fa",
    devices: 9520,
    compliance: 97.8,
    status: "online" as const,
    settings: ["WPA3 Enterprise", "802.1X Authentication", "Certificate-Based Auth", "Auto-Join Enabled"],
  },
  {
    name: "Managed App Distribution",
    type: "App Management",
    icon: <AppWindow size={18} />,
    color: "#ff9500",
    devices: 7300,
    compliance: 91.5,
    status: "warning" as const,
    settings: ["VPP Auto-Install", "Managed Open-In", "Per-App VPN", "App Data Backup Disabled"],
  },
  {
    name: "Content Filtering",
    type: "Content",
    icon: <Eye size={18} />,
    color: "#af52de",
    devices: 9520,
    compliance: 100,
    status: "online" as const,
    settings: ["Adult Content Blocked", "Custom URL Allowlist", "SafeSearch Enforced"],
  },
  {
    name: "Web Clip — Store Portal",
    type: "Web Clip",
    icon: <Globe size={18} />,
    color: "#ff6b35",
    devices: 4200,
    compliance: 98.5,
    status: "online" as const,
    settings: ["Home Screen Icon", "Full-Screen Mode", "Non-Removable"],
  },
];

export default function PoliciesPage() {
  return (
    <div className="space-y-4">
      {/* Top Bar */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-border flex-1 max-w-sm">
          <Search size={14} className="text-text-tertiary" />
          <input type="text" placeholder="Search policies..." className="bg-transparent outline-none text-[13px] w-full" />
        </div>
        <div className="flex-1" />
        <button className="flex items-center gap-2 px-3 py-2 bg-accent text-white rounded-lg text-[13px] font-medium">
          <Plus size={14} /> Create Policy
        </button>
      </div>

      {/* Policy Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {policies.map((policy) => (
          <div key={policy.name} className="card p-5 hover:shadow-hig-lg transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-hig flex items-center justify-center" style={{ backgroundColor: policy.color + "15" }}>
                  <span style={{ color: policy.color }}>{policy.icon}</span>
                </div>
                <div>
                  <h4 className="text-[14px] font-semibold text-text-primary">{policy.name}</h4>
                  <p className="text-[12px] text-text-secondary">{policy.type}</p>
                </div>
              </div>
              <StatusBadge status={policy.status} label="Active" />
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mb-4">
              <div>
                <p className="text-[11px] text-text-tertiary">Devices</p>
                <p className="text-[15px] font-semibold text-text-primary">{policy.devices.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[11px] text-text-tertiary">Compliance</p>
                <p className={`text-[15px] font-semibold ${policy.compliance >= 95 ? "text-success" : policy.compliance >= 90 ? "text-warning" : "text-danger"}`}>
                  {policy.compliance}%
                </p>
              </div>
            </div>

            {/* Settings Preview */}
            <div className="space-y-1.5">
              {policy.settings.map((setting) => (
                <div key={setting} className="flex items-center gap-2 text-[12px] text-text-secondary">
                  <Settings size={10} className="text-text-tertiary" />
                  {setting}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
