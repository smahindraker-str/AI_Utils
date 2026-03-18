"use client";

import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ChartCard";
import {
  Shield, ShieldCheck, ShieldAlert, Lock, Key, Fingerprint, Wifi, RefreshCw,
  CheckCircle, XCircle, Clock, FileText, Smartphone, AlertTriangle, Eye,
} from "lucide-react";
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

const pendingApprovals = [
  {
    id: "APR-0412",
    type: "OS Deployment",
    title: "iOS 18.4 rollout — West Region (42 stores, 2,840 devices)",
    requestedBy: "Marcus R. — Technology Manager",
    requestedAt: "2 hrs ago",
    risk: "medium",
    recommendation: "approve",
    details: "Staged rollout with 10% canary. All pre-flight checks passed. Compatible with current MDM profiles.",
  },
  {
    id: "APR-0411",
    type: "App Whitelist",
    title: "Add ScheduleView v5.1 to managed app catalog",
    requestedBy: "Sam J. — App Support",
    requestedAt: "4 hrs ago",
    risk: "low",
    recommendation: "approve",
    details: "VPP licensed. Security scan passed. No new permissions requested vs v5.0.",
  },
  {
    id: "APR-0410",
    type: "API Access",
    title: "Third-party analytics SDK — RetailConnect integration",
    requestedBy: "Dev Team — External",
    requestedAt: "1 day ago",
    risk: "high",
    recommendation: "deny",
    details: "SDK requests location + device ID access. Conflicts with data minimization policy. Suggest alternative SDK.",
  },
  {
    id: "APR-0409",
    type: "Profile Change",
    title: "Extend auto-lock timeout to 5 min — POS devices only",
    requestedBy: "Store Ops — Regional",
    requestedAt: "1 day ago",
    risk: "medium",
    recommendation: "approve",
    details: "Reduces re-auth friction at checkout. Compensating control: supervised + geofenced. Security reviewed.",
  },
];

const activeDeployment = {
  name: "iOS 18.3.2 — All Regions",
  progress: 68,
  total: 1380,
  completed: 938,
  failed: 12,
  pending: 430,
  startedAt: "Mar 17, 2026 — 6:00 AM",
  eta: "Mar 18, 2026 — 4:00 PM",
};

const riskColors: Record<string, { label: string; color: string; bg: string }> = {
  low: { label: "Low Risk", color: "#34c759", bg: "#34c75915" },
  medium: { label: "Medium Risk", color: "#ff9500", bg: "#ff950015" },
  high: { label: "High Risk", color: "#ff3b30", bg: "#ff3b3015" },
};

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
          title="Compliance Rate"
          value="98.2%"
          change={1.2}
          changeLabel="vs last month"
          icon={<ShieldCheck size={16} className="text-green-500" />}
          color="#34c759"
          subtitle="Target: 99.5%"
        />
        <MetricCard
          title="Pending Approvals"
          value="12"
          subtitle="4 require immediate review"
          icon={<Clock size={16} className="text-orange-500" />}
          color="#ff9500"
        />
        <MetricCard
          title="Active Deployment"
          value="68%"
          subtitle="iOS 18.3.2 — 938/1,380 devices"
          icon={<Smartphone size={16} className="text-blue-500" />}
          color="#007aff"
        />
        <MetricCard
          title="Security Incidents"
          value="3"
          subtitle="Active — requires action"
          icon={<ShieldAlert size={16} className="text-red-500" />}
          color="#ff3b30"
        />
      </div>

      {/* Approval Workflow — Core MDM Admin Journey */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-[13px] font-semibold text-text-tertiary uppercase tracking-wider">Approval Queue</h3>
          </div>
          <span className="text-[12px] text-text-secondary">
            4 pending — sorted by risk and urgency
          </span>
        </div>
        <div className="space-y-3">
          {pendingApprovals.map((approval) => {
            const risk = riskColors[approval.risk];
            return (
              <div key={approval.id} className={`card p-5 ${approval.recommendation === "deny" ? "border-l-4 border-l-danger" : "border-l-4 border-l-accent"}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono text-text-tertiary">{approval.id}</span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent">{approval.type}</span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: risk.bg, color: risk.color }}>
                        {risk.label}
                      </span>
                    </div>
                    <h4 className="text-[14px] font-semibold text-text-primary">{approval.title}</h4>
                  </div>
                  <span className="text-[11px] text-text-tertiary shrink-0">{approval.requestedAt}</span>
                </div>

                <p className="text-[12px] text-text-secondary mb-2">Requested by: {approval.requestedBy}</p>

                {/* AI Recommendation */}
                <div className={`p-3 rounded-hig mb-3 ${approval.recommendation === "approve" ? "bg-green-50 border border-green-100" : "bg-red-50 border border-red-100"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Eye size={12} className={approval.recommendation === "approve" ? "text-success" : "text-danger"} />
                    <span className="text-[11px] font-semibold text-text-primary">
                      System Recommendation: {approval.recommendation === "approve" ? "APPROVE" : "DENY"}
                    </span>
                  </div>
                  <p className="text-[12px] text-text-secondary">{approval.details}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-success text-white rounded-lg text-[13px] font-medium hover:opacity-90 transition-opacity">
                    <CheckCircle size={14} /> Approve
                  </button>
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-danger text-white rounded-lg text-[13px] font-medium hover:opacity-90 transition-opacity">
                    <XCircle size={14} /> Deny
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-2 bg-surface-secondary rounded-lg text-[13px] text-text-secondary hover:bg-black/[0.06] transition-colors">
                    <FileText size={14} /> Request Info
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Deployment Monitor */}
      <div className="card p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-[15px] font-semibold text-text-primary">{activeDeployment.name}</h3>
            <p className="text-[12px] text-text-secondary">Started {activeDeployment.startedAt} — ETA {activeDeployment.eta}</p>
          </div>
          <div className="flex gap-2">
            <button className="text-[12px] px-3 py-1.5 bg-surface-secondary rounded-lg text-text-secondary">Pause</button>
            <button className="text-[12px] px-3 py-1.5 bg-danger/10 rounded-lg text-danger font-medium">Rollback</button>
          </div>
        </div>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex-1 h-3 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${activeDeployment.progress}%` }} />
          </div>
          <span className="text-[14px] font-semibold text-text-primary">{activeDeployment.progress}%</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 bg-surface-secondary rounded-hig">
            <p className="text-[18px] font-semibold text-text-primary">{activeDeployment.total.toLocaleString()}</p>
            <p className="text-[11px] text-text-tertiary">Total Devices</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-hig">
            <p className="text-[18px] font-semibold text-success">{activeDeployment.completed}</p>
            <p className="text-[11px] text-text-tertiary">Completed</p>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-hig">
            <p className="text-[18px] font-semibold text-danger">{activeDeployment.failed}</p>
            <p className="text-[11px] text-text-tertiary">Failed</p>
          </div>
          <div className="text-center p-3 bg-surface-secondary rounded-hig">
            <p className="text-[18px] font-semibold text-text-secondary">{activeDeployment.pending}</p>
            <p className="text-[11px] text-text-tertiary">Pending</p>
          </div>
        </div>
      </div>

      {/* Compliance & Enrollment + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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

        <ChartCard title="Enrollment Trend" subtitle="Enrolled vs pending over time">
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
      </div>

      {/* Security Audit Prep */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-[15px] font-semibold text-text-primary">Quarterly Compliance Audit</h3>
            <p className="text-[12px] text-text-secondary">Q1 2026 audit due: Mar 31, 2026</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-medium text-success">99.6% compliance achieved</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-success font-medium">Target exceeded</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { label: "Device Encryption", value: "100%", status: "pass" },
            { label: "Passcode Policy", value: "99.8%", status: "pass" },
            { label: "OS Currency", value: "92.1%", status: "warning" },
            { label: "Certificate Validity", value: "99.2%", status: "pass" },
          ].map((audit) => (
            <div key={audit.label} className="p-3 rounded-hig bg-surface-secondary">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] text-text-secondary">{audit.label}</span>
                {audit.status === "pass" ? (
                  <CheckCircle size={14} className="text-success" />
                ) : (
                  <AlertTriangle size={14} className="text-warning" />
                )}
              </div>
              <p className={`text-[18px] font-semibold ${audit.status === "pass" ? "text-success" : "text-warning"}`}>{audit.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
