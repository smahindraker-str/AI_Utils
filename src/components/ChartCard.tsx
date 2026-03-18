"use client";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export default function ChartCard({ title, subtitle, children, action }: ChartCardProps) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-semibold text-text-primary">{title}</h3>
          {subtitle && <p className="text-[12px] text-text-tertiary mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
