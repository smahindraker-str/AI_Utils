"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Store, BarChart3, Laptop, Rocket, Smartphone,
  FileCheck, AppWindow, Inbox, ArrowUpCircle, Terminal, Crown,
  Cpu, Shield, Headphones, Wrench, ChevronDown, Settings, Bell,
  Search, HelpCircle,
} from "lucide-react";
import { personas, navigationByPersona, getPersonaFromPath } from "@/lib/personas";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, any> = {
  LayoutDashboard, Store, BarChart3, Laptop, Rocket, Smartphone,
  FileCheck, AppWindow, Inbox, ArrowUpCircle, Terminal, Crown,
  Cpu, Shield, Headphones, Wrench, ChevronDown, Settings, Bell,
  Search, HelpCircle,
};

function NavIcon({ name, size = 18, className }: { name: string; size?: number; className?: string }) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}

export default function Sidebar() {
  const pathname = usePathname();
  const currentPersona = getPersonaFromPath(pathname);
  const [personaOpen, setPersonaOpen] = useState(false);

  const persona = personas.find((p) => p.id === currentPersona)!;
  const navItems = navigationByPersona[currentPersona];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] vibrancy border-r border-border flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">ie</span>
          </div>
          <div>
            <h1 className="text-[15px] font-semibold text-text-primary tracking-tight">iEnterprise</h1>
            <p className="text-[11px] text-text-tertiary">Retail Platform</p>
          </div>
        </div>
      </div>

      {/* Persona Switcher */}
      <div className="px-3 pb-2">
        <button
          onClick={() => setPersonaOpen(!personaOpen)}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-hig hover:bg-black/[0.04] transition-colors"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: persona.color + "18" }}
          >
            <NavIcon name={persona.icon} size={15} className="text-current" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-[13px] font-medium text-text-primary">{persona.shortLabel}</p>
          </div>
          <ChevronDown
            size={14}
            className={`text-text-tertiary transition-transform ${personaOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Persona Dropdown */}
        {personaOpen && (
          <div className="mt-1 bg-surface rounded-hig shadow-hig-lg border border-border overflow-hidden">
            {personas.map((p) => (
              <Link
                key={p.id}
                href={p.basePath}
                onClick={() => setPersonaOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 hover:bg-surface-secondary transition-colors ${
                  p.id === currentPersona ? "bg-surface-secondary" : ""
                }`}
              >
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: p.color + "18" }}
                >
                  <NavIcon name={p.icon} size={13} />
                </div>
                <div className="flex-1">
                  <p className="text-[12px] font-medium text-text-primary">{p.label}</p>
                  <p className="text-[10px] text-text-tertiary leading-tight">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Search */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-black/[0.03] rounded-lg">
          <Search size={14} className="text-text-tertiary" />
          <span className="text-[13px] text-text-tertiary">Search</span>
          <span className="ml-auto text-[11px] text-text-tertiary bg-black/[0.04] px-1.5 py-0.5 rounded">
            /
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider px-3 mb-2">
          Navigation
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg mb-0.5 transition-colors text-[13px] ${
                isActive
                  ? "bg-accent/10 text-accent font-medium"
                  : "text-text-secondary hover:bg-black/[0.04] hover:text-text-primary"
              }`}
            >
              <NavIcon name={item.icon} size={16} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto text-[11px] bg-danger text-white px-1.5 py-0.5 rounded-full font-medium">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* Support Level Switcher (only shown in support views) */}
        {currentPersona.startsWith("support") && (
          <>
            <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider px-3 mt-4 mb-2">
              Support Tiers
            </p>
            {personas.filter((p) => p.id.startsWith("support")).map((p) => {
              const isActive = currentPersona === p.id;
              return (
                <Link
                  key={p.id}
                  href={p.basePath}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg mb-0.5 transition-colors text-[13px] ${
                    isActive
                      ? "bg-accent/10 text-accent font-medium"
                      : "text-text-secondary hover:bg-black/[0.04]"
                  }`}
                >
                  <NavIcon name={p.icon} size={16} />
                  <span>{p.shortLabel}</span>
                </Link>
              );
            })}
          </>
        )}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-border">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-black/[0.04] cursor-pointer transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <span className="text-[11px] text-white font-semibold">JD</span>
          </div>
          <div className="flex-1">
            <p className="text-[12px] font-medium text-text-primary">Jane Doe</p>
            <p className="text-[10px] text-text-tertiary">Retail Ops</p>
          </div>
          <Settings size={14} className="text-text-tertiary" />
        </div>
      </div>
    </aside>
  );
}
