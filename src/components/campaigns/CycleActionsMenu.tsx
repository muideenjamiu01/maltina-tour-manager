'use client';
import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Settings, Edit2, Copy, Eye, Lock, Unlock, Star } from 'lucide-react';

interface Cycle {
  id: string;
  cycleLabel: string;
  status: 'active' | 'locked' | 'draft' | 'closed';
}

interface CycleActionsMenuProps {
  cycle: Cycle;
  isActiveCycle: boolean;
  onSettings: () => void;
  onEdit?: () => void;
  onClone?: () => void;
  onView?: () => void;
  onSetActive?: () => void;
  onLockToggle?: () => void;
}

export function CycleActionsMenu({
  cycle,
  isActiveCycle,
  onSettings,
  onEdit,
  onClone,
  onView,
  onSetActive,
  onLockToggle
}: CycleActionsMenuProps) {
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
            {/* Settings */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAction(onSettings);
              }}
              className="w-full px-4 py-2 text-left text-[13px] text-[#2B2B2B] hover:bg-[#FFF4E6] transition-colors flex items-center gap-3"
            >
              <Settings className="w-4 h-4 text-[#F5A623]" />
              Cycle Settings
            </button>

            {/* Edit */}
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction(onEdit);
                }}
                className="w-full px-4 py-2 text-left text-[13px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors flex items-center gap-3"
              >
                <Edit2 className="w-4 h-4 text-[#9E9E9E]" />
                Edit Cycle
              </button>
            )}

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
                Clone Cycle
              </button>
            )}

            {/* View */}
            {onView && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction(onView);
                }}
                className="w-full px-4 py-2 text-left text-[13px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors flex items-center gap-3"
              >
                <Eye className="w-4 h-4 text-[#9E9E9E]" />
                View Details
              </button>
            )}

            {!isActiveCycle && onSetActive && cycle.status === 'active' && (
              <>
                <div className="border-t border-[#E5E7EB] my-1"></div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(onSetActive);
                  }}
                  className="w-full px-4 py-2 text-left text-[13px] text-[#2F6B3C] hover:bg-[#F0F9F4] transition-colors flex items-center gap-3"
                >
                  <Star className="w-4 h-4" />
                  Set as Active Cycle
                </button>
              </>
            )}

            {onLockToggle && (
              <>
                <div className="border-t border-[#E5E7EB] my-1"></div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(onLockToggle);
                  }}
                  className="w-full px-4 py-2 text-left text-[13px] text-[#8C1D18] hover:bg-[#FFF0F0] transition-colors flex items-center gap-3"
                >
                  {cycle.status === 'locked' ? (
                    <>
                      <Unlock className="w-4 h-4" />
                      Unlock Cycle
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Lock Cycle
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}