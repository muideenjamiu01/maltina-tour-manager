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
  X,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';

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
    name: 'Campaign',
    icon: Calendar,
    children: [
      {
        name: 'Campaign Details',
        href: '/admin/campaigns',
        icon: Calendar,
      },
      // {
      //   name: 'Campaign Years',
      //   href: '/admin/campaign-management/campaign-years',
      //   icon: Calendar,
      // },
      // {
      //   name: 'Targets & Progress',
      //   href: '/admin/campaign-management/targets-progress',
      //   icon: BarChart3,
      // },
      // {
      //   name: 'Campaign Lock',
      //   href: '/admin/campaign-management/campaign-lock',
      //   icon: Lock,
      // },
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
    name: 'Scheduling & Booking',
    icon: CalendarDays,
    children: [
      {
        name: 'Booking Control',
        href: '/admin/scheduling-booking/booking-control',
        icon: BookOpen,
      },
      {
        name: 'Calendar View',
        href: '/admin/scheduling-booking/calendar-view',
        icon: CalendarDays,
      },
      {
        name: 'Slot Management',
        href: '/admin/scheduling-booking/slot-management',
        icon: Clock,
      },
    ],
  },
  {
    name: 'User Management',
    icon: Users,
    children: [
      {
        name: 'User Directory',
        href: '/admin/user-management/user-directory',
        icon: Users,
      },
      {
        name: 'Facilitator Directory',
        href: '/admin/user-management/facilitator-directory',
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
    name: 'Tour Day Control',
    icon: Radio,
    badge: 'LIVE',
    badgeVariant: 'live',
    children: [
      {
        name: 'Today Control Room',
        href: '/admin/tour-day-control/control-room',
        icon: Radio,
      },
      {
        name: 'Submission Completeness',
        href: '/admin/tour-day-control/submission-completeness',
        icon: FileText,
      },
      {
        name: 'Risk Radar',
        href: '/admin/tour-day-control/risk-radar',
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
    name: 'Reports & Analytics',
    icon: BarChart3,
    children: [
      {
        name: 'KPI Overview',
        href: '/admin/reports-analytics/kpi-overview',
        icon: BarChart3,
      },
      {
        name: 'Impact Evidence',
        href: '/admin/reports-analytics/impact-evidence',
        icon: BarChart3,
      },
      {
        name: 'Exports',
        href: '/admin/reports-analytics/exports',
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
  {
    name: 'Logs & Audit',
    icon: FileSearch,
    children: [
      {
        name: 'Audit Log',
        href: '/admin/logs-audit/audit-log',
        icon: FileText,
      },
      {
        name: 'Security Events',
        href: '/admin/logs-audit/security-events',
        icon: FileText,
      },
    ],
  },
  {
    name: 'Settings',
    icon: Cog,
    children: [
      {
        name: 'Roles & Permissions',
        href: '/admin/settings/roles-permissions',
        icon: SettingsIcon,
      },
      {
        name: 'Token Policies',
        href: '/admin/settings/token-policies',
        icon: SettingsIcon,
      },
      {
        name: 'Notifications',
        href: '/admin/settings/notifications',
        icon: SettingsIcon,
      },
      {
        name: 'SLA Thresholds',
        href: '/admin/settings/sla-thresholds',
        icon: SettingsIcon,
      },
      {
        name: 'Data Quality Rules',
        href: '/admin/settings/data-quality-rules',
        icon: SettingsIcon,
      },
    ],
  },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([
    'Schools',
    'User Management',
  ]);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      try {
        await logout();
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  };

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
    <aside className={cn(
      "w-[260px] h-full bg-white border-r border-[#E5E7EB] flex-shrink-0 flex flex-col transition-transform duration-300 ease-in-out",
      "lg:translate-x-0 lg:static lg:z-auto",
      "fixed inset-y-0 left-0 z-50",
      isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      {/* Header */}
      <div className="p-6 border-b border-[#E5E7EB]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F5A623] rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[#2B2B2B] font-medium">Maltina Tour</div>
              <div className="text-xs text-[#9E9E9E]">Admin Control</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-[#F2F1EE] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9E9E9E]" />
          </button>
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
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#F2F1EE] mb-3">
          <div className="w-9 h-9 bg-[#F5A623] rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {user?.firstName ? user.firstName[0] + (user.lastName?.[0] || '') : 'TM'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-[#2B2B2B] truncate font-medium">
              {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Tour Manager'}
            </div>
            <div className="text-xs text-[#9E9E9E]">{user?.role || 'Admin'}</div>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-[#8C1D18] hover:bg-[#FFF0F0] rounded-lg transition-colors text-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}