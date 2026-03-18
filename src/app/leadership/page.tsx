"use client";

import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ChartCard";
import StatusBadge from "@/components/StatusBadge";
import { Store, Wifi, Clock, DollarSign, AlertTriangle, CheckCircle, Download, TrendingUp, Zap, Target, ArrowRight } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

const uptimeData = [
  { date: "Mon", uptime: 99.2 }, { date: "Tue", uptime: 99.8 },
  { date: "Wed", uptime: 98.5 }, { date: "Thu", uptime: 99.9 },
  { date: "Fri", uptime: 99.7 }, { date: "Sat", uptime: 99.4 },
  { date: "Sun", uptime: 99.6 },
];

const regionData = [
  { region: "West", stores: 42, health: 97.2 },
  { region: "East", stores: 38, health: 98.1 },
  { region: "Central", stores: 31, health: 96.8 },
  { region: "South", stores: 27, health: 99.0 },
  { region: "Northeast", stores: 22, health: 97.5 },
];

const deviceMix = [
  { name: "iPhone", value: 4200, color: "#007aff" },
  { name: "iPad", value: 3100, color: "#34c759" },
  { name: "Mac", value: 1800, color: "#ff9500" },
  { name: "Apple TV", value: 420, color: "#af52de" },
];

const alerts = [
  { store: "Store #1247 — San Francisco", issue: "3 POS devices offline — est. $2.1K/hr revenue impact", severity: "warning" as const, time: "12 min ago" },
  { store: "Store #892 — Chicago", issue: "Network latency spike (>200ms) — checkout times affected", severity: "warning" as const, time: "28 min ago" },
  { store: "Store #2103 — Miami", issue: "MDM enrollment failed — 2 devices, new hire onboarding delayed", severity: "offline" as const, time: "1 hr ago" },
  { store: "Store #445 — Seattle", issue: "Firmware update completed — all devices nominal", severity: "online" as const, time: "2 hr ago" },
];

const businessImpacts = [
  { label: "Proactive Issue Prevention", value: "$450K", desc: "Annual savings from predictive alerts", color: "#34c759", icon: <Zap size={18} /> },
  { label: "Reduced Downtime", value: "99.4%", desc: "Fleet uptime vs 97.1% industry avg", color: "#007aff", icon: <TrendingUp size={18} /> },
  { label: "Support Efficiency", value: "-36%", desc: "Avg ticket resolution time reduction", color: "#ff9500", icon: <Clock size={18} /> },
  { label: "Escalation Reduction", value: "-57%", desc: "L1→L2 escalation rate (35% → 15%)", color: "#af52de", icon: <Target size={18} /> },
];

const tooltipStyle = {
  background: "rgba(255,255,255,0.95)",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: 12,
  fontSize: 13,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

export default function LeadershipDashboard() {
  return (
    <div className="space-y-6">
      {/* Hero Metric — Fleet Health Score */}
      <div className="card p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#34c759" strokeWidth="8"
                  strokeDasharray={`${82 * 2.64} ${100 * 2.64}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[28px] font-bold text-text-primary">82%</span>
              </div>
            </div>
            <div>
              <h2 className="text-[22px] font-bold text-text-primary mb-1">Fleet Health Score</h2>
              <p className="text-[14px] text-text-secondary mb-2">
                Across 160 stores, 9,520 devices — updated 2 min ago
              </p>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-[13px] text-success font-medium">
                  <TrendingUp size={14} /> +3.2% vs last week
                </span>
                <span className="text-[13px] text-text-tertiary">|</span>
                <span className="text-[13px] text-text-secondary">
                  Target: 85% by Q2 2026
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-[13px] font-medium hover:bg-accent-hover transition-colors">
              <Download size={14} />
              Export Executive Summary
            </button>
            <p className="text-[11px] text-text-tertiary text-right">Last exported: Mar 12, 2026</p>
          </div>
        </div>
      </div>

      {/* Business Impact Cards — ROI Story */}
      <div>
        <h3 className="text-[13px] font-semibold text-text-tertiary uppercase tracking-wider mb-3">Business Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {businessImpacts.map((impact) => (
            <div key={impact.label} className="card p-5 hover:shadow-hig-md transition-shadow cursor-pointer group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-hig flex items-center justify-center" style={{ backgroundColor: impact.color + "15" }}>
                  <span style={{ color: impact.color }}>{impact.icon}</span>
                </div>
                <ArrowRight size={14} className="text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
              </div>
              <p className="text-[24px] font-bold text-text-primary tracking-tight">{impact.value}</p>
              <p className="text-[13px] font-medium text-text-primary mt-1">{impact.label}</p>
              <p className="text-[12px] text-text-secondary mt-0.5">{impact.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Operational KPIs */}
      <div>
        <h3 className="text-[13px] font-semibold text-text-tertiary uppercase tracking-wider mb-3">Operational Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Stores"
            value="160"
            change={3.2}
            changeLabel="vs last quarter"
            icon={<Store size={16} className="text-purple-500" />}
            color="#af52de"
          />
          <MetricCard
            title="Fleet Uptime"
            value="99.4%"
            change={0.3}
            changeLabel="vs last week"
            icon={<Wifi size={16} className="text-green-500" />}
            color="#34c759"
          />
          <MetricCard
            title="Avg Resolution Time"
            value="14 min"
            change={-8.5}
            changeLabel="vs last month"
            icon={<Clock size={16} className="text-blue-500" />}
            color="#007aff"
          />
          <MetricCard
            title="Monthly Savings"
            value="$127K"
            change={12.4}
            changeLabel="vs projected"
            icon={<DollarSign size={16} className="text-orange-500" />}
            color="#ff9500"
          />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChartCard title="Fleet Uptime Trend" subtitle="7-day rolling average across all stores">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={uptimeData}>
                <defs>
                  <linearGradient id="uptimeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34c759" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#34c759" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6e6e73" }} axisLine={false} tickLine={false} />
                <YAxis domain={[97, 100]} tick={{ fontSize: 12, fill: "#6e6e73" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`, "Uptime"]} />
                <Area type="monotone" dataKey="uptime" stroke="#34c759" strokeWidth={2} fill="url(#uptimeGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard title="Device Distribution" subtitle="Active fleet composition">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={deviceMix} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {deviceMix.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center -mt-2">
            {deviceMix.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-[11px] text-text-secondary">{d.name}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Region + Alerts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Regional Performance" subtitle="Store count and health score by region">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={regionData} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="region" tick={{ fontSize: 12, fill: "#6e6e73" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#6e6e73" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="stores" fill="#007aff" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Active Alerts" subtitle="Business-impact prioritized">
          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-hig bg-surface-secondary">
                <div className="mt-0.5">
                  {alert.severity === "online" ? (
                    <CheckCircle size={16} className="text-success" />
                  ) : (
                    <AlertTriangle size={16} className={alert.severity === "offline" ? "text-danger" : "text-warning"} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-text-primary">{alert.store}</p>
                  <p className="text-[12px] text-text-secondary">{alert.issue}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StatusBadge status={alert.severity} />
                  <span className="text-[11px] text-text-tertiary">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Board Prep Quick Actions */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-[15px] font-semibold text-text-primary">Board Prep</h3>
            <p className="text-[12px] text-text-secondary">Quick access to executive reporting</p>
          </div>
          <span className="text-[11px] text-text-tertiary">Next board meeting: Mar 25, 2026</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: "Executive Summary PDF", desc: "Fleet health, ROI, and key initiatives", action: "Generate" },
            { label: "Quarterly Trend Report", desc: "90-day performance across all regions", action: "Download" },
            { label: "Budget vs Actual", desc: "Technology spend analysis with forecasts", action: "View" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 p-3 rounded-hig bg-surface-secondary">
              <div className="flex-1">
                <p className="text-[13px] font-medium text-text-primary">{item.label}</p>
                <p className="text-[11px] text-text-tertiary">{item.desc}</p>
              </div>
              <button className="text-[12px] px-3 py-1.5 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors shrink-0">
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
