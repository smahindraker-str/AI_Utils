"use client";

import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ChartCard";
import StatusBadge from "@/components/StatusBadge";
import { Laptop, Smartphone, Tablet, Tv, Cpu, HardDrive, RefreshCw, AlertCircle } from "lucide-react";
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

const refreshSchedule = [
  { quarter: "Q2 2026", devices: 840, type: "iPhone", status: "pending" as const },
  { quarter: "Q2 2026", devices: 320, type: "iPad", status: "pending" as const },
  { quarter: "Q3 2026", devices: 180, type: "Mac", status: "pending" as const },
  { quarter: "Q3 2026", devices: 560, type: "iPhone", status: "pending" as const },
  { quarter: "Q4 2026", devices: 420, type: "iPad", status: "pending" as const },
];

const tooltipStyle = {
  background: "rgba(255,255,255,0.95)",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: 12,
  fontSize: 13,
};

export default function TechnologyOverview() {
  return (
    <div className="space-y-6">
      {/* Fleet Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Devices"
          value="9,520"
          change={5.2}
          changeLabel="this quarter"
          icon={<Cpu size={16} className="text-blue-500" />}
          color="#007aff"
        />
        <MetricCard
          title="Pending Refresh"
          value="1,420"
          subtitle="Devices past 3-year lifecycle"
          icon={<RefreshCw size={16} className="text-orange-500" />}
          color="#ff9500"
        />
        <MetricCard
          title="OS Compliance"
          value="92.1%"
          change={3.8}
          changeLabel="vs last month"
          icon={<HardDrive size={16} className="text-green-500" />}
          color="#34c759"
        />
        <MetricCard
          title="Active Alerts"
          value="7"
          subtitle="Requiring tech manager attention"
          icon={<AlertCircle size={16} className="text-red-500" />}
          color="#ff3b30"
        />
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
            <div className="flex items-center gap-3 mb-3">
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

      {/* Refresh Schedule */}
      <ChartCard title="Upcoming Refresh Schedule" subtitle="Planned device replacements">
        <div className="space-y-2">
          {refreshSchedule.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-hig bg-surface-secondary">
              <div className="w-20 text-[13px] font-medium text-text-primary">{item.quarter}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-text-primary font-medium">{item.devices} {item.type} devices</span>
                </div>
                <div className="mt-1.5 h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${(item.devices / 840) * 100}%` }} />
                </div>
              </div>
              <StatusBadge status={item.status} />
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
