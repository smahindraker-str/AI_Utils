"use client";

import MetricCard from "@/components/MetricCard";
import {
  Inbox, Clock, CheckCircle, ArrowUpCircle, Search,
  Smartphone, User, Zap, ChevronRight, Award, TrendingUp,
} from "lucide-react";

const tickets = [
  {
    id: "TKT-8842",
    subject: "iPhone not connecting to WiFi",
    store: "#1247 — San Francisco",
    caller: "Maria G.",
    device: "iPhone 15 Pro",
    priority: "high",
    age: "3 min",
    category: "Network",
    aiSuggestion: {
      workflow: "WiFi Connectivity Troubleshooting",
      confidence: 94,
      steps: ["Verify WiFi is enabled in Settings", "Forget and rejoin network", "Reset Network Settings", "Check AP status for store zone"],
      estimatedTime: "6 min",
    },
  },
  {
    id: "TKT-8841",
    subject: "POS app crashing on checkout",
    store: "#892 — Chicago",
    caller: "James T.",
    device: "iPad Pro 12.9\"",
    priority: "critical",
    age: "8 min",
    category: "Application",
    aiSuggestion: {
      workflow: "App Crash Recovery",
      confidence: 87,
      steps: ["Force quit RetailConnect", "Clear app cache", "Reinstall via managed apps", "If persists → escalate to L2"],
      estimatedTime: "8 min",
    },
  },
  {
    id: "TKT-8840",
    subject: "Can't log into RetailConnect",
    store: "#445 — Seattle",
    caller: "Sarah K.",
    device: "iPhone 16 Pro",
    priority: "medium",
    age: "22 min",
    category: "Authentication",
    aiSuggestion: {
      workflow: "Password Reset Procedure",
      confidence: 91,
      steps: ["Verify employee ID", "Reset SSO credentials", "Push new auth token via MDM", "Confirm login successful"],
      estimatedTime: "4 min",
    },
  },
  {
    id: "TKT-8839",
    subject: "Barcode scanner not responding",
    store: "#2103 — Miami",
    caller: "David R.",
    device: "iPad Air M2",
    priority: "medium",
    age: "35 min",
    category: "Peripheral",
    aiSuggestion: {
      workflow: "Bluetooth Pairing Guide",
      confidence: 78,
      steps: ["Toggle Bluetooth off/on", "Forget scanner in Bluetooth settings", "Re-pair scanner", "Test scan with InventoryPro"],
      estimatedTime: "5 min",
    },
  },
  {
    id: "TKT-8838",
    subject: "New employee needs device setup",
    store: "#1890 — New York",
    caller: "Lisa M.",
    device: "iPhone 15",
    priority: "low",
    age: "1 hr",
    category: "Provisioning",
    aiSuggestion: {
      workflow: "Device Enrollment Walkthrough",
      confidence: 96,
      steps: ["Verify ABM assignment", "Initiate DEP enrollment", "Push required profiles", "Install mandatory apps", "Confirm device ready"],
      estimatedTime: "12 min",
    },
  },
];

const priorityConfig: Record<string, { color: string; bg: string }> = {
  critical: { color: "#ff3b30", bg: "#ff3b3015" },
  high: { color: "#ff9500", bg: "#ff950015" },
  medium: { color: "#007aff", bg: "#007aff15" },
  low: { color: "#6e6e73", bg: "#6e6e7315" },
};

export default function L1SupportPage() {
  return (
    <div className="space-y-6">
      {/* Shift Performance Banner */}
      <div className="card p-5 bg-gradient-to-r from-blue-50 to-green-50 border-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-[13px] text-white font-bold">SJ</span>
              </div>
              <div>
                <p className="text-[15px] font-semibold text-text-primary">Good morning, Sam</p>
                <p className="text-[12px] text-text-secondary">Shift: 9:00 AM — 5:00 PM | 8 tickets assigned</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-[20px] font-bold text-text-primary">17</p>
              <p className="text-[10px] text-text-tertiary">Resolved Today</p>
            </div>
            <div className="text-center">
              <p className="text-[20px] font-bold text-success">16m</p>
              <p className="text-[10px] text-text-tertiary">Avg Resolution</p>
            </div>
            <div className="text-center">
              <p className="text-[20px] font-bold text-accent">95%</p>
              <p className="text-[10px] text-text-tertiary">Quality Score</p>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 bg-green-100 rounded-lg">
              <TrendingUp size={14} className="text-success" />
              <span className="text-[12px] font-medium text-success">Improving!</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Open Tickets"
          value="8"
          subtitle="Assigned to you"
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
          title="First-Call Resolution"
          value="85%"
          change={8}
          changeLabel="vs last week"
          icon={<CheckCircle size={16} className="text-green-500" />}
          color="#34c759"
        />
        <MetricCard
          title="Escalation Rate"
          value="15%"
          change={-57}
          changeLabel="vs old avg (35%)"
          icon={<ArrowUpCircle size={16} className="text-purple-500" />}
          color="#af52de"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Ticket Queue with AI Suggestions */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-border">
            <Search size={14} className="text-text-tertiary" />
            <input type="text" placeholder="Search tickets..." className="bg-transparent outline-none text-[13px] w-full" />
          </div>

          {tickets.map((ticket) => {
            const priority = priorityConfig[ticket.priority];
            return (
              <div key={ticket.id} className="card p-4 hover:shadow-hig-md transition-shadow">
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

                <div className="flex items-center gap-4 text-[12px] text-text-secondary mb-3">
                  <span className="flex items-center gap-1"><User size={11} /> {ticket.caller}</span>
                  <span>{ticket.store}</span>
                  <span className="flex items-center gap-1"><Smartphone size={11} /> {ticket.device}</span>
                </div>

                {/* AI Suggested Workflow — Progressive Disclosure */}
                <div className="p-3 rounded-hig bg-blue-50 border border-blue-100 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={13} className="text-accent" />
                    <span className="text-[12px] font-semibold text-accent">
                      Suggested: {ticket.aiSuggestion.workflow}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent font-medium ml-auto">
                      {ticket.aiSuggestion.confidence}% match
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {ticket.aiSuggestion.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-[10px] w-4 h-4 rounded-full bg-accent/10 text-accent font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-[12px] text-text-secondary">{step}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-blue-100">
                    <span className="text-[11px] text-text-tertiary flex items-center gap-1">
                      <Clock size={10} /> Est. {ticket.aiSuggestion.estimatedTime}
                    </span>
                    <button className="flex items-center gap-1 text-[12px] px-3 py-1 bg-accent text-white rounded font-medium">
                      Start Workflow <ChevronRight size={12} />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
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

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Quick Device Lookup */}
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

          {/* Shift Performance */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Award size={16} className="text-accent" />
              <h3 className="text-[15px] font-semibold text-text-primary">Shift Stats</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-text-secondary">Tickets Resolved</span>
                  <span className="text-[12px] font-medium text-text-primary">17 / 25 target</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: "68%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-text-secondary">Avg Resolution Time</span>
                  <span className="text-[12px] font-medium text-success">16 min (target: 18 min)</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: "100%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-text-secondary">Quality Score</span>
                  <span className="text-[12px] font-medium text-success">95% (target: 90%)</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: "95%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-text-secondary">Escalation Rate</span>
                  <span className="text-[12px] font-medium text-success">15% (target: &lt;20%)</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: "85%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Knowledge Base Quick Links */}
          <div className="card p-5">
            <h3 className="text-[15px] font-semibold text-text-primary mb-3">Common Solutions</h3>
            <div className="space-y-2">
              {[
                { article: "WiFi Connectivity Troubleshooting", uses: 142 },
                { article: "App Crash Recovery Steps", uses: 98 },
                { article: "Password Reset Procedure", uses: 87 },
                { article: "Bluetooth Pairing Guide", uses: 65 },
                { article: "Device Enrollment Walkthrough", uses: 54 },
              ].map((item) => (
                <a key={item.article} href="#" className="flex items-center justify-between py-1.5 group">
                  <span className="text-[13px] text-accent group-hover:underline">{item.article}</span>
                  <span className="text-[10px] text-text-tertiary">{item.uses} uses</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
