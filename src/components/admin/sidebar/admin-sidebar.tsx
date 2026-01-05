'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronDown,
  Home,
  Calendar,
  Target,
  Lock,
  School,
  FileText,
  Users,
  Eye,
  ClipboardList,
  UserCheck,
  BookOpen,
  Clock,
  CalendarDays,
  Settings as SettingsIcon,
  Mail,
  MessageSquare,
  FileSpreadsheet,
  BarChart3,
  Trophy,
  FileSearch,
  Cog,
  Radio,
  Upload,
  FormInput,
  GitBranch,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  href?: string;
  icon: React.ComponentType<any>;
  badge?: string | number;
  badgeVariant?: 'live' | 'count';
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    name: 'Home',
    href: '/admin/home',
    icon: Home,
  },
  {
    name: 'Campaign Management',
    icon: Calendar,
    children: [
      {
        name: 'Campaign Years',
        href: '/admin/campaign-management/campaign-years',
        icon: Calendar,
      },
      {
        name: 'Targets & Progress',
        href: '/admin/campaign-management/targets-progress',
        icon: BarChart3,
      },
      {
        name: 'Campaign Lock',
        href: '/admin/campaign-management/campaign-lock',
        icon: Lock,
      },
    ],
  },
  {
    name: 'Schools',
    icon: GitBranch,
    badge: 12,
    badgeVariant: 'count',
    children: [
      {
        name: 'School Directory',
        href: '/admin/schools/school-directory',
        icon: School,
      },
      {
        name: 'Nominations',
        href: '/admin/schools/nominations',
        icon: FileText,
        badge: 8,
        badgeVariant: 'count',
      },
      {
        name: 'Invitations & Interest',
        href: '/admin/schools/invitations-interest',
        icon: Mail,
      },
      {
        name: 'Assignment Planner',
        href: '/admin/schools/assignment-planner',
        icon: ClipboardList,
      },
    ],
  },
  {
    name: 'RECEE Inspections',
    icon: Eye,
    badge: 4,
    badgeVariant: 'count',
    children: [
      {
        name: 'RECEE Control',
        href: '/admin/recee-inspections/recee-control',
        icon: Eye,
      },
      {
        name: 'Inspection Reports',
        href: '/admin/recee-inspections/inspection-reports',
        icon: FileText,
      },
      {
        name: 'Inspector Management',
        href: '/admin/recee-inspections/inspector-management',
        icon: UserCheck,
      },
    ],
  },
  {
    name: 'Operations',
    icon: CalendarDays,
    children: [
      {
        name: 'Nomination Review',
        href: '/admin/operations/nomination-review',
        icon: BookOpen,
      },
      {
        name: 'Interest & Criteria',
        href: '/admin/operations/interest-criteria',
        icon: CalendarDays,
      },
      {
        name: 'RECEE Queue',
        href: '/admin/operations/recee-queue',
        icon: Clock,
      },
      {
        name: 'RECEE Approvals',
        href: '/admin/operations/recee-approvals',
        icon: UserCheck,
      },
    ],
  },
  {
    name: 'Admin',
    icon: Cog,
    children: [
      {
        name: 'User Directory',
        href: '/admin/user-management/user-directory',
        icon: Users,
      },
       {
        name: 'Roles & Permissions',
        href: '/admin/user-management/roles-permissions',
        icon: UserCheck,
      },
      {
        name: 'User Account',
        href: '/admin/user-management/user-account',
        icon: UserCheck,
      },
      {
        name: 'Audit Log',
        href: '/admin/user-management/audit-log',
        icon: UserCheck,
      },
      
      {
        name: 'Security Events',
        href: '/admin/user-management/security-events',
        icon: UserCheck,
      },
      {
        name: 'Data Changes',
        href: '/admin/user-management/data-changes',
        icon: UserCheck,
      },
    ],
  },
  {
    name: 'Communication',
    icon: MessageSquare,
    children: [
      {
        name: 'Email Templates',
        href: '/admin/communication/email-templates',
        icon: Mail,
      },
      {
        name: 'Emails Sent',
        href: '/admin/communication/emails-sent',
        icon: Mail,
      },
      {
        name: 'SMS Templates',
        href: '/admin/communication/sms-templates',
        icon: MessageSquare,
      },
      {
        name: 'SMS Sent',
        href: '/admin/communication/sms-sent',
        icon: MessageSquare,
      },
    ],
  },
  {
    name: 'Forms & Surveys',
    icon: FormInput,
    children: [
      {
        name: 'Form Builder',
        href: '/admin/forms-surveys/form-builder',
        icon: FormInput,
      },
      {
        name: 'Form Submissions',
        href: '/admin/forms-surveys/form-submissions',
        icon: FileText,
      },
      {
        name: 'Survey Analytics',
        href: '/admin/forms-surveys/survey-analytics',
        icon: BarChart3,
      },
    ],
  },
  {
    name: 'Tour',
    icon: Radio,
    children: [
      {
        name: 'Assign Facilitator',
        href: '/admin/tour/assign-facilitator',
        icon: Radio,
      },
      {
        name: 'Cluster Management',
        href: '/admin/tour/cluster-management',
        icon: FileText,
      },
      
      {
        name: 'Booking Tracker',
        href: '/admin/tour/book-tracker',
        icon: BarChart3,
      },
      {
        name: 'Today Control Room',
        href: '/admin/tour/today-control-room',
        icon: BarChart3,
      },
       {
        name: 'Tour Summary',
        href: '/admin/tour/tour-summary',
        icon: BarChart3,
      },
      {
        name: 'Tour Facilitators',
        href: '/admin/tour/tour-facilitators',
        icon: BarChart3,
      },
        {
        name: 'Impact Survey',
        href: '/admin/tour/impact-survey',
        icon: BarChart3,
      },
       {
        name: 'Teacher Survey',
        href: '/admin/tour/teacher-survey',
        icon: BarChart3,
      },
       {
        name: 'Tour Analyst',
        href: '/admin/tour/tour-analyst',
        icon: BarChart3,
      },
    ],
  },
  {
    name: 'Publishing',
    icon: Upload,
    children: [
      {
        name: 'Publish Queue',
        href: '/admin/publishing/publish-queue',
        icon: Upload,
      },
      {
        name: 'Public Tracker Integrity',
        href: '/admin/publishing/tracker-integrity',
        icon: FileText,
      },
    ],
  },
  {
    name: 'Reports',
    icon: BarChart3,
    children: [
      {
        name: 'Rejections & Exceptions',
        href: '/admin/reports-analytics/rejections-exceptions',
        icon: BarChart3,
      },
      
      {
        name: 'Geo Coverage',
        href: '/admin/reports-analytics/geo-coverage',
        icon: BarChart3,
      },
      {
        name: 'Weekly Executive',
        href: '/admin/reports-analytics/weekly-executive',
        icon: FileText,
      },
       {
        name: 'SLA & Stuck Schools',
        href: '/admin/reports-analytics/sla-stuck-schools',
        badge: 4,
        icon: BarChart3,
      },
      {
        name: 'School Case File',
        href: '/admin/reports-analytics/school-case-file',
        icon: FileText,
      },
       {
        name: 'Tour Ops Dashboard',
        href: '/admin/reports-analytics/tour-ops-dashboard',
        icon: FileText,
      },
      
    ],
  },
  {
    name: 'Competition',
    icon: Trophy,
    children: [
      {
        name: 'Competition Setup',
        href: '/admin/competition/setup',
        icon: SettingsIcon,
      },
      {
        name: 'Judging Ops',
        href: '/admin/competition/judging-ops',
        icon: FileText,
      },
      {
        name: 'Finalists & Voting',
        href: '/admin/competition/finalists-voting',
        icon: Trophy,
      },
      {
        name: 'Results',
        href: '/admin/competition/results',
        icon: Trophy,
      },
    ],
  },
  
  
];

export function AdminSidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>([
    'Schools',
    'User Management',
  ]);
  const pathname = usePathname();

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  const isParentActive = (item: NavigationItem): boolean => {
    if (item.href && isActive(item.href)) return true;
    if (item.children) {
      return item.children.some((child) => isActive(child.href));
    }
    return false;
  };

  return (
    <aside className="w-[260px] h-screen bg-white border-r border-[#E5E7EB] flex-shrink-0 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F5A623] rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-[#2B2B2B] font-medium">Maltina Tour</div>
            <div className="text-xs text-[#9E9E9E]">Admin Control</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isExpanded = expandedItems.includes(item.name);
          const hasItems = item.children && item.children.length > 0;

          if (!hasItems) {
            // Single item navigation
            return (
              <Link
                key={item.name}
                href={item.href || '#'}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                  isActive(item.href)
                    ? 'bg-[#F5A623] text-white'
                    : 'text-[#2B2B2B] hover:bg-[#F2F1EE]'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm flex-1 text-left">{item.name}</span>
                {item.badge && (
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded-full text-xs font-medium',
                      item.badgeVariant === 'live'
                        ? 'bg-[#8C1D18] text-white'
                        : isActive(item.href)
                          ? 'bg-white text-[#F5A623]'
                          : 'bg-[#D4A017] text-white'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          }

          // Section with sub-items
          return (
            <div key={item.name}>
              <button
                onClick={() => toggleExpanded(item.name)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-[#2B2B2B] hover:bg-[#F2F1EE]"
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm flex-1 text-left">{item.name}</span>
                {item.badge && (
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded-full text-xs font-medium',
                      item.badgeVariant === 'live'
                        ? 'bg-[#8C1D18] text-white'
                        : 'bg-[#D4A017] text-white'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform',
                    isExpanded && 'rotate-180'
                  )}
                />
              </button>

              {isExpanded && (
                <div className="ml-6 mt-1 space-y-0.5 border-l-2 border-[#E5E7EB] pl-3">
                  {item.children?.map((child) => {
                    return (
                      <Link
                        key={child.name}
                        href={child.href || '#'}
                        className={cn(
                          'w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm',
                          isActive(child.href)
                            ? 'bg-[#F5A623] text-white'
                            : 'text-[#2B2B2B] hover:bg-[#F2F1EE]'
                        )}
                      >
                        <span className="flex-1 text-left">{child.name}</span>
                        {child.badge && (
                          <span
                            className={cn(
                              'px-1.5 py-0.5 rounded-full text-xs font-medium',
                              isActive(child.href)
                                ? 'bg-white text-[#F5A623]'
                                : 'bg-[#D4A017] text-white'
                            )}
                          >
                            {child.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#E5E7EB]">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#F2F1EE]">
          <div className="w-9 h-9 bg-[#F5A623] rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">TM</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-[#2B2B2B] truncate font-medium">
              Tour Manager
            </div>
            <div className="text-xs text-[#9E9E9E]">Campaign 2025</div>
          </div>
        </div>
      </div>
    </aside>
  );
}