"use client";

import MetricCard from "@/components/MetricCard";
import { Inbox, Clock, CheckCircle, ArrowUpCircle, Search, Phone, MessageSquare, Smartphone, User } from "lucide-react";

const tickets = [
  {
    id: "TKT-8842",
    subject: "iPhone not connecting to WiFi",
    store: "#1247 — San Francisco",
    caller: "Maria G.",
    device: "iPhone 15 Pro",
    priority: "high",
    status: "open",
    age: "3 min",
    category: "Network",
  },
  {
    id: "TKT-8841",
    subject: "POS app crashing on checkout",
    store: "#892 — Chicago",
    caller: "James T.",
    device: "iPad Pro 12.9\"",
    priority: "critical",
    status: "open",
    age: "8 min",
    category: "Application",
  },
  {
    id: "TKT-8840",
    subject: "Can't log into RetailConnect",
    store: "#445 — Seattle",
    caller: "Sarah K.",
    device: "iPhone 16 Pro",
    priority: "medium",
    status: "in-progress",
    age: "22 min",
    category: "Authentication",
  },
  {
    id: "TKT-8839",
    subject: "Barcode scanner not responding",
    store: "#2103 — Miami",
    caller: "David R.",
    device: "iPad Air M2",
    priority: "medium",
    status: "open",
    age: "35 min",
    category: "Peripheral",
  },
  {
    id: "TKT-8838",
    subject: "New employee needs device setup",
    store: "#1890 — New York",
    caller: "Lisa M.",
    device: "iPhone 15",
    priority: "low",
    status: "open",
    age: "1 hr",
    category: "Provisioning",
  },
  {
    id: "TKT-8837",
    subject: "Apple TV not displaying signage",
    store: "#3301 — Boston",
    caller: "Mike P.",
    device: "Apple TV 4K",
    priority: "low",
    status: "in-progress",
    age: "1.5 hr",
    category: "Display",
  },
];

const priorityConfig: Record<string, { color: string; bg: string }> = {
  critical: { color: "#ff3b30", bg: "#ff3b3015" },
  high: { color: "#ff9500", bg: "#ff950015" },
  medium: { color: "#007aff", bg: "#007aff15" },
  low: { color: "#6e6e73", bg: "#6e6e7315" },
};

const guidedActions = [
  { label: "Restart Device", description: "Send remote restart command", icon: <Phone size={16} /> },
  { label: "Reset WiFi", description: "Clear network settings and reconnect", icon: <MessageSquare size={16} /> },
  { label: "Reinstall App", description: "Force reinstall managed application", icon: <Smartphone size={16} /> },
  { label: "Check Enrollment", description: "Verify MDM enrollment status", icon: <CheckCircle size={16} /> },
];

export default function L1SupportPage() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Open Tickets"
          value="12"
          icon={<Inbox size={16} className="text-blue-500" />}
          color="#007aff"
        />
        <MetricCard
          title="Avg Wait Time"
          value="4 min"
          change={-15}
          changeLabel="vs yesterday"
          icon={<Clock size={16} className="text-orange-500" />}
          color="#ff9500"
        />
        <MetricCard
          title="Resolved Today"
          value="34"
          change={12}
          changeLabel="vs yesterday"
          icon={<CheckCircle size={16} className="text-green-500" />}
          color="#34c759"
        />
        <MetricCard
          title="Escalated"
          value="3"
          subtitle="Sent to L2 today"
          icon={<ArrowUpCircle size={16} className="text-red-500" />}
          color="#ff3b30"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Ticket Queue */}
        <div className="lg:col-span-2 space-y-3">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-border">
            <Search size={14} className="text-text-tertiary" />
            <input type="text" placeholder="Search tickets..." className="bg-transparent outline-none text-[13px] w-full" />
          </div>

          {/* Tickets */}
          {tickets.map((ticket) => {
            const priority = priorityConfig[ticket.priority];
            return (
              <div key={ticket.id} className="card p-4 hover:shadow-hig-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-text-tertiary">{ticket.id}</span>
                    <span
                      className="text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize"
                      style={{ backgroundColor: priority.bg, color: priority.color }}
                    >
                      {ticket.priority}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-secondary text-text-tertiary">
                      {ticket.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-text-tertiary">{ticket.age}</span>
                </div>

                <h4 className="text-[14px] font-medium text-text-primary mb-2">{ticket.subject}</h4>

                <div className="flex items-center gap-4 text-[12px] text-text-secondary">
                  <span className="flex items-center gap-1"><User size={11} /> {ticket.caller}</span>
                  <span>{ticket.store}</span>
                  <span className="flex items-center gap-1"><Smartphone size={11} /> {ticket.device}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                  <button className="text-[12px] px-3 py-1.5 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors">
                    Take Ticket
                  </button>
                  <button className="text-[12px] px-3 py-1.5 bg-surface-secondary rounded-lg text-text-secondary hover:bg-black/[0.06] transition-colors">
                    View Device
                  </button>
                  <div className="flex-1" />
                  <button className="text-[12px] px-3 py-1.5 bg-surface-secondary rounded-lg text-warning font-medium hover:bg-black/[0.06] transition-colors">
                    Escalate to L2
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guided Troubleshooting Panel */}
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="text-[15px] font-semibold text-text-primary mb-1">Quick Device Lookup</h3>
            <p className="text-[12px] text-text-secondary mb-3">Enter serial number or asset tag</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Serial number..."
                className="flex-1 px-3 py-2 bg-surface-secondary rounded-lg text-[13px] outline-none border border-border focus:border-accent transition-colors"
              />
              <button className="px-3 py-2 bg-accent text-white rounded-lg text-[13px] font-medium">
                Lookup
              </button>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="text-[15px] font-semibold text-text-primary mb-4">Guided Actions</h3>
            <div className="space-y-2">
              {guidedActions.map((action) => (
                <button
                  key={action.label}
                  className="w-full flex items-center gap-3 p-3 rounded-hig bg-surface-secondary hover:bg-black/[0.06] transition-colors text-left"
                >
                  <span className="text-accent">{action.icon}</span>
                  <div>
                    <p className="text-[13px] font-medium text-text-primary">{action.label}</p>
                    <p className="text-[11px] text-text-tertiary">{action.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Knowledge Base Quick Links */}
          <div className="card p-5">
            <h3 className="text-[15px] font-semibold text-text-primary mb-3">Common Solutions</h3>
            <div className="space-y-2">
              {[
                "WiFi Connectivity Troubleshooting",
                "App Crash Recovery Steps",
                "Password Reset Procedure",
                "Bluetooth Pairing Guide",
                "Device Enrollment Walkthrough",
              ].map((article) => (
                <a key={article} href="#" className="block text-[13px] text-accent hover:underline py-1">
                  {article}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
