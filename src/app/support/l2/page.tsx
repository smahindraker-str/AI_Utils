"use client";

import MetricCard from "@/components/MetricCard";
import StatusBadge from "@/components/StatusBadge";
import { ArrowUpCircle, Clock, Wrench, Terminal, Search, Smartphone, User, FileText, Activity, Download } from "lucide-react";

const escalatedTickets = [
  {
    id: "TKT-8835",
    subject: "Persistent WiFi disconnections — Store #1247",
    escalatedFrom: "L1 — Alex M.",
    escalatedAt: "45 min ago",
    priority: "high",
    category: "Network",
    device: "iPhone 15 Pro — F2LXK4H8HG",
    store: "#1247 — San Francisco",
    notes: "L1 attempted WiFi reset, cleared network settings. Issue persists across multiple devices in same zone. Possible AP issue.",
    diagnostics: { sysdiagnose: true, logs: true, networkCapture: false },
  },
  {
    id: "TKT-8830",
    subject: "MDM profile failing to install on new devices",
    escalatedFrom: "L1 — Jamie R.",
    escalatedAt: "2 hrs ago",
    priority: "high",
    category: "MDM",
    device: "iPad Air M2 — DMPD3KQFVN",
    store: "#445 — Seattle",
    notes: "Enrollment completes but configuration profile install fails with error -402. Checked MDM server connectivity, appears normal.",
    diagnostics: { sysdiagnose: false, logs: true, networkCapture: false },
  },
  {
    id: "TKT-8825",
    subject: "RetailConnect crashes during inventory sync",
    escalatedFrom: "L1 — Sam K.",
    escalatedAt: "4 hrs ago",
    priority: "medium",
    category: "Application",
    device: "iPhone 14 — F2LXH9P2KQ",
    store: "#2103 — Miami",
    notes: "App crashes consistently when syncing inventory > 500 items. Force quit and reinstall did not resolve. Crash logs collected.",
    diagnostics: { sysdiagnose: true, logs: true, networkCapture: false },
  },
  {
    id: "TKT-8818",
    subject: "Mac mini kernel panic on boot — recurring",
    escalatedFrom: "L1 — Pat D.",
    escalatedAt: "6 hrs ago",
    priority: "critical",
    category: "Hardware",
    device: "Mac mini M4 — C02FC4Y9MD6",
    store: "#3301 — Boston",
    notes: "Kernel panic occurs during boot, safe mode works. Suspect third-party kext conflict. Need sysdiagnose and kernel logs.",
    diagnostics: { sysdiagnose: false, logs: false, networkCapture: false },
  },
];

const priorityConfig: Record<string, { color: string; bg: string }> = {
  critical: { color: "#ff3b30", bg: "#ff3b3015" },
  high: { color: "#ff9500", bg: "#ff950015" },
  medium: { color: "#007aff", bg: "#007aff15" },
  low: { color: "#6e6e73", bg: "#6e6e7315" },
};

export default function L2SupportPage() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Escalated Queue"
          value="8"
          icon={<ArrowUpCircle size={16} className="text-orange-500" />}
          color="#ff9500"
        />
        <MetricCard
          title="Avg Resolution"
          value="38 min"
          change={-22}
          changeLabel="vs last week"
          icon={<Clock size={16} className="text-blue-500" />}
          color="#007aff"
        />
        <MetricCard
          title="Diagnostics Run"
          value="14"
          subtitle="Today"
          icon={<Wrench size={16} className="text-purple-500" />}
          color="#af52de"
        />
        <MetricCard
          title="Escalated to L3"
          value="1"
          subtitle="Today"
          icon={<Terminal size={16} className="text-red-500" />}
          color="#ff3b30"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Ticket List */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-border">
            <Search size={14} className="text-text-tertiary" />
            <input type="text" placeholder="Search escalated tickets..." className="bg-transparent outline-none text-[13px] w-full" />
          </div>

          {escalatedTickets.map((ticket) => {
            const priority = priorityConfig[ticket.priority];
            return (
              <div key={ticket.id} className="card p-5 hover:shadow-hig-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-text-tertiary">{ticket.id}</span>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize" style={{ backgroundColor: priority.bg, color: priority.color }}>
                      {ticket.priority}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-secondary text-text-tertiary">{ticket.category}</span>
                  </div>
                  <span className="text-[11px] text-text-tertiary">{ticket.escalatedAt}</span>
                </div>

                <h4 className="text-[14px] font-semibold text-text-primary mb-2">{ticket.subject}</h4>

                <div className="flex items-center gap-4 text-[12px] text-text-secondary mb-3">
                  <span className="flex items-center gap-1"><User size={11} /> {ticket.escalatedFrom}</span>
                  <span className="flex items-center gap-1"><Smartphone size={11} /> {ticket.device}</span>
                  <span>{ticket.store}</span>
                </div>

                {/* L1 Notes */}
                <div className="p-3 bg-surface-secondary rounded-hig mb-3">
                  <p className="text-[11px] font-semibold text-text-tertiary mb-1">L1 Notes:</p>
                  <p className="text-[12px] text-text-secondary leading-relaxed">{ticket.notes}</p>
                </div>

                {/* Diagnostic Status & Actions */}
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    {[
                      { label: "Sysdiagnose", done: ticket.diagnostics.sysdiagnose },
                      { label: "Logs", done: ticket.diagnostics.logs },
                      { label: "Network", done: ticket.diagnostics.networkCapture },
                    ].map((d) => (
                      <span
                        key={d.label}
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          d.done ? "bg-green-500/10 text-green-600" : "bg-surface-secondary text-text-tertiary"
                        }`}
                      >
                        {d.label} {d.done ? "\u2713" : "\u2014"}
                      </span>
                    ))}
                  </div>
                  <div className="flex-1" />
                  <button className="text-[12px] px-3 py-1.5 bg-accent text-white rounded-lg font-medium">
                    Run Diagnostics
                  </button>
                  <button className="text-[12px] px-3 py-1.5 bg-surface-secondary rounded-lg text-text-secondary">
                    Escalate to L3
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Diagnostic Tools Panel */}
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="text-[15px] font-semibold text-text-primary mb-4">Diagnostic Tools</h3>
            <div className="space-y-2">
              {[
                { label: "Run Sysdiagnose", desc: "Capture full system diagnostic bundle", icon: <Terminal size={16} />, color: "#007aff" },
                { label: "Collect Logs", desc: "Retrieve device and app logs", icon: <FileText size={16} />, color: "#34c759" },
                { label: "Network Capture", desc: "Start packet capture on device", icon: <Activity size={16} />, color: "#ff9500" },
                { label: "Export Bundle", desc: "Download diagnostic archive", icon: <Download size={16} />, color: "#af52de" },
              ].map((tool) => (
                <button
                  key={tool.label}
                  className="w-full flex items-center gap-3 p-3 rounded-hig bg-surface-secondary hover:bg-black/[0.06] transition-colors text-left"
                >
                  <span style={{ color: tool.color }}>{tool.icon}</span>
                  <div>
                    <p className="text-[13px] font-medium text-text-primary">{tool.label}</p>
                    <p className="text-[11px] text-text-tertiary">{tool.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="text-[15px] font-semibold text-text-primary mb-3">Device Inspector</h3>
            <div className="flex gap-2 mb-3">
              <input type="text" placeholder="Serial number..." className="flex-1 px-3 py-2 bg-surface-secondary rounded-lg text-[13px] outline-none border border-border" />
              <button className="px-3 py-2 bg-accent text-white rounded-lg text-[13px]">Inspect</button>
            </div>
            <div className="space-y-2 text-[12px]">
              <div className="flex justify-between p-2 bg-surface-secondary rounded">
                <span className="text-text-tertiary">Last Sysdiagnose</span>
                <span className="text-text-primary">2 hrs ago</span>
              </div>
              <div className="flex justify-between p-2 bg-surface-secondary rounded">
                <span className="text-text-tertiary">MDM Status</span>
                <StatusBadge status="online" />
              </div>
              <div className="flex justify-between p-2 bg-surface-secondary rounded">
                <span className="text-text-tertiary">Compliance</span>
                <span className="text-success font-medium">Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
