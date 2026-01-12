import React from 'react';
import { X, Clock } from 'lucide-react';
import { Cycle } from './data/mockCampaignData';

interface CycleSettingsModalProps {
  isOpen: boolean;
  cycle: Cycle | null;
  onClose: () => void;
  onSave?: (cycle: Cycle) => void;
}

export function CycleSettingsModal({ isOpen, cycle, onClose, onSave }: CycleSettingsModalProps) {
  if (!isOpen || !cycle) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <h2 className="text-[18px] text-[#2B2B2B]">Cycle Settings</h2>
            <p className="text-[13px] text-[#9E9E9E]">{cycle.cycleLabel}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9E9E9E]" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-[13px] text-[#2B2B2B] mb-3">
              <Clock className="w-4 h-4 text-[#F5A623]" />
              Submission Deadlines
            </div>
            <div>
              <label className="block text-[12px] text-[#9E9E9E] mb-1.5">RECEE Officers</label>
              <div className="text-[13px] text-[#2B2B2B]">{cycle.submissionDeadline.receeOfficers}</div>
            </div>
            <div>
              <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Tour Supervisors</label>
              <div className="text-[13px] text-[#2B2B2B]">{cycle.submissionDeadline.tourSupervisors}</div>
            </div>
            <div>
              <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Tour Analysts</label>
              <div className="text-[13px] text-[#2B2B2B]">{cycle.submissionDeadline.tourAnalysts}</div>
            </div>
          </div>

          <div>
            <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Cycle Status</label>
            <select 
              defaultValue={cycle.status}
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="locked">Locked</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="p-6 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}