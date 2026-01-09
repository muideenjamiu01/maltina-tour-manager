'use client'
import { useState } from 'react';
import { Plus, Search, Trophy, Calendar, Play, Square, Eye, Settings, Filter, TrendingUp, Users, Award, X, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { AdminHeader } from '@/components/admin/admin-header';

interface Competition {
  id: string;
  name: string;
  campaignId: string;
  campaignName: string;
  cycleId: string;
  cycleLabel: string;
  status: 'draft' | 'active' | 'paused' | 'judging' | 'voting' | 'closed';
  startDate: string;
  endDate: string;
  category: 'design' | 'essay' | 'video' | 'photo';
  totalEntries: number;
  verifiedEntries: number;
  shortlistedEntries: number;
  targetParticipants: number;
  prizes: {
    first: string;
    second: string;
    third: string;
  };
  createdBy: string;
  createdDate: string;
}

// Helper function to format dates
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export default function CompetitionManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCampaign, setFilterCampaign] = useState('all');
  const [filterCycle, setFilterCycle] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);

  const competitions: Competition[] = [
    {
      id: 'COMP-2026-Q1-001',
      name: 'Maltina Bottle Design Challenge',
      campaignId: 'CMP-2026',
      campaignName: 'Maltina School Tour 2026',
      cycleId: 'CMP-2026-Q1',
      cycleLabel: 'Q1 2026',
      status: 'active',
      startDate: '2026-02-01',
      endDate: '2026-03-15',
      category: 'design',
      totalEntries: 1247,
      verifiedEntries: 1189,
      shortlistedEntries: 50,
      targetParticipants: 2000,
      prizes: {
        first: '₦100,000 + Trophy',
        second: '₦50,000 + Medal',
        third: '₦25,000 + Medal'
      },
      createdBy: 'Campaign Manager',
      createdDate: '2026-01-15'
    },
    {
      id: 'COMP-2026-Q1-002',
      name: 'Nutrition Essay Competition',
      campaignId: 'CMP-2026',
      campaignName: 'Maltina School Tour 2026',
      cycleId: 'CMP-2026-Q1',
      cycleLabel: 'Q1 2026',
      status: 'active',
      startDate: '2026-02-01',
      endDate: '2026-03-15',
      category: 'essay',
      totalEntries: 856,
      verifiedEntries: 823,
      shortlistedEntries: 30,
      targetParticipants: 1500,
      prizes: {
        first: '₦75,000 + Trophy',
        second: '₦40,000 + Medal',
        third: '₦20,000 + Medal'
      },
      createdBy: 'Campaign Manager',
      createdDate: '2026-01-15'
    },
    {
      id: 'COMP-2025-Q4-001',
      name: 'Maltina Moments Photo Contest',
      campaignId: 'CMP-2025',
      campaignName: 'Maltina School Tour 2025',
      cycleId: 'CMP-2025-Q4',
      cycleLabel: 'Q4 2025',
      status: 'closed',
      startDate: '2025-11-01',
      endDate: '2025-12-15',
      category: 'photo',
      totalEntries: 2134,
      verifiedEntries: 2134,
      shortlistedEntries: 100,
      targetParticipants: 2500,
      prizes: {
        first: '₦80,000 + Camera',
        second: '₦50,000 + Medal',
        third: '₦30,000 + Medal'
      },
      createdBy: 'Campaign Manager',
      createdDate: '2025-10-15'
    },
    {
      id: 'COMP-2025-Q3-001',
      name: 'Healthy Living Video Challenge',
      campaignId: 'CMP-2025',
      campaignName: 'Maltina School Tour 2025',
      cycleId: 'CMP-2025-Q3',
      cycleLabel: 'Q3 2025',
      status: 'closed',
      startDate: '2025-08-01',
      endDate: '2025-09-30',
      category: 'video',
      totalEntries: 456,
      verifiedEntries: 456,
      shortlistedEntries: 20,
      targetParticipants: 800,
      prizes: {
        first: '₦120,000 + Trophy',
        second: '₦60,000 + Medal',
        third: '₦30,000 + Medal'
      },
      createdBy: 'Campaign Manager',
      createdDate: '2025-07-15'
    },
    {
      id: 'COMP-2026-Q2-001',
      name: 'Maltina Brand Ambassador Challenge',
      campaignId: 'CMP-2026',
      campaignName: 'Maltina School Tour 2026',
      cycleId: 'CMP-2026-Q2',
      cycleLabel: 'Q2 2026',
      status: 'draft',
      startDate: '2026-05-01',
      endDate: '2026-06-15',
      category: 'video',
      totalEntries: 0,
      verifiedEntries: 0,
      shortlistedEntries: 0,
      targetParticipants: 1000,
      prizes: {
        first: '₦150,000 + Trophy',
        second: '₦80,000 + Medal',
        third: '₦40,000 + Medal'
      },
      createdBy: 'Campaign Manager',
      createdDate: '2026-01-20'
    }
  ];

  // Get unique campaigns and cycles for filters
  const campaigns = Array.from(new Set(competitions.map(c => ({ id: c.campaignId, name: c.campaignName }))
    .map(c => JSON.stringify(c)))).map(c => JSON.parse(c));
  
  const cycles = filterCampaign === 'all' 
    ? Array.from(new Set(competitions.map(c => ({ id: c.cycleId, label: c.cycleLabel }))
        .map(c => JSON.stringify(c)))).map(c => JSON.parse(c))
    : Array.from(new Set(competitions
        .filter(c => c.campaignId === filterCampaign)
        .map(c => ({ id: c.cycleId, label: c.cycleLabel }))
        .map(c => JSON.stringify(c)))).map(c => JSON.parse(c));

  // Filter competitions
  const filteredCompetitions = competitions.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comp.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCampaign = filterCampaign === 'all' || comp.campaignId === filterCampaign;
    const matchesCycle = filterCycle === 'all' || comp.cycleId === filterCycle;
    const matchesStatus = filterStatus === 'all' || comp.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || comp.category === filterCategory;
    return matchesSearch && matchesCampaign && matchesCycle && matchesStatus && matchesCategory;
  });

  // Summary statistics
  const totalCompetitions = competitions.length;
  const activeCompetitions = competitions.filter(c => c.status === 'active').length;
  const totalEntries = competitions.reduce((sum, c) => sum + c.totalEntries, 0);
  const totalParticipants = competitions.reduce((sum, c) => sum + c.verifiedEntries, 0);

  const getStatusBadge = (status: Competition['status']) => {
    const config = {
      draft: { bg: 'bg-[#C7C7C7]', text: 'Draft' },
      active: { bg: 'bg-[#2F6B3C]', text: 'Active' },
      paused: { bg: 'bg-[#D4A017]', text: 'Paused' },
      judging: { bg: 'bg-[#F5A623]', text: 'Judging' },
      voting: { bg: 'bg-[#F5A623]', text: 'Voting' },
      closed: { bg: 'bg-[#9E9E9E]', text: 'Closed' }
    };
    
    const statusConfig = config[status];
    
    return (
      <span className={`${statusConfig.bg} text-white px-2 py-1 rounded text-[11px]`}>
        {statusConfig.text}
      </span>
    );
  };

  const getCategoryIcon = (category: Competition['category']) => {
    switch (category) {
      case 'design': return '🎨';
      case 'essay': return '📝';
      case 'video': return '🎥';
      case 'photo': return '📸';
    }
  };

  const handleStartCompetition = (comp: Competition) => {
    alert(`Starting competition: ${comp.name}`);
  };

  const handleStopCompetition = (comp: Competition) => {
    alert(`Stopping competition: ${comp.name}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader 
        title="Competition Manager"
        subtitle="Create and manage competitions across campaigns and cycles"
        screenCode="ADM-COMP01"
        actions={
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Competition
          </button>
        }
      />

      <div className="max-w-[1200px] mx-auto py-8">
        {/* Summary Statistics */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Total Competitions</span>
              <Trophy className="w-4 h-4 text-[#F5A623]" />
            </div>
            <div className="text-[28px] text-[#2B2B2B]">{totalCompetitions}</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">{activeCompetitions} currently active</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Total Entries</span>
              <Award className="w-4 h-4 text-[#F5A623]" />
            </div>
            <div className="text-[28px] text-[#2B2B2B]">{totalEntries.toLocaleString()}</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">All competitions combined</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Verified Participants</span>
              <Users className="w-4 h-4 text-[#2F6B3C]" />
            </div>
            <div className="text-[28px] text-[#2B2B2B]">{totalParticipants.toLocaleString()}</div>
            <div className="text-[11px] text-[#2F6B3C] mt-1">Eligible for judging</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Completion Rate</span>
              <TrendingUp className="w-4 h-4 text-[#2F6B3C]" />
            </div>
            <div className="text-[28px] text-[#2B2B2B]">
              {totalEntries > 0 ? Math.round((totalParticipants / totalEntries) * 100) : 0}%
            </div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">Entry verification rate</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9E9E9E]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search competitions..."
                className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              />
            </div>

            <select
              value={filterCampaign}
              onChange={(e) => {
                setFilterCampaign(e.target.value);
                setFilterCycle('all');
              }}
              className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
            >
              <option value="all">All Campaigns</option>
              {campaigns.map(campaign => (
                <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
              ))}
            </select>

            <select
              value={filterCycle}
              onChange={(e) => setFilterCycle(e.target.value)}
              className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
            >
              <option value="all">All Cycles</option>
              {cycles.map(cycle => (
                <option key={cycle.id} value={cycle.id}>{cycle.label}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="judging">Judging</option>
              <option value="voting">Voting</option>
              <option value="closed">Closed</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="design">Design</option>
              <option value="essay">Essay</option>
              <option value="video">Video</option>
              <option value="photo">Photo</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-3 text-[13px] text-[#9E9E9E]">
          Showing {filteredCompetitions.length} competitions
        </div>

        {/* Competitions Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredCompetitions.map((comp) => (
            <div 
              key={comp.id}
              className="bg-white border border-[#E5E7EB] rounded-lg p-6 hover:border-[#F5A623] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[24px]">{getCategoryIcon(comp.category)}</span>
                    <div>
                      <h3 className="text-[16px] text-[#2B2B2B]">{comp.name}</h3>
                      <div className="flex items-center gap-2 text-[12px] text-[#9E9E9E] mt-0.5">
                        <span>{comp.cycleLabel}</span>
                        <span>•</span>
                        <span>{comp.id}</span>
                        <span>•</span>
                        <span className="capitalize">{comp.category}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {getStatusBadge(comp.status)}
                </div>
              </div>

              <div className="grid grid-cols-6 gap-4 mb-4">
                <div>
                  <div className="text-[11px] text-[#9E9E9E] mb-1">Period</div>
                  <div className="text-[13px] text-[#2B2B2B]">
                    {formatDate(comp.startDate)} – {formatDate(comp.endDate)}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-[#9E9E9E] mb-1">Total Entries</div>
                  <div className="text-[16px] text-[#2B2B2B]">{comp.totalEntries.toLocaleString()}</div>
                  <div className="text-[11px] text-[#9E9E9E]">of {comp.targetParticipants.toLocaleString()} target</div>
                </div>

                <div>
                  <div className="text-[11px] text-[#9E9E9E] mb-1">Verified</div>
                  <div className="text-[16px] text-[#2F6B3C]">{comp.verifiedEntries.toLocaleString()}</div>
                  <div className="text-[11px] text-[#9E9E9E]">
                    {comp.totalEntries > 0 ? Math.round((comp.verifiedEntries / comp.totalEntries) * 100) : 0}% verified
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-[#9E9E9E] mb-1">Shortlisted</div>
                  <div className="text-[16px] text-[#F5A623]">{comp.shortlistedEntries}</div>
                  <div className="text-[11px] text-[#9E9E9E]">finalists</div>
                </div>

                <div>
                  <div className="text-[11px] text-[#9E9E9E] mb-1">First Prize</div>
                  <div className="text-[13px] text-[#2B2B2B]">{comp.prizes.first}</div>
                </div>

                <div className="flex items-center justify-end gap-2">
                  {comp.status === 'draft' && (
                    <button 
                      onClick={() => handleStartCompetition(comp)}
                      className="px-3 py-1.5 bg-[#2F6B3C] text-white rounded-lg hover:bg-[#25562F] transition-colors flex items-center gap-1.5 text-[12px]"
                    >
                      <Play className="w-3.5 h-3.5" />
                      Start
                    </button>
                  )}
                  {comp.status === 'active' && (
                    <button 
                      onClick={() => handleStopCompetition(comp)}
                      className="px-3 py-1.5 bg-[#8C1D18] text-white rounded-lg hover:bg-[#6F1713] transition-colors flex items-center gap-1.5 text-[12px]"
                    >
                      <Square className="w-3.5 h-3.5" />
                      Stop
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      setSelectedCompetition(comp);
                      setShowDetailsModal(true);
                    }}
                    className="px-3 py-1.5 bg-white border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F9FAFB] transition-colors flex items-center gap-1.5 text-[12px]"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F9FAFB] transition-colors flex items-center gap-1.5 text-[12px]">
                    <Settings className="w-3.5 h-3.5" />
                    Settings
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#F9FAFB] rounded-full h-2">
                <div 
                  className="bg-[#F5A623] h-2 rounded-full transition-all"
                  style={{ 
                    width: `${Math.min((comp.totalEntries / comp.targetParticipants) * 100, 100)}%` 
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {filteredCompetitions.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
            <p className="text-[14px] text-[#9E9E9E]">No competitions found</p>
          </div>
        )}
      </div>

      {/* Create Competition Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-[18px] text-[#2B2B2B]">Create New Competition</h2>
                <p className="text-[13px] text-[#9E9E9E]">Set up a competition for a campaign cycle</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#9E9E9E]" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Competition Name</label>
                <input
                  type="text"
                  placeholder="e.g. Maltina Bottle Design Challenge"
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Campaign</label>
                  <select className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent">
                    <option value="">Select campaign</option>
                    <option value="CMP-2026">Maltina School Tour 2026</option>
                    <option value="CMP-2027">Maltina School Tour 2027</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Cycle</label>
                  <select className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent">
                    <option value="">Select cycle</option>
                    <option value="CMP-2026-Q1">Q1 2026</option>
                    <option value="CMP-2026-Q2">Q2 2026</option>
                    <option value="CMP-2026-Q3">Q3 2026</option>
                    <option value="CMP-2026-Q4">Q4 2026</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Category</label>
                <select className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent">
                  <option value="">Select category</option>
                  <option value="design">🎨 Design</option>
                  <option value="essay">📝 Essay</option>
                  <option value="video">🎥 Video</option>
                  <option value="photo">📸 Photo</option>
                </select>
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

              <div>
                <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Target Participants</label>
                <input
                  type="number"
                  placeholder="2000"
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                />
              </div>

              <div className="border-t border-[#E5E7EB] pt-4">
                <h3 className="text-[14px] text-[#2B2B2B] mb-3">Prize Structure</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-[12px] text-[#9E9E9E] mb-1.5">1st Place Prize</label>
                    <input
                      type="text"
                      placeholder="e.g. ₦100,000 + Trophy"
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] text-[#9E9E9E] mb-1.5">2nd Place Prize</label>
                    <input
                      type="text"
                      placeholder="e.g. ₦50,000 + Medal"
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] text-[#9E9E9E] mb-1.5">3rd Place Prize</label>
                    <input
                      type="text"
                      placeholder="e.g. ₦25,000 + Medal"
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[12px] text-[#9E9E9E]">
                Competition will be created in Draft status. You can start it when ready.
              </div>
            </div>

            <div className="p-6 border-t border-[#E5E7EB] flex items-center justify-end gap-3 sticky bottom-0 bg-white">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors">
                Create Competition
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedCompetition && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-[18px] text-[#2B2B2B]">{selectedCompetition.name}</h2>
                <p className="text-[13px] text-[#9E9E9E]">{selectedCompetition.id}</p>
              </div>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#9E9E9E]" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-[32px]">{getCategoryIcon(selectedCompetition.category)}</span>
                  <div>
                    <div className="text-[14px] text-[#2B2B2B] mb-1">Competition Status</div>
                    {getStatusBadge(selectedCompetition.status)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-[#9E9E9E]">Created by</div>
                  <div className="text-[13px] text-[#2B2B2B]">{selectedCompetition.createdBy}</div>
                  <div className="text-[11px] text-[#9E9E9E]">{formatDate(selectedCompetition.createdDate)}</div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] text-[#9E9E9E] mb-1">Campaign</div>
                  <div className="text-[13px] text-[#2B2B2B]">{selectedCompetition.campaignName}</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#9E9E9E] mb-1">Cycle</div>
                  <div className="text-[13px] text-[#2B2B2B]">{selectedCompetition.cycleLabel}</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#9E9E9E] mb-1">Category</div>
                  <div className="text-[13px] text-[#2B2B2B] capitalize">{selectedCompetition.category}</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#9E9E9E] mb-1">Competition Period</div>
                  <div className="text-[13px] text-[#2B2B2B]">
                    {formatDate(selectedCompetition.startDate)} – {formatDate(selectedCompetition.endDate)}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="border-t border-[#E5E7EB] pt-4">
                <h3 className="text-[14px] text-[#2B2B2B] mb-3">Participation Metrics</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-3 bg-[#F9FAFB] rounded-lg">
                    <div className="text-[11px] text-[#9E9E9E] mb-1">Target</div>
                    <div className="text-[20px] text-[#2B2B2B]">{selectedCompetition.targetParticipants.toLocaleString()}</div>
                  </div>
                  <div className="p-3 bg-[#F9FAFB] rounded-lg">
                    <div className="text-[11px] text-[#9E9E9E] mb-1">Total Entries</div>
                    <div className="text-[20px] text-[#2B2B2B]">{selectedCompetition.totalEntries.toLocaleString()}</div>
                  </div>
                  <div className="p-3 bg-[#F9FAFB] rounded-lg">
                    <div className="text-[11px] text-[#9E9E9E] mb-1">Verified</div>
                    <div className="text-[20px] text-[#2F6B3C]">{selectedCompetition.verifiedEntries.toLocaleString()}</div>
                  </div>
                  <div className="p-3 bg-[#F9FAFB] rounded-lg">
                    <div className="text-[11px] text-[#9E9E9E] mb-1">Shortlisted</div>
                    <div className="text-[20px] text-[#F5A623]">{selectedCompetition.shortlistedEntries}</div>
                  </div>
                </div>
              </div>

              {/* Prizes */}
              <div className="border-t border-[#E5E7EB] pt-4">
                <h3 className="text-[14px] text-[#2B2B2B] mb-3">Prize Structure</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border border-[#E5E7EB] rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-[20px]">🥇</span>
                      <span className="text-[13px] text-[#2B2B2B]">1st Place</span>
                    </div>
                    <span className="text-[14px] text-[#2B2B2B]">{selectedCompetition.prizes.first}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-[#E5E7EB] rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-[20px]">🥈</span>
                      <span className="text-[13px] text-[#2B2B2B]">2nd Place</span>
                    </div>
                    <span className="text-[14px] text-[#2B2B2B]">{selectedCompetition.prizes.second}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-[#E5E7EB] rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-[20px]">🥉</span>
                      <span className="text-[13px] text-[#2B2B2B]">3rd Place</span>
                    </div>
                    <span className="text-[14px] text-[#2B2B2B]">{selectedCompetition.prizes.third}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#E5E7EB] flex items-center justify-between sticky bottom-0 bg-white">
              <div className="flex items-center gap-2">
                {selectedCompetition.status === 'draft' && (
                  <button 
                    onClick={() => handleStartCompetition(selectedCompetition)}
                    className="px-4 py-2 bg-[#2F6B3C] text-white rounded-lg hover:bg-[#25562F] transition-colors flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Start Competition
                  </button>
                )}
                {selectedCompetition.status === 'active' && (
                  <button 
                    onClick={() => handleStopCompetition(selectedCompetition)}
                    className="px-4 py-2 bg-[#8C1D18] text-white rounded-lg hover:bg-[#6F1713] transition-colors flex items-center gap-2"
                  >
                    <Square className="w-4 h-4" />
                    Stop Competition
                  </button>
                )}
                <button className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F9FAFB] transition-colors flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Edit Settings
                </button>
              </div>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
