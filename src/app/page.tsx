"use client";

import Link from "next/link";
import { personas } from "@/lib/personas";
import {
  Crown, Cpu, Shield, Headphones, Wrench, Terminal, ArrowRight,
} from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, any> = {
  Crown, Cpu, Shield, Headphones, Wrench, Terminal,
};

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-12">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-5">
          <span className="text-white text-2xl font-bold">ie</span>
        </div>
        <h1 className="text-[34px] font-bold text-text-primary tracking-tight mb-2">
          Welcome to iEnterprise
        </h1>
        <p className="text-[17px] text-text-secondary max-w-lg mx-auto">
          Your Apple ecosystem management platform. Select your role to get started with a personalized experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {personas.map((persona) => {
          const Icon = iconMap[persona.icon];
          return (
            <Link
              key={persona.id}
              href={persona.basePath}
              className="card p-6 flex items-start gap-4 group hover:shadow-hig-lg transition-all"
            >
              <div
                className="w-12 h-12 rounded-hig-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: persona.color + "15" }}
              >
                {Icon && <Icon size={22} className="text-text-primary" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[15px] font-semibold text-text-primary">
                    {persona.label}
                  </h3>
                  <ArrowRight
                    size={14}
                    className="text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <p className="text-[13px] text-text-secondary leading-relaxed">
                  {persona.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
