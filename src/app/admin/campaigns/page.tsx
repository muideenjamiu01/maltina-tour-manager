'use client';
import React, { useState } from 'react';
import { Plus, Search, ChevronDown, ChevronRight, Calendar, TrendingUp, Check } from 'lucide-react';
import { AdminHeader } from '../../../components/admin/admin-header';
import { useSidebar } from '../layout';
import { CreateCampaignModal } from '../../../components/campaigns/CreateCampaignModal';
import { CampaignActionsMenu } from '../../../components/campaigns/CampaignActionsMenu';
import { CycleActionsMenu } from '../../../components/campaigns/CycleActionsMenu';
import { EditCampaignModal } from '../../../components/campaigns/EditCampaignModal';
import { CycleSettingsModal } from '../../../components/campaigns/CycleSettingsModal';
import { AddCycleModal } from '../../../components/campaigns/AddCycleModal';
import { ActiveCycleSelectorModal } from '../../../components/campaigns/ActiveCycleSelectorModal';
import { mockCampaigns, Campaign, Cycle } from '../../../components/campaigns/data/mockCampaignData';

// Helper function to format dates to international format
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export default function CampaignsPage() {
  // Sidebar context for mobile menu
  const { toggleSidebar } = useSidebar();
  
  // Create Campaign Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createStep, setCreateStep] = useState(1);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    startDate: '',
    endDate: '',
    numberOfCycles: 4,
    cycles: [] as Array<{
      label: string;
      startDate: string;
      endDate: string;
      targetSchools: number;
      targetChildren: number;
      enableTour: boolean;
      enableCompetition: boolean;
      tourTargets?: { schools: number; children: number; };
      competitionTargets?: { schools: number; children: number; };
    }>
  });

  // Other Modals
  const [showEditCampaignModal, setShowEditCampaignModal] = useState(false);
  const [selectedCampaignForEdit, setSelectedCampaignForEdit] = useState<Campaign | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showActiveCampaignModal, setShowActiveCampaignModal] = useState(false);
  const [showAddCycleModal, setShowAddCycleModal] = useState(false);
  const [selectedCampaignForCycle, setSelectedCampaignForCycle] = useState<Campaign | null>(null);
  const [selectedCycle, setSelectedCycle] = useState<Cycle | null>(null);

  // Filters and UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterYear, setFilterYear] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedCampaigns, setExpandedCampaigns] = useState<string[]>(['CMP-2026', 'CMP-2025']);
  const [activeCampaignId, setActiveCampaignId] = useState('CMP-2026');
  const [activeCycleId, setActiveCycleId] = useState('CMP-2026-Q1');

  const campaigns = mockCampaigns;
  const years = Array.from(new Set(campaigns.map(c => c.year))).sort((a, b) => b - a);

  // Calculate summary statistics
  const totalCampaigns = campaigns.length;
  const totalCycles = campaigns.reduce((sum, c) => sum + c.cycles.length, 0);
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const closedCampaigns = campaigns.filter(c => c.status === 'closed').length;
  const activeCycles = campaigns.reduce((sum, c) => sum + c.cycles.filter(cy => cy.status === 'active').length, 0);
  const totalSchoolsReached = campaigns.reduce((sum, c) => sum + c.totalAchievedSchools, 0);
  const totalChildrenReached = campaigns.reduce((sum, c) => sum + c.totalAchievedChildren, 0);

  // Filter campaigns
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.cycles.some(c => c.cycleLabel.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesYear = filterYear === 'all' || campaign.year === parseInt(filterYear);
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesYear && matchesStatus;
  });

  const toggleCampaign = (campaignId: string) => {
    setExpandedCampaigns(prev =>
      prev.includes(campaignId) ? prev.filter(id => id !== campaignId) : [...prev, campaignId]
    );
  };

  const getStatusBadge = (status: 'active' | 'locked' | 'draft' | 'closed') => {
    const config = {
      active: { bg: 'bg-[#2F6B3C]', text: 'Active' },
      locked: { bg: 'bg-[#8C1D18]', text: 'Locked' },
      draft: { bg: 'bg-[#C7C7C7]', text: 'Draft' },
      closed: { bg: 'bg-[#9E9E9E]', text: 'Closed' }
    };
    const statusConfig = config[status];
    return (
      <span className={`${statusConfig.bg} text-white px-2 py-1 rounded text-[11px]`}>
        {statusConfig.text}
      </span>
    );
  };

  const activeCycle = campaigns.flatMap(c => c.cycles).find(cy => cy.id === activeCycleId);

  const handleSetActiveCycle = (campaignId: string, cycleId: string) => {
    setActiveCampaignId(campaignId);
    setActiveCycleId(cycleId);
    setShowActiveCampaignModal(false);
  };

  // Campaign creation handlers
  const initializeCycles = (count: number) => {
    const cycles = Array.from({ length: count }, (_, i) => ({
      label: `Cycle ${i + 1}`,
      startDate: '',
      endDate: '',
      targetSchools: 0,
      targetChildren: 0,
      enableTour: true,
      enableCompetition: false,
      tourTargets: { schools: 0, children: 0 }
    }));
    setNewCampaign(prev => ({ ...prev, cycles, numberOfCycles: count }));
  };

  const resetCreateModal = () => {
    setShowCreateModal(false);
    setCreateStep(1);
    setNewCampaign({
      name: '',
      startDate: '',
      endDate: '',
      numberOfCycles: 4,
      cycles: []
    });
  };

  const handleNextStep = () => {
    if (createStep === 1) {
      initializeCycles(newCampaign.numberOfCycles);
    }
    setCreateStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCreateStep(prev => prev - 1);
  };

  const handleFinishCampaign = () => {
    console.log('Creating campaign:', newCampaign);
    resetCreateModal();
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <AdminHeader 
        title="Campaign Details"
        subtitle="View campaigns and their cycles, set active cycle for operations"
        screenCode="ADM-C01"
        showFilters={false}
        onToggleSidebar={toggleSidebar}
        actions={
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowActiveCampaignModal(true)}
              className="px-3 lg:px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[12px] lg:text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#F5A623]" />
              <div className="text-left hidden sm:block">
                <div className="text-[11px] text-[#9E9E9E]">Active Cycle</div>
                <div className="text-[13px] text-[#2B2B2B]">{activeCycle?.cycleLabel || 'None'}</div>
              </div>
              <ChevronDown className="w-4 h-4 text-[#9E9E9E]" />
            </button>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-3 lg:px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 lg:w-5 h-4 lg:h-5" />
              <span className="hidden sm:inline">Create Campaign</span>
              <span className="sm:hidden">Create</span>
            </button>
          </div>
        }
      />

      <div className="flex-1 overflow-auto px-4 lg:px-8 py-6 max-w-full">
        {/* Summary Statistics */}
        <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Total Campaigns</span>
              <Calendar className="w-4 h-4 text-[#F5A623]" />
            </div>
            <div className="text-[28px] text-[#2B2B2B]">{totalCampaigns}</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">{totalCycles} cycles total</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Active</span>
              <div className="w-2 h-2 bg-[#2F6B3C] rounded-full"></div>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-[28px] text-[#2B2B2B]">{activeCycles}</div>
              <div className="text-[13px] text-[#9E9E9E]">cycles</div>
            </div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">{activeCampaigns} campaigns running</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Completed</span>
              <Check className="w-4 h-4 text-[#2F6B3C]" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-[28px] text-[#2B2B2B]">{closedCampaigns}</div>
              <div className="text-[13px] text-[#9E9E9E]">campaigns</div>
            </div>
            <div className="text-[11px] text-[#2F6B3C] mt-1">
              {totalSchoolsReached.toLocaleString()} schools
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Total Impact</span>
              <TrendingUp className="w-4 h-4 text-[#2F6B3C]" />
            </div>
            <div className="text-[20px] text-[#2B2B2B]">{totalChildrenReached.toLocaleString()}</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">Children reached</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9E9E9E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search campaigns or cycles..."
              className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
            >
              <option value="all">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="locked">Locked</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-3 text-[13px] text-[#9E9E9E]">
          Showing {filteredCampaigns.length} campaigns
        </div>

        {/* Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="overflow-x-auto min-w-0">
            <table className="w-full min-w-[800px]">
              <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <tr>
                  <th className="px-4 py-3 text-left text-[12px] text-[#2B2B2B] w-[40px]"></th>
                  <th className="px-4 py-3 text-left text-[12px] text-[#2B2B2B]">Campaign / Cycle</th>
                  <th className="px-4 py-3 text-left text-[12px] text-[#2B2B2B]">Year</th>
                  <th className="px-4 py-3 text-left text-[12px] text-[#2B2B2B]">Period</th>
                  <th className="px-4 py-3 text-center text-[12px] text-[#2B2B2B]">Status</th>
                  <th className="px-4 py-3 text-right text-[12px] text-[#2B2B2B]">Schools</th>
                  <th className="px-4 py-3 text-right text-[12px] text-[#2B2B2B]">Children</th>
                  <th className="px-4 py-3 text-center text-[12px] text-[#2B2B2B]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.flatMap((campaign) => {
                  const isExpanded = expandedCampaigns.includes(campaign.id);
                  const progressSchools = campaign.totalTargetSchools > 0
                    ? Math.round((campaign.totalAchievedSchools / campaign.totalTargetSchools) * 100)
                    : 0;
                  const progressChildren = campaign.totalTargetChildren > 0
                    ? Math.round((campaign.totalAchievedChildren / campaign.totalTargetChildren) * 100)
                    : 0;

                  // Campaign Row
                  const campaignRow = (
                    <tr 
                      key={campaign.id}
                      className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                      onClick={() => toggleCampaign(campaign.id)}
                    >
                      <td className="px-4 py-4">
                        <button className="p-1 hover:bg-[#E5E7EB] rounded transition-colors">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-[#2B2B2B]" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-[#2B2B2B]" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="text-[14px] text-[#2B2B2B]">{campaign.name}</div>
                            <div className="text-[12px] text-[#9E9E9E]">{campaign.cycles.length} cycles</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-[14px] text-[#2B2B2B]">{campaign.year}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-[13px] text-[#9E9E9E]">Full Year</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        {getStatusBadge(campaign.status)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="text-[14px] text-[#2B2B2B]">
                          {campaign.totalAchievedSchools.toLocaleString()} / {campaign.totalTargetSchools.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-[#9E9E9E]">{progressSchools}%</div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="text-[14px] text-[#2B2B2B]">
                          {campaign.totalAchievedChildren.toLocaleString()} / {campaign.totalTargetChildren.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-[#9E9E9E]">{progressChildren}%</div>
                      </td>
                      <td className="px-4 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <CampaignActionsMenu
                          campaign={campaign}
                          onAddCycle={() => {
                            setSelectedCampaignForCycle(campaign);
                            setShowAddCycleModal(true);
                          }}
                          onConfigure={() => {
                            window.location.href = '/admin/campaigns/pipeline-builder';
                          }}
                          onEdit={() => {
                            setSelectedCampaignForEdit(campaign);
                            setShowEditCampaignModal(true);
                          }}
                          onClone={() => console.log('Clone campaign:', campaign.id)}
                          onStatusChange={(newStatus) => console.log('Status change:', newStatus)}
                        />
                      </td>
                    </tr>
                  );

                  // Cycle Rows (nested)
                  const cycleRows = isExpanded ? campaign.cycles.map((cycle) => {
                    const cycleProgressSchools = cycle.targetSchools > 0
                      ? Math.round((cycle.achievedSchools / cycle.targetSchools) * 100)
                      : 0;
                    const cycleProgressChildren = cycle.targetChildren > 0
                      ? Math.round((cycle.achievedChildren / cycle.targetChildren) * 100)
                      : 0;
                    const isActiveCycle = cycle.id === activeCycleId;

                    return (
                      <tr 
                        key={cycle.id}
                        className={`border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors ${
                          isActiveCycle ? 'bg-[#FFF4E6]' : ''
                        }`}
                      >
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 pl-6">
                            {isActiveCycle && (
                              <div className="w-2 h-2 bg-[#F5A623] rounded-full" title="Active Cycle"></div>
                            )}
                            <div className="text-[13px] text-[#2B2B2B]">{cycle.cycleLabel}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[13px] text-[#9E9E9E]">—</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-[12px] text-[#2B2B2B]">
                            {formatDate(cycle.startDate)} – {formatDate(cycle.endDate)}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {getStatusBadge(cycle.status)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="text-[13px] text-[#2B2B2B]">
                            {cycle.achievedSchools.toLocaleString()} / {cycle.targetSchools.toLocaleString()}
                          </div>
                          <div className="text-[11px] text-[#9E9E9E]">{cycleProgressSchools}%</div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="text-[13px] text-[#2B2B2B]">
                            {cycle.achievedChildren.toLocaleString()} / {cycle.targetChildren.toLocaleString()}
                          </div>
                          <div className="text-[11px] text-[#9E9E9E]">{cycleProgressChildren}%</div>
                        </td>
                        <td className="px-4 py-3">
                          <CycleActionsMenu
                            cycle={cycle}
                            isActiveCycle={isActiveCycle}
                            onSettings={() => {
                              setSelectedCycle(cycle);
                              setShowSettingsModal(true);
                            }}
                            onEdit={() => console.log('Edit cycle:', cycle.id)}
                            onClone={() => console.log('Clone cycle:', cycle.id)}
                            onView={() => console.log('View cycle:', cycle.id)}
                            onSetActive={() => handleSetActiveCycle(campaign.id, cycle.id)}
                            onLockToggle={() => console.log('Toggle lock:', cycle.id)}
                          />
                        </td>
                      </tr>
                    );
                  }) : [];

                  return [campaignRow, ...cycleRows];
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ActiveCycleSelectorModal
        isOpen={showActiveCampaignModal}
        campaigns={campaigns}
        activeCycleId={activeCycleId}
        onClose={() => setShowActiveCampaignModal(false)}
        onSelectCycle={handleSetActiveCycle}
      />

      <CreateCampaignModal
        isOpen={showCreateModal}
        onClose={resetCreateModal}
        formData={newCampaign}
        setFormData={setNewCampaign}
        currentStep={createStep}
        setCurrentStep={setCreateStep}
        onNext={handleNextStep}
        onPrev={handlePrevStep}
        onFinish={handleFinishCampaign}
      />

      <EditCampaignModal
        isOpen={showEditCampaignModal}
        campaign={selectedCampaignForEdit}
        onClose={() => setShowEditCampaignModal(false)}
      />

      <CycleSettingsModal
        isOpen={showSettingsModal}
        cycle={selectedCycle}
        onClose={() => setShowSettingsModal(false)}
      />

      <AddCycleModal
        isOpen={showAddCycleModal}
        campaign={selectedCampaignForCycle}
        onClose={() => setShowAddCycleModal(false)}
      />
    </div>
  );
}
