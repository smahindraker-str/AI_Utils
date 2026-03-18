"use client";

import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ChartCard";
import {
  Laptop, Smartphone, Tablet, Tv, AlertCircle,
  Users, Clock, Target, UserCheck, FileText, Send,
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";

const lifecycleData = [
  { name: "< 1 year", count: 2800, color: "#34c759" },
  { name: "1-2 years", count: 3200, color: "#007aff" },
  { name: "2-3 years", count: 2100, color: "#ff9500" },
  { name: "3+ years", count: 1420, color: "#ff3b30" },
];

const osDistribution = [
  { os: "iOS 18", count: 4100 },
  { os: "iOS 17", count: 2800 },
  { os: "macOS 15", count: 1200 },
  { os: "macOS 14", count: 580 },
  { os: "iPadOS 18", count: 2400 },
  { os: "tvOS 18", count: 420 },
];

const activeIncidents = [
  { id: "INC-2841", title: "WiFi dropouts — West Region stores", priority: "P1", assignee: "Alex K.", store: "Multiple (8 stores)", age: "2h 15m", sla: "on-track", category: "Network" },
  { id: "INC-2840", title: "POS terminal boot loop — Chicago", priority: "P1", assignee: "Unassigned", store: "#892 Chicago", age: "45m", sla: "at-risk", category: "Hardware" },
  { id: "INC-2839", title: "MDM profile push failures — new iPads", priority: "P2", assignee: "Priya P.", store: "#445 Seattle", age: "3h 20m", sla: "on-track", category: "MDM" },
  { id: "INC-2838", title: "RetailConnect sync delays >5min", priority: "P2", assignee: "Sam J.", store: "All stores", age: "1h 50m", sla: "on-track", category: "Application" },
  { id: "INC-2837", title: "Apple TV signage blank — Boston", priority: "P3", assignee: "Alex K.", store: "#3301 Boston", age: "4h", sla: "on-track", category: "Display" },
  { id: "INC-2836", title: "Badge printer offline — New York", priority: "P3", assignee: "Unassigned", store: "#1890 New York", age: "5h 30m", sla: "breached", category: "Peripheral" },
  { id: "INC-2835", title: "Mac mini overheating alert — Dallas", priority: "P2", assignee: "Jordan S.", store: "#1022 Dallas", age: "2h", sla: "on-track", category: "Hardware" },
  { id: "INC-2834", title: "Certificate expiry warning — SCEP server", priority: "P1", assignee: "Jordan S.", store: "Infrastructure", age: "30m", sla: "on-track", category: "Security" },
];

const teamMembers = [
  { name: "Alex K.", role: "Network Specialist", active: 2, resolved: 5, avatar: "AK" },
  { name: "Priya P.", role: "MDM Admin", active: 1, resolved: 3, avatar: "PP" },
  { name: "Sam J.", role: "App Support", active: 1, resolved: 4, avatar: "SJ" },
  { name: "Jordan S.", role: "L3 Engineer", active: 2, resolved: 2, avatar: "JS" },
];

const priorityConfig: Record<string, { color: string; bg: string }> = {
  P1: { color: "#ff3b30", bg: "#ff3b3015" },
  P2: { color: "#ff9500", bg: "#ff950015" },
  P3: { color: "#007aff", bg: "#007aff15" },
};

const slaConfig: Record<string, { label: string; color: string }> = {
  "on-track": { label: "On Track", color: "#34c759" },
  "at-risk": { label: "At Risk", color: "#ff9500" },
  "breached": { label: "Breached", color: "#ff3b30" },
};

const tooltipStyle = {
  background: "rgba(255,255,255,0.95)",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: 12,
  fontSize: 13,
};

export default function TechnologyOverview() {
  return (
    <div className="space-y-6">
      {/* Morning Shift KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Incidents"
          value="8"
          subtitle="2 P1, 3 P2, 3 P3"
          icon={<AlertCircle size={16} className="text-red-500" />}
          color="#ff3b30"
        />
        <MetricCard
          title="SLA Compliance"
          value="96%"
          change={2.1}
          changeLabel="vs last shift"
          icon={<Target size={16} className="text-green-500" />}
          color="#34c759"
        />
        <MetricCard
          title="Team Utilization"
          value="4/4"
          subtitle="All team members active"
          icon={<Users size={16} className="text-blue-500" />}
          color="#007aff"
        />
        <MetricCard
          title="Resolved Today"
          value="14"
          change={16}
          changeLabel="vs yesterday"
          icon={<Clock size={16} className="text-orange-500" />}
          color="#ff9500"
        />
      </div>

      {/* Incident Triage + Team Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Incident Queue */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Incident Triage"
            subtitle={`${activeIncidents.filter(i => i.assignee === "Unassigned").length} unassigned — prioritized by SLA impact`}
            action={
              <div className="flex gap-2">
                {["All", "P1", "P2", "P3"].map((f) => (
                  <button key={f} className={`text-[11px] px-2 py-1 rounded-md font-medium ${f === "All" ? "bg-accent text-white" : "bg-surface-secondary text-text-secondary"}`}>
                    {f}
                  </button>
                ))}
              </div>
            }
          >
            <div className="space-y-2">
              {activeIncidents.map((inc) => {
                const p = priorityConfig[inc.priority];
                const sla = slaConfig[inc.sla];
                return (
                  <div key={inc.id} className={`p-3 rounded-hig transition-colors cursor-pointer ${inc.assignee === "Unassigned" ? "bg-red-50 border border-red-100" : "bg-surface-secondary hover:bg-black/[0.04]"}`}>
                    <div className="flex items-start justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-text-tertiary">{inc.id}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: p.bg, color: p.color }}>{inc.priority}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-secondary text-text-tertiary">{inc.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium" style={{ color: sla.color }}>{sla.label}</span>
                        <span className="text-[11px] text-text-tertiary">{inc.age}</span>
                      </div>
                    </div>
                    <p className="text-[13px] font-medium text-text-primary mb-1.5">{inc.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-text-secondary">{inc.store}</span>
                      <div className="flex items-center gap-2">
                        {inc.assignee === "Unassigned" ? (
                          <button className="flex items-center gap-1 text-[11px] px-2 py-1 bg-accent text-white rounded font-medium">
                            <UserCheck size={10} /> Assign
                          </button>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] text-text-secondary">
                            <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center text-[8px] font-bold text-accent">
                              {inc.assignee.split(" ").map(n => n[0]).join("")}
                            </div>
                            {inc.assignee}
                          </span>
                        )}
                        <button className="text-[11px] px-2 py-1 bg-surface-secondary rounded text-text-secondary hover:bg-black/[0.06]">
                          Delegate
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ChartCard>
        </div>

        {/* Team Panel + Shift Handoff */}
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="text-[15px] font-semibold text-text-primary mb-1">Team Status</h3>
            <p className="text-[12px] text-text-secondary mb-4">Day Shift — 7:00 AM to 6:00 PM</p>
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold">{member.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-text-primary">{member.name}</p>
                    <p className="text-[11px] text-text-tertiary">{member.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] text-text-primary font-medium">{member.active} active</p>
                    <p className="text-[10px] text-success">{member.resolved} resolved</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shift Handoff */}
          <div className="card p-5 border-l-4 border-l-accent">
            <div className="flex items-center gap-2 mb-3">
              <Send size={16} className="text-accent" />
              <h3 className="text-[15px] font-semibold text-text-primary">Shift Handoff</h3>
            </div>
            <p className="text-[12px] text-text-secondary mb-3">Night shift starts at 6:00 PM</p>
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-[12px]">
                <span className="text-text-secondary">Open incidents to hand off</span>
                <span className="font-medium text-text-primary">5</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-text-secondary">Pending deployments</span>
                <span className="font-medium text-text-primary">2</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-text-secondary">Monitoring alerts</span>
                <span className="font-medium text-warning">3</span>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-accent text-white rounded-lg text-[13px] font-medium hover:bg-accent-hover transition-colors">
              <FileText size={14} />
              Generate Handoff Report
            </button>
          </div>
        </div>
      </div>

      {/* Fleet Composition & Lifecycle */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Device Lifecycle Distribution" subtitle="Age of active devices in fleet">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={lifecycleData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="count">
                {lifecycleData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 justify-center">
            {lifecycleData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-[12px] text-text-secondary">{d.name}: {d.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="OS Version Distribution" subtitle="Across all managed devices">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={osDistribution} layout="vertical" barCategoryGap="15%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: "#6e6e73" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="os" tick={{ fontSize: 12, fill: "#6e6e73" }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="#007aff" radius={[0, 6, 6, 0]} name="Devices" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Fleet Composition Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: "iPhone", count: 4200, icon: <Smartphone size={20} />, color: "#007aff" },
          { name: "iPad", count: 3100, icon: <Tablet size={20} />, color: "#34c759" },
          { name: "Mac", count: 1800, icon: <Laptop size={20} />, color: "#ff9500" },
          { name: "Apple TV", count: 420, icon: <Tv size={20} />, color: "#af52de" },
        ].map((device) => (
          <div key={device.name} className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-hig flex items-center justify-center" style={{ backgroundColor: device.color + "12" }}>
                <span style={{ color: device.color }}>{device.icon}</span>
              </div>
              <div>
                <p className="text-[13px] text-text-secondary">{device.name}</p>
                <p className="text-[22px] font-semibold text-text-primary">{device.count.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
