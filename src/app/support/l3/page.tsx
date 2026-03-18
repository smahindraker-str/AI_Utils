"use client";

import MetricCard from "@/components/MetricCard";
import StatusBadge from "@/components/StatusBadge";
import {
  GitBranch, Database, Server, Shield, Clock, FileCode, Network, Bug, Cpu,
  BookOpen, PenTool, Send, CheckCircle, Lightbulb,
} from "lucide-react";

const engineeringTickets = [
  {
    id: "ENG-0147",
    subject: "Recurring kernel panic across M4 Mac minis — multiple stores",
    severity: "P1",
    status: "investigating" as const,
    assignee: "Dr. Chen",
    age: "6 hrs",
    rootCause: "Suspected kext conflict with third-party payment driver (PayDriver.kext v2.1.4)",
    affectedDevices: 12,
    affectedStores: 4,
    timeline: [
      { time: "6 hrs ago", event: "Escalated from L2 — kernel panic on boot" },
      { time: "5 hrs ago", event: "Collected sysdiagnose from 3 affected devices" },
      { time: "4 hrs ago", event: "Identified PayDriver.kext in crash logs" },
      { time: "2 hrs ago", event: "Reproduced in lab environment" },
      { time: "1 hr ago", event: "Contacted vendor — awaiting updated kext" },
    ],
  },
  {
    id: "ENG-0146",
    subject: "MDM profile error -402 affecting new device enrollments",
    severity: "P2",
    status: "root-cause-found" as const,
    assignee: "Sarah L.",
    age: "1 day",
    rootCause: "SCEP certificate renewal expired — MDM server cert chain incomplete",
    affectedDevices: 28,
    affectedStores: 6,
    timeline: [
      { time: "1 day ago", event: "Escalated from L2 — enrollment failures" },
      { time: "22 hrs ago", event: "Analyzed MDM server logs" },
      { time: "18 hrs ago", event: "Identified expired SCEP cert" },
      { time: "12 hrs ago", event: "Renewed certificate chain" },
      { time: "6 hrs ago", event: "Deploying fix — 60% of devices re-enrolled" },
    ],
  },
  {
    id: "ENG-0145",
    subject: "Network micro-outages correlated with AP firmware 4.2.1",
    severity: "P2",
    status: "monitoring" as const,
    assignee: "Mike W.",
    age: "3 days",
    rootCause: "AP firmware 4.2.1 memory leak causing periodic restarts every ~18 hrs",
    affectedDevices: 340,
    affectedStores: 8,
    timeline: [
      { time: "3 days ago", event: "Pattern detected via monitoring — correlated AP restarts" },
      { time: "2 days ago", event: "Captured packet traces during outage windows" },
      { time: "1 day ago", event: "Confirmed firmware memory leak via AP diagnostics" },
      { time: "12 hrs ago", event: "Rolled back 2 stores to firmware 4.1.8 — stable" },
      { time: "6 hrs ago", event: "Scheduling fleet-wide AP firmware rollback" },
    ],
  },
];

const severityConfig: Record<string, { label: string; color: string; bg: string }> = {
  P1: { label: "P1 — Critical", color: "#ff3b30", bg: "#ff3b3015" },
  P2: { label: "P2 — High", color: "#ff9500", bg: "#ff950015" },
  P3: { label: "P3 — Medium", color: "#007aff", bg: "#007aff15" },
};

const statusLabels: Record<string, { label: string; status: "online" | "warning" | "offline" | "pending" | "maintenance" }> = {
  investigating: { label: "Investigating", status: "warning" },
  "root-cause-found": { label: "RCA Found", status: "online" },
  monitoring: { label: "Monitoring", status: "maintenance" },
};

const knowledgeContributions = [
  { title: "AP Firmware 4.2.1 Memory Leak — Workaround", author: "Mike W.", date: "Today", views: 12, type: "Known Issue" },
  { title: "SCEP Certificate Renewal Procedure", author: "Sarah L.", date: "Today", views: 8, type: "Runbook" },
  { title: "PayDriver.kext Compatibility Matrix", author: "Dr. Chen", date: "Today", views: 5, type: "Reference" },
  { title: "RetailConnect v4.2.1 Battery Drain — RCA", author: "Jordan S.", date: "Yesterday", views: 34, type: "Root Cause" },
];

export default function L3SupportPage() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Investigations"
          value="3"
          icon={<Bug size={16} className="text-red-500" />}
          color="#ff3b30"
        />
        <MetricCard
          title="Avg RCA Time"
          value="4.2 hrs"
          change={-18}
          changeLabel="vs last quarter"
          icon={<Clock size={16} className="text-blue-500" />}
          color="#007aff"
        />
        <MetricCard
          title="Infra Changes"
          value="2"
          subtitle="Pending deployment"
          icon={<Server size={16} className="text-purple-500" />}
          color="#af52de"
        />
        <MetricCard
          title="KB Articles"
          value="4"
          subtitle="Created / updated today"
          icon={<BookOpen size={16} className="text-green-500" />}
          color="#34c759"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Engineering Tickets */}
        <div className="lg:col-span-2 space-y-4">
          {engineeringTickets.map((ticket) => {
            const severity = severityConfig[ticket.severity];
            const statusInfo = statusLabels[ticket.status];
            return (
              <div key={ticket.id} className="card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono text-text-tertiary">{ticket.id}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: severity.bg, color: severity.color }}>
                        {severity.label}
                      </span>
                      <StatusBadge status={statusInfo.status} label={statusInfo.label} />
                    </div>
                    <h4 className="text-[15px] font-semibold text-text-primary">{ticket.subject}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-text-tertiary">Assigned to</p>
                    <p className="text-[12px] font-medium text-text-primary">{ticket.assignee}</p>
                  </div>
                </div>

                {/* Root Cause */}
                <div className="p-3 bg-surface-secondary rounded-hig mb-4">
                  <p className="text-[11px] font-semibold text-text-tertiary mb-1">Root Cause Analysis:</p>
                  <p className="text-[13px] text-text-primary leading-relaxed">{ticket.rootCause}</p>
                  <div className="flex items-center gap-4 mt-2 text-[12px] text-text-secondary">
                    <span>{ticket.affectedDevices} devices affected</span>
                    <span>{ticket.affectedStores} stores affected</span>
                    <span>Open for {ticket.age}</span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-0">
                  <p className="text-[11px] font-semibold text-text-tertiary mb-2">Investigation Timeline:</p>
                  {ticket.timeline.map((event, i) => (
                    <div key={i} className="flex items-start gap-3 relative">
                      <div className="flex flex-col items-center">
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${i === 0 ? "bg-accent" : "bg-border"}`} />
                        {i < ticket.timeline.length - 1 && <div className="w-px h-6 bg-border" />}
                      </div>
                      <div className="pb-2">
                        <span className="text-[11px] text-text-tertiary">{event.time}</span>
                        <p className="text-[12px] text-text-primary">{event.event}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-border mt-2">
                  <button className="flex items-center gap-1 text-[12px] px-3 py-1.5 bg-accent text-white rounded-lg font-medium">
                    <PenTool size={12} /> Update RCA
                  </button>
                  <button className="flex items-center gap-1 text-[12px] px-3 py-1.5 bg-surface-secondary rounded-lg text-text-secondary">
                    <BookOpen size={12} /> Publish to KB
                  </button>
                  {ticket.status === "root-cause-found" && (
                    <button className="flex items-center gap-1 text-[12px] px-3 py-1.5 bg-success text-white rounded-lg font-medium ml-auto">
                      <CheckCircle size={12} /> Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Engineering Tools */}
          <div className="card p-5">
            <h3 className="text-[15px] font-semibold text-text-primary mb-4">Engineering Tools</h3>
            <div className="space-y-2">
              {[
                { label: "Infrastructure Monitor", desc: "AP, switch, and server health", icon: <Network size={16} />, color: "#007aff" },
                { label: "Log Aggregator", desc: "Cross-device log correlation", icon: <FileCode size={16} />, color: "#34c759" },
                { label: "Config Audit", desc: "Compare configs vs baseline", icon: <GitBranch size={16} />, color: "#ff9500" },
                { label: "Security Scanner", desc: "Fleet vulnerability scan", icon: <Shield size={16} />, color: "#ff3b30" },
                { label: "Performance Profiler", desc: "CPU, memory, network profiling", icon: <Cpu size={16} />, color: "#af52de" },
                { label: "Change Management", desc: "Track and approve infra changes", icon: <Database size={16} />, color: "#5ac8fa" },
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

          {/* System Health */}
          <div className="card p-5">
            <h3 className="text-[15px] font-semibold text-text-primary mb-3">System Health</h3>
            <div className="space-y-2">
              {[
                { label: "MDM Server", status: "online" as const, latency: "12ms" },
                { label: "ABM Gateway", status: "online" as const, latency: "8ms" },
                { label: "SCEP Server", status: "warning" as const, latency: "145ms" },
                { label: "Syslog Collector", status: "online" as const, latency: "5ms" },
                { label: "AP Controller", status: "online" as const, latency: "22ms" },
              ].map((sys) => (
                <div key={sys.label} className="flex items-center justify-between p-2 bg-surface-secondary rounded-lg">
                  <span className="text-[12px] text-text-primary">{sys.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-text-tertiary">{sys.latency}</span>
                    <StatusBadge status={sys.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Knowledge Sharing — End of Day */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Lightbulb size={16} className="text-yellow-500" />
            <h3 className="text-[15px] font-semibold text-text-primary">Knowledge Sharing</h3>
            <span className="text-[12px] text-text-secondary ml-2">Continuous learning — every resolution improves future responses</span>
          </div>
          <button className="flex items-center gap-1 text-[12px] px-3 py-1.5 bg-accent text-white rounded-lg font-medium">
            <PenTool size={12} /> New Article
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {knowledgeContributions.map((article) => (
            <div key={article.title} className="flex items-start gap-3 p-3 rounded-hig bg-surface-secondary hover:bg-black/[0.04] transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center shrink-0">
                <BookOpen size={14} className="text-yellow-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-text-primary truncate">{article.title}</p>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-text-tertiary">
                  <span>{article.author}</span>
                  <span>{article.date}</span>
                  <span>{article.views} views</span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-medium">{article.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* End of Day Summary */}
      <div className="card p-5 border-l-4 border-l-accent">
        <div className="flex items-center gap-2 mb-3">
          <Send size={16} className="text-accent" />
          <h3 className="text-[15px] font-semibold text-text-primary">End of Day Summary</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-3 bg-surface-secondary rounded-hig">
            <p className="text-[11px] text-text-tertiary mb-1">Investigations</p>
            <p className="text-[15px] font-semibold text-text-primary">3 active, 1 resolved</p>
          </div>
          <div className="p-3 bg-surface-secondary rounded-hig">
            <p className="text-[11px] text-text-tertiary mb-1">KB Updates</p>
            <p className="text-[15px] font-semibold text-text-primary">4 articles published</p>
          </div>
          <div className="p-3 bg-surface-secondary rounded-hig">
            <p className="text-[11px] text-text-tertiary mb-1">Tomorrow&apos;s Priorities</p>
            <p className="text-[15px] font-semibold text-text-primary">AP rollback, SCEP monitoring</p>
          </div>
        </div>
        <button className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-accent text-white rounded-lg text-[13px] font-medium hover:bg-accent-hover transition-colors">
          <Send size={14} /> Generate & Share Daily Report
        </button>
      </div>
    </div>
  );
}
