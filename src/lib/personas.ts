export type PersonaId = 'leadership' | 'technology' | 'mdm' | 'support-l1' | 'support-l2' | 'support-l3';

export interface Persona {
  id: PersonaId;
  label: string;
  shortLabel: string;
  description: string;
  icon: string;
  color: string;
  basePath: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
  children?: NavItem[];
}

export const personas: Persona[] = [
  {
    id: 'leadership',
    label: 'Retail Leadership',
    shortLabel: 'Leadership',
    description: 'Executive overview of store operations, fleet health, and strategic KPIs',
    icon: 'Crown',
    color: '#af52de',
    basePath: '/leadership',
  },
  {
    id: 'technology',
    label: 'Technology Manager',
    shortLabel: 'Tech Manager',
    description: 'Fleet lifecycle, deployment planning, and technology strategy',
    icon: 'Cpu',
    color: '#007aff',
    basePath: '/technology',
  },
  {
    id: 'mdm',
    label: 'MDM Administrator',
    shortLabel: 'MDM Admin',
    description: 'Device management, policies, app deployment, and compliance',
    icon: 'Shield',
    color: '#34c759',
    basePath: '/mdm',
  },
  {
    id: 'support-l1',
    label: 'Support Desk — Level 1',
    shortLabel: 'L1 Support',
    description: 'First-line triage, guided troubleshooting, and ticket management',
    icon: 'Headphones',
    color: '#ff9500',
    basePath: '/support/l1',
  },
  {
    id: 'support-l2',
    label: 'Support Desk — Level 2',
    shortLabel: 'L2 Support',
    description: 'Advanced diagnostics, sysdiagnose, and escalation management',
    icon: 'Wrench',
    color: '#ff6b35',
    basePath: '/support/l2',
  },
  {
    id: 'support-l3',
    label: 'Support Desk — Level 3',
    shortLabel: 'L3 Support',
    description: 'Root cause analysis, system engineering, and infrastructure',
    icon: 'Terminal',
    color: '#ff3b30',
    basePath: '/support/l3',
  },
];

export const navigationByPersona: Record<PersonaId, NavItem[]> = {
  leadership: [
    { label: 'Executive Dashboard', href: '/leadership', icon: 'LayoutDashboard' },
    { label: 'Store Performance', href: '/leadership/stores', icon: 'Store' },
    { label: 'Reports & Analytics', href: '/leadership/reports', icon: 'BarChart3' },
  ],
  technology: [
    { label: 'Technology Overview', href: '/technology', icon: 'LayoutDashboard' },
    { label: 'Fleet Management', href: '/technology/fleet', icon: 'Laptop' },
    { label: 'Deployments', href: '/technology/deployments', icon: 'Rocket' },
  ],
  mdm: [
    { label: 'MDM Overview', href: '/mdm', icon: 'LayoutDashboard' },
    { label: 'Devices', href: '/mdm/devices', icon: 'Smartphone' },
    { label: 'Policies', href: '/mdm/policies', icon: 'FileCheck' },
    { label: 'App Management', href: '/mdm/apps', icon: 'AppWindow' },
  ],
  'support-l1': [
    { label: 'Ticket Queue', href: '/support/l1', icon: 'Inbox' },
  ],
  'support-l2': [
    { label: 'Escalation Queue', href: '/support/l2', icon: 'ArrowUpCircle' },
  ],
  'support-l3': [
    { label: 'Engineering Queue', href: '/support/l3', icon: 'Terminal' },
  ],
};

export function getPersonaFromPath(pathname: string): PersonaId {
  if (pathname.startsWith('/leadership')) return 'leadership';
  if (pathname.startsWith('/technology')) return 'technology';
  if (pathname.startsWith('/mdm')) return 'mdm';
  if (pathname.startsWith('/support/l3')) return 'support-l3';
  if (pathname.startsWith('/support/l2')) return 'support-l2';
  if (pathname.startsWith('/support/l1')) return 'support-l1';
  if (pathname.startsWith('/support')) return 'support-l1';
  return 'leadership';
}
