import React from 'react';
import { X } from 'lucide-react';
import { Campaign } from './data/mockCampaignData';

interface EditCampaignModalProps {
  isOpen: boolean;
  campaign: Campaign | null;
  onClose: () => void;
  onSave?: (campaign: Campaign) => void;
}

export function EditCampaignModal({ isOpen, campaign, onClose, onSave }: EditCampaignModalProps) {
  if (!isOpen || !campaign) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <h2 className="text-[18px] text-[#2B2B2B]">Edit Campaign</h2>
            <p className="text-[13px] text-[#9E9E9E]">{campaign.id}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9E9E9E]" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Campaign Name</label>
            <input
              type="text"
              defaultValue={campaign.name}
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Year</label>
            <select 
              defaultValue={campaign.year}
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Campaign Status</label>
            <select 
              defaultValue={campaign.status}
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="locked">Locked</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Target Schools</label>
              <input
                type="number"
                defaultValue={campaign.totalTargetSchools}
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Target Children</label>
              <input
                type="number"
                defaultValue={campaign.totalTargetChildren}
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              />
            </div>
          </div>

          <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[12px] text-[#9E9E9E]">
            Campaign has {campaign.cycles.length} cycle{campaign.cycles.length !== 1 ? 's' : ''}. Use the "+ Cycle" button to add more cycles.
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
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}