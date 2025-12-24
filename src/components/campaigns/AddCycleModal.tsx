import React from 'react';
import { X } from 'lucide-react';
import { Campaign } from './data/mockCampaignData';

interface AddCycleModalProps {
  isOpen: boolean;
  campaign: Campaign | null;
  onClose: () => void;
  onAdd?: () => void;
}

export function AddCycleModal({ isOpen, campaign, onClose, onAdd }: AddCycleModalProps) {
  if (!isOpen || !campaign) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <h2 className="text-[18px] text-[#2B2B2B]">Add New Cycle</h2>
            <p className="text-[13px] text-[#9E9E9E]">{campaign.name}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9E9E9E]" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Cycle Label</label>
              <input
                type="text"
                placeholder="e.g. Q1 2027"
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Cycle Type</label>
              <select className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent">
                <option value="Q1">Q1 (Quarter 1)</option>
                <option value="Q2">Q2 (Quarter 2)</option>
                <option value="Q3">Q3 (Quarter 3)</option>
                <option value="Q4">Q4 (Quarter 4)</option>
                <option value="H1">H1 (Half 1)</option>
                <option value="H2">H2 (Half 2)</option>
                <option value="Annual">Annual</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Start Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-[12px] text-[#9E9E9E] mb-1.5">End Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Target Schools</label>
              <input
                type="number"
                placeholder="500"
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Target Children</label>
              <input
                type="number"
                placeholder="75000"
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Initial Status</label>
            <select className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent">
              <option value="draft">Draft</option>
              <option value="active">Active</option>
            </select>
          </div>

          <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[12px] text-[#9E9E9E]">
            Submission deadlines will be automatically calculated based on the end date.
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
            Add Cycle
          </button>
        </div>
      </div>
    </div>
  );
}