"use client";

import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ChartCard";
import StatusBadge from "@/components/StatusBadge";
import { Shield, ShieldCheck, ShieldAlert, Lock, Key, Fingerprint, Wifi, RefreshCw } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const complianceData = [
  { name: "Fully Compliant", value: 8640, color: "#34c759" },
  { name: "Partially Compliant", value: 620, color: "#ff9500" },
  { name: "Non-Compliant", value: 260, color: "#ff3b30" },
];

const enrollmentTrend = [
  { month: "Oct", enrolled: 8200, pending: 180 },
  { month: "Nov", enrolled: 8450, pending: 150 },
  { month: "Dec", enrolled: 8700, pending: 120 },
  { month: "Jan", enrolled: 8980, pending: 90 },
  { month: "Feb", enrolled: 9200, pending: 95 },
  { month: "Mar", enrolled: 9520, pending: 72 },
];

const recentActions = [
  { action: "Remote Lock", device: "iPhone 15 Pro — F2LXK4H8HG", store: "#2103 Miami", time: "5 min ago", status: "online" as const },
  { action: "Profile Push", device: "iPad Pro — DLXQ92MF7N", store: "#1247 San Francisco", time: "18 min ago", status: "online" as const },
  { action: "Wipe Command", device: "iPhone 14 — F2LXH9P2KQ", store: "#2103 Miami", time: "32 min ago", status: "warning" as const },
  { action: "App Install", device: "MacBook Air — C02ZW1KVMD6", store: "#892 Chicago", time: "1 hr ago", status: "online" as const },
  { action: "Enrollment", device: "iPhone 16 Pro — F2LYQR8JKM", store: "#760 Los Angeles", time: "2 hr ago", status: "online" as const },
];

const tooltipStyle = {
  background: "rgba(255,255,255,0.95)",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: 12,
  fontSize: 13,
};

export default function MDMOverview() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Enrolled Devices"
          value="9,520"
          change={3.5}
          changeLabel="this month"
          icon={<Shield size={16} className="text-green-500" />}
          color="#34c759"
        />
        <MetricCard
          title="Compliance Rate"
          value="90.8%"
          change={1.2}
          changeLabel="vs last month"
          icon={<ShieldCheck size={16} className="text-blue-500" />}
          color="#007aff"
        />
        <MetricCard
          title="Pending Enrollment"
          value="72"
          change={-24}
          changeLabel="vs last week"
          icon={<Key size={16} className="text-orange-500" />}
          color="#ff9500"
        />
        <MetricCard
          title="Security Incidents"
          value="3"
          subtitle="Active — requires action"
          icon={<ShieldAlert size={16} className="text-red-500" />}
          color="#ff3b30"
        />
      </div>

      {/* Compliance & Enrollment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Compliance Overview" subtitle="Device policy compliance status">
          <div className="flex items-center gap-8">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={complianceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {complianceData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {complianceData.map((d) => (
                <div key={d.name} className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <div>
                    <p className="text-[13px] font-medium text-text-primary">{d.name}</p>
                    <p className="text-[12px] text-text-secondary">{d.value.toLocaleString()} devices</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Enrollment Trend" subtitle="Enrolled vs pending devices over time">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={enrollmentTrend} barCategoryGap="15%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6e6e73" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#6e6e73" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="enrolled" fill="#34c759" radius={[4, 4, 0, 0]} name="Enrolled" />
              <Bar dataKey="pending" fill="#ff9500" radius={[4, 4, 0, 0]} name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quick Actions */}
        <div className="card p-5">
          <h3 className="text-[15px] font-semibold text-text-primary mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Remote Lock", icon: <Lock size={18} />, color: "#ff3b30" },
              { label: "Push Profile", icon: <Shield size={18} />, color: "#007aff" },
              { label: "Rotate Keys", icon: <Key size={18} />, color: "#ff9500" },
              { label: "Run Diagnostics", icon: <Fingerprint size={18} />, color: "#af52de" },
              { label: "Network Check", icon: <Wifi size={18} />, color: "#5ac8fa" },
              { label: "Force Sync", icon: <RefreshCw size={18} />, color: "#34c759" },
            ].map((action) => (
              <button
                key={action.label}
                className="flex flex-col items-center gap-2 p-3 rounded-hig bg-surface-secondary hover:bg-black/[0.06] transition-colors"
              >
                <span style={{ color: action.color }}>{action.icon}</span>
                <span className="text-[11px] font-medium text-text-secondary">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <ChartCard title="Recent MDM Actions" subtitle="Latest commands and operations">
            <div className="space-y-2">
              {recentActions.map((action, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-hig bg-surface-secondary">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[13px] font-medium text-text-primary">{action.action}</span>
                      <StatusBadge status={action.status} label={action.status === "warning" ? "Pending" : "Success"} />
                    </div>
                    <p className="text-[12px] text-text-secondary">{action.device} — {action.store}</p>
                  </div>
                  <span className="text-[11px] text-text-tertiary">{action.time}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
