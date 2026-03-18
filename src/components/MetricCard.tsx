"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  color?: string;
  subtitle?: string;
}

export default function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  color = "#007aff",
  subtitle,
}: MetricCardProps) {
  const trendIcon = change && change > 0
    ? <TrendingUp size={12} />
    : change && change < 0
    ? <TrendingDown size={12} />
    : <Minus size={12} />;

  const trendColor = change && change > 0
    ? "text-success"
    : change && change < 0
    ? "text-danger"
    : "text-text-tertiary";

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-[13px] font-medium text-text-secondary">{title}</p>
        {icon && (
          <div
            className="w-8 h-8 rounded-hig flex items-center justify-center"
            style={{ backgroundColor: color + "12" }}
          >
            {icon}
          </div>
        )}
      </div>
      <p className="text-[28px] font-semibold text-text-primary tracking-tight leading-none mb-1">
        {value}
      </p>
      {subtitle && (
        <p className="text-[12px] text-text-tertiary mb-1">{subtitle}</p>
      )}
      {change !== undefined && (
        <div className={`flex items-center gap-1 ${trendColor}`}>
          {trendIcon}
          <span className="text-[12px] font-medium">
            {change > 0 ? "+" : ""}
            {change}%
          </span>
          {changeLabel && (
            <span className="text-[12px] text-text-tertiary ml-1">{changeLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
