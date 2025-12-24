import React from 'react';
import { X, Check } from 'lucide-react';
import { Campaign } from './data/mockCampaignData';

interface ActiveCycleSelectorModalProps {
  isOpen: boolean;
  campaigns: Campaign[];
  activeCycleId: string;
  onClose: () => void;
  onSelectCycle: (campaignId: string, cycleId: string) => void;
}

// Helper function to format dates to international format
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function ActiveCycleSelectorModal({ 
  isOpen, 
  campaigns, 
  activeCycleId, 
  onClose, 
  onSelectCycle 
}: ActiveCycleSelectorModalProps) {
  if (!isOpen) return null;

  const handleSelectCycle = (campaignId: string, cycleId: string) => {
    onSelectCycle(campaignId, cycleId);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <h2 className="text-[18px] text-[#2B2B2B]">Select Active Cycle</h2>
            <p className="text-[13px] text-[#9E9E9E]">Choose the cycle for current operations</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9E9E9E]" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="space-y-4">
            {campaigns.filter(c => c.cycles.some(cy => cy.status === 'active')).map((campaign) => (
              <div key={campaign.id} className="space-y-2">
                <div className="text-[13px] text-[#9E9E9E]">{campaign.name}</div>
                {campaign.cycles.filter(cy => cy.status === 'active').map((cycle) => (
                  <button
                    key={cycle.id}
                    onClick={() => handleSelectCycle(campaign.id, cycle.id)}
                    className={`w-full p-4 border rounded-lg text-left transition-all ${
                      cycle.id === activeCycleId
                        ? 'border-[#F5A623] bg-[#FFF4E6]'
                        : 'border-[#E5E7EB] hover:border-[#F5A623] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[14px] text-[#2B2B2B] mb-1">{cycle.cycleLabel}</div>
                        <div className="text-[12px] text-[#9E9E9E]">
                          {formatDate(cycle.startDate)} – {formatDate(cycle.endDate)}
                        </div>
                      </div>
                      {cycle.id === activeCycleId && (
                        <div className="flex items-center gap-2 text-[12px] text-[#F5A623]">
                          <Check className="w-4 h-4" />
                          Active
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}