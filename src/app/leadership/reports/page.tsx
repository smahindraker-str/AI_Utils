"use client";

import ChartCard from "@/components/ChartCard";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line,
} from "recharts";
import { Download, Calendar } from "lucide-react";

const monthlyData = [
  { month: "Jul", tickets: 1240, resolved: 1180, mttr: 18 },
  { month: "Aug", tickets: 1320, resolved: 1290, mttr: 16 },
  { month: "Sep", tickets: 1180, resolved: 1160, mttr: 15 },
  { month: "Oct", tickets: 1400, resolved: 1380, mttr: 14 },
  { month: "Nov", tickets: 1280, resolved: 1260, mttr: 13 },
  { month: "Dec", tickets: 1520, resolved: 1490, mttr: 14 },
  { month: "Jan", tickets: 1350, resolved: 1340, mttr: 12 },
  { month: "Feb", tickets: 1220, resolved: 1210, mttr: 11 },
  { month: "Mar", tickets: 1100, resolved: 1095, mttr: 10 },
];

const costData = [
  { month: "Jul", support: 42, hardware: 85, software: 28 },
  { month: "Aug", support: 38, hardware: 92, software: 30 },
  { month: "Sep", support: 35, hardware: 78, software: 32 },
  { month: "Oct", support: 33, hardware: 65, software: 29 },
  { month: "Nov", support: 30, hardware: 70, software: 31 },
  { month: "Dec", support: 28, hardware: 88, software: 33 },
  { month: "Jan", support: 25, hardware: 72, software: 28 },
  { month: "Feb", support: 24, hardware: 68, software: 27 },
  { month: "Mar", support: 22, hardware: 61, software: 26 },
];

const tooltipStyle = {
  background: "rgba(255,255,255,0.95)",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: 12,
  fontSize: 13,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {["7D", "30D", "90D", "1Y"].map((range) => (
            <button
              key={range}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                range === "90D"
                  ? "bg-accent text-white"
                  : "bg-surface border border-border text-text-secondary hover:bg-surface-secondary"
              }`}
            >
              {range}
            </button>
          ))}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border text-[13px] text-text-secondary hover:bg-surface-secondary">
            <Calendar size={14} />
            Custom
          </button>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-white text-[13px] font-medium hover:bg-accent-hover transition-colors">
          <Download size={14} />
          Export Report
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Ticket Volume & Resolution" subtitle="Monthly tickets created vs resolved">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData} barCategoryGap="15%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6e6e73" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#6e6e73" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="tickets" fill="#007aff" radius={[4, 4, 0, 0]} name="Created" />
              <Bar dataKey="resolved" fill="#34c759" radius={[4, 4, 0, 0]} name="Resolved" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Mean Time to Resolution" subtitle="Average resolution time in minutes">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6e6e73" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#6e6e73" }} axisLine={false} tickLine={false} unit=" min" />
              <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value} min`, "MTTR"]} />
              <Line type="monotone" dataKey="mttr" stroke="#ff9500" strokeWidth={2.5} dot={{ r: 4, fill: "#ff9500" }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Cost Analysis" subtitle="Monthly spend by category ($K)">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={costData}>
            <defs>
              <linearGradient id="supportGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#007aff" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#007aff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="hardwareGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff9500" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#ff9500" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="softwareGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34c759" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#34c759" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6e6e73" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#6e6e73" }} axisLine={false} tickLine={false} unit="K" />
            <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`$${value}K`]} />
            <Area type="monotone" dataKey="support" stackId="1" stroke="#007aff" fill="url(#supportGrad)" name="Support" />
            <Area type="monotone" dataKey="hardware" stackId="1" stroke="#ff9500" fill="url(#hardwareGrad)" name="Hardware" />
            <Area type="monotone" dataKey="software" stackId="1" stroke="#34c759" fill="url(#softwareGrad)" name="Software" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
