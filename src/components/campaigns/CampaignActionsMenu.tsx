'use client';
import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Plus, Settings, Edit2, Copy, Play, Pause, StopCircle, Lock, Unlock, Eye, Star } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'locked' | 'draft' | 'closed';
}

interface CampaignActionsMenuProps {
  campaign: Campaign;
  onAddCycle: () => void;
  onConfigure: () => void;
  onEdit: () => void;
  onClone?: () => void;
  onStatusChange?: (newStatus: 'active' | 'locked' | 'draft' | 'closed') => void;
}

export function CampaignActionsMenu({
  campaign,
  onAddCycle,
  onConfigure,
  onEdit,
  onClone,
  onStatusChange
}: CampaignActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
      >
        <MoreVertical className="w-4 h-4 text-[#2B2B2B]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-50">
          <div className="py-1">
            {/* Add Cycle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAction(onAddCycle);
              }}
              className="w-full px-4 py-2 text-left text-[13px] text-[#2B2B2B] hover:bg-[#F0F9F4] transition-colors flex items-center gap-3"
            >
              <Plus className="w-4 h-4 text-[#2F6B3C]" />
              Add Cycle
            </button>

            {/* Configure */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAction(onConfigure);
              }}
              className="w-full px-4 py-2 text-left text-[13px] text-[#2B2B2B] hover:bg-[#FFF4E6] transition-colors flex items-center gap-3"
            >
              <Settings className="w-4 h-4 text-[#F5A623]" />
              Configure Pipelines
            </button>

            {/* Edit */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAction(onEdit);
              }}
              className="w-full px-4 py-2 text-left text-[13px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors flex items-center gap-3"
            >
              <Edit2 className="w-4 h-4 text-[#9E9E9E]" />
              Edit Details
            </button>

            {/* Clone */}
            {onClone && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction(onClone);
                }}
                className="w-full px-4 py-2 text-left text-[13px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors flex items-center gap-3"
              >
                <Copy className="w-4 h-4 text-[#9E9E9E]" />
                Clone Campaign
              </button>
            )}

            <div className="border-t border-[#E5E7EB] my-1"></div>

            {/* Status Actions */}
            {campaign.status === 'draft' && onStatusChange && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction(() => onStatusChange('active'));
                }}
                className="w-full px-4 py-2 text-left text-[13px] text-[#2F6B3C] hover:bg-[#F0F9F4] transition-colors flex items-center gap-3"
              >
                <Play className="w-4 h-4" />
                Start Campaign
              </button>
            )}

            {campaign.status === 'active' && onStatusChange && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(() => onStatusChange('locked'));
                  }}
                  className="w-full px-4 py-2 text-left text-[13px] text-[#D4A017] hover:bg-[#FFF4E6] transition-colors flex items-center gap-3"
                >
                  <Pause className="w-4 h-4" />
                  Pause Campaign
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(() => onStatusChange('closed'));
                  }}
                  className="w-full px-4 py-2 text-left text-[13px] text-[#8C1D18] hover:bg-[#FFF0F0] transition-colors flex items-center gap-3"
                >
                  <StopCircle className="w-4 h-4" />
                  Close Campaign
                </button>
              </>
            )}

            {campaign.status === 'locked' && onStatusChange && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction(() => onStatusChange('active'));
                }}
                className="w-full px-4 py-2 text-left text-[13px] text-[#2F6B3C] hover:bg-[#F0F9F4] transition-colors flex items-center gap-3"
              >
                <Unlock className="w-4 h-4" />
                Unlock Campaign
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}