'use client';

import { Bell, ChevronDown } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  showFilters?: boolean;
  screenCode?: string;
}

export function AdminHeader({
  title,
  subtitle,
  showFilters = true,
  screenCode,
}: AdminHeaderProps) {
  return (
    <div className="bg-white border-b border-[#E5E7EB]">
      <div className="px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#2B2B2B]">{title}</h1>
          {subtitle && (
            <p className="text-sm text-[#9E9E9E] mt-1">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {showFilters && (
            <>
              <select className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#2B2B2B] bg-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]">
                <option>Campaign 2025</option>
                <option>Campaign 2024</option>
                <option>Campaign 2023</option>
              </select>
              <select className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#2B2B2B] bg-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]">
                <option>All States</option>
                <option>Lagos</option>
                <option>Abuja</option>
                <option>Kano</option>
              </select>
            </>
          )}

          <button className="p-2 hover:bg-[#F2F1EE] rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-[#9E9E9E]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#8C1D18] rounded-full"></span>
          </button>

          <div className="flex items-center gap-2 px-3 py-2 hover:bg-[#F2F1EE] rounded-lg transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-[#F5A623] rounded-full flex items-center justify-center">
              <span className="text-sm text-white">TM</span>
            </div>
            <div className="text-sm text-[#2B2B2B]">Tour Manager</div>
            <ChevronDown className="w-4 h-4 text-[#9E9E9E]" />
          </div>
        </div>
      </div>
    </div>
  );
}