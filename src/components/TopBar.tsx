"use client";

import { usePathname } from "next/navigation";
import { Bell, HelpCircle, RefreshCw } from "lucide-react";
import { getPersonaFromPath, personas } from "@/lib/personas";

export default function TopBar() {
  const pathname = usePathname();
  const personaId = getPersonaFromPath(pathname);
  const persona = personas.find((p) => p.id === personaId)!;

  const getPageTitle = () => {
    if (pathname === "/leadership") return "Executive Dashboard";
    if (pathname === "/leadership/stores") return "Store Performance";
    if (pathname === "/leadership/reports") return "Reports & Analytics";
    if (pathname === "/technology") return "Technology Overview";
    if (pathname === "/technology/fleet") return "Fleet Management";
    if (pathname === "/technology/deployments") return "Deployments";
    if (pathname === "/mdm") return "MDM Overview";
    if (pathname === "/mdm/devices") return "Devices";
    if (pathname === "/mdm/policies") return "Policies & Profiles";
    if (pathname === "/mdm/apps") return "App Management";
    if (pathname === "/support/l1") return "Level 1 — Ticket Queue";
    if (pathname === "/support/l2") return "Level 2 — Escalation Queue";
    if (pathname === "/support/l3") return "Level 3 — Engineering Queue";
    return "Dashboard";
  };

  return (
    <header className="h-14 vibrancy border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <h2 className="text-[17px] font-semibold text-text-primary">{getPageTitle()}</h2>
        <span
          className="text-[11px] font-medium px-2 py-0.5 rounded-full"
          style={{ backgroundColor: persona.color + "15", color: persona.color }}
        >
          {persona.shortLabel}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <button className="p-2 rounded-lg hover:bg-black/[0.04] transition-colors" title="Refresh">
          <RefreshCw size={16} className="text-text-secondary" />
        </button>
        <button className="p-2 rounded-lg hover:bg-black/[0.04] transition-colors relative" title="Notifications">
          <Bell size={16} className="text-text-secondary" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
        </button>
        <button className="p-2 rounded-lg hover:bg-black/[0.04] transition-colors" title="Help">
          <HelpCircle size={16} className="text-text-secondary" />
        </button>
      </div>
    </header>
  );
}
