"use client";

type StatusType = "online" | "warning" | "offline" | "pending" | "maintenance";

const statusConfig: Record<StatusType, { label: string; color: string; bg: string }> = {
  online: { label: "Online", color: "#34c759", bg: "#34c75915" },
  warning: { label: "Warning", color: "#ff9500", bg: "#ff950015" },
  offline: { label: "Offline", color: "#ff3b30", bg: "#ff3b3015" },
  pending: { label: "Pending", color: "#007aff", bg: "#007aff15" },
  maintenance: { label: "Maintenance", color: "#af52de", bg: "#af52de15" },
};

export default function StatusBadge({ status, label }: { status: StatusType; label?: string }) {
  const config = statusConfig[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-medium"
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ backgroundColor: config.color }} />
      {label || config.label}
    </span>
  );
}
