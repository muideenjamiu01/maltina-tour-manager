'use client';

import React, { useState } from 'react';
import { ArrowLeft, Plus, Settings, Trash2, GripVertical, ChevronDown, ChevronRight, FileText, Trophy, Calendar, Eye, Edit, Copy, Library, Layout } from 'lucide-react';
import { AdminHeader } from '@/components/admin/admin-header';
import { useSidebar } from '../../layout';

interface Activity {
  id: string;
  name: string;
  type: 'form' | 'survey' | 'document';
  formId?: string;
}

interface Stage {
  id: string;
  name: string;
  order: number;
  activities: Activity[];
}

interface Pipeline {
  type: 'tour' | 'competition';
  enabled: boolean;
  stages: Stage[];
  competitionConfig?: {
    competitionName: string;
    categories: Array<{
      id: string;
      name: string;
      finalistsCount: number;
    }>;
  };
}

interface Cycle {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  tourPipeline: Pipeline;
  competitionPipeline: Pipeline;
}

interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  cycles: Cycle[];
}

// Mock campaign data - in real app, this would come from props/route params
const mockCampaign: Campaign = {
  id: 'CMP-2026',
  name: 'Maltina School Tour 2026',
  startDate: '2026-01-15',
  endDate: '2026-09-30',
  cycles: [
    {
      id: 'CYC-Q1-2026',
      label: 'Q1 2026',
      startDate: '2026-01-15',
      endDate: '2026-03-31',
      tourPipeline: {
        type: 'tour',
        enabled: true,
        stages: [
          {
            id: 'STAGE-NOM',
            name: 'Nominate',
            order: 1,
            activities: []
          },
          {
            id: 'STAGE-CONFIRM',
            name: 'School Confirm Interest',
            order: 2,
            activities: []
          },
          {
            id: 'STAGE-RECEE',
            name: 'RECEE Inspect',
            order: 3,
            activities: []
          },
          {
            id: 'STAGE-BOOK',
            name: 'School Book Date',
            order: 4,
            activities: []
          },
          {
            id: 'STAGE-TOUR',
            name: 'School Tour',
            order: 5,
            activities: []
          }
        ]
      },
      competitionPipeline: {
        type: 'competition',
        enabled: true,
        stages: [
          {
            id: 'STAGE-SUBMIT',
            name: 'Submit Design',
            order: 1,
            activities: []
          },
          {
            id: 'STAGE-JUDGE',
            name: 'Judge Scoring',
            order: 2,
            activities: []
          },
          {
            id: 'STAGE-SHORTLIST',
            name: 'Shortlist for Public Vote',
            order: 3,
            activities: []
          },
          {
            id: 'STAGE-FINAL',
            name: 'Final',
            order: 4,
            activities: []
          }
        ],
        competitionConfig: {
          competitionName: 'Book Writing Competition',
          categories: []
        }
      }
    },
    {
      id: 'CYC-Q2-2026',
      label: 'Q2 2026',
      startDate: '2026-04-15',
      endDate: '2026-06-30',
      tourPipeline: {
        type: 'tour',
        enabled: true,
        stages: [
          {
            id: 'STAGE-NOM-Q2',
            name: 'Nominate',
            order: 1,
            activities: []
          },
          {
            id: 'STAGE-CONFIRM-Q2',
            name: 'School Confirm Interest',
            order: 2,
            activities: []
          },
          {
            id: 'STAGE-RECEE-Q2',
            name: 'RECEE Inspect',
            order: 3,
            activities: []
          },
          {
            id: 'STAGE-BOOK-Q2',
            name: 'School Book Date',
            order: 4,
            activities: []
          },
          {
            id: 'STAGE-TOUR-Q2',
            name: 'School Tour',
            order: 5,
            activities: []
          }
        ]
      },
      competitionPipeline: {
        type: 'competition',
        enabled: true,
        stages: [
          {
            id: 'STAGE-SUBMIT-Q2',
            name: 'Submit Design',
            order: 1,
            activities: []
          },
          {
            id: 'STAGE-JUDGE-Q2',
            name: 'Judge Scoring',
            order: 2,
            activities: []
          },
          {
            id: 'STAGE-SHORTLIST-Q2',
            name: 'Shortlist for Public Vote',
            order: 3,
            activities: []
          },
          {
            id: 'STAGE-FINAL-Q2',
            name: 'Final',
            order: 4,
            activities: []
          }
        ],
        competitionConfig: {
          competitionName: 'Book Writing Competition',
          categories: []
        }
      }
    },
    {
      id: 'CYC-Q3-2026',
      label: 'Q3 2026',
      startDate: '2026-07-15',
      endDate: '2026-09-30',
      tourPipeline: {
        type: 'tour',
        enabled: true,
        stages: [
          {
            id: 'STAGE-NOM-Q3',
            name: 'Nominate',
            order: 1,
            activities: []
          },
          {
            id: 'STAGE-CONFIRM-Q3',
            name: 'School Confirm Interest',
            order: 2,
            activities: []
          },
          {
            id: 'STAGE-RECEE-Q3',
            name: 'RECEE Inspect',
            order: 3,
            activities: []
          },
          {
            id: 'STAGE-BOOK-Q3',
            name: 'School Book Date',
            order: 4,
            activities: []
          },
          {
            id: 'STAGE-TOUR-Q3',
            name: 'School Tour',
            order: 5,
            activities: []
          }
        ]
      },
      competitionPipeline: {
        type: 'competition',
        enabled: true,
        stages: [
          {
            id: 'STAGE-SUBMIT-Q3',
            name: 'Submit Design',
            order: 1,
            activities: []
          },
          {
            id: 'STAGE-JUDGE-Q3',
            name: 'Judge Scoring',
            order: 2,
            activities: []
          },
          {
            id: 'STAGE-SHORTLIST-Q3',
            name: 'Shortlist for Public Vote',
            order: 3,
            activities: []
          },
          {
            id: 'STAGE-FINAL-Q3',
            name: 'Final',
            order: 4,
            activities: []
          }
        ],
        competitionConfig: {
          competitionName: 'Book Writing Competition',
          categories: []
        }
      }
    }
  ]
};

export default function PipelineBuilderPage() {
  const { toggleSidebar } = useSidebar();
  const [campaign, setCampaign] = useState<Campaign>(mockCampaign);
  const [selectedCycleId, setSelectedCycleId] = useState<string>(campaign.cycles[0]?.id);
  const [expandedPipelines, setExpandedPipelines] = useState<string[]>(['tour', 'competition']);
  const [expandedStages, setExpandedStages] = useState<string[]>([]);
  const [showAddStageModal, setShowAddStageModal] = useState(false);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [showCompetitionConfigModal, setShowCompetitionConfigModal] = useState(false);
  const [selectedPipelineType, setSelectedPipelineType] = useState<'tour' | 'competition'>('tour');
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [newStageName, setNewStageName] = useState('');

  const selectedCycle = campaign.cycles.find(c => c.id === selectedCycleId);

  const togglePipeline = (pipelineType: string) => {
    setExpandedPipelines(prev =>
      prev.includes(pipelineType)
        ? prev.filter(p => p !== pipelineType)
        : [...prev, pipelineType]
    );
  };

  const toggleStage = (stageId: string) => {
    setExpandedStages(prev =>
      prev.includes(stageId)
        ? prev.filter(s => s !== stageId)
        : [...prev, stageId]
    );
  };

  const handleAddActivity = (stageId: string, pipelineType: 'tour' | 'competition') => {
    setSelectedPipelineType(pipelineType);
    const pipeline = selectedCycle?.[pipelineType === 'tour' ? 'tourPipeline' : 'competitionPipeline'];
    const stage = pipeline?.stages.find(s => s.id === stageId);
    setSelectedStage(stage || null);
    setShowAddActivityModal(true);
  };

  const handleEnablePipeline = (pipelineType: 'tour' | 'competition') => {
    if (!selectedCycle) return;
    
    setCampaign(prev => ({
      ...prev,
      cycles: prev.cycles.map(cycle => 
        cycle.id === selectedCycleId
          ? {
              ...cycle,
              [pipelineType === 'tour' ? 'tourPipeline' : 'competitionPipeline']: {
                ...cycle[pipelineType === 'tour' ? 'tourPipeline' : 'competitionPipeline'],
                enabled: true
              }
            }
          : cycle
      )
    }));
    alert(`${pipelineType === 'tour' ? 'Tour' : 'Competition'} Pipeline enabled for ${selectedCycle.label}`);
  };

  const handleDisablePipeline = (pipelineType: 'tour' | 'competition') => {
    if (!selectedCycle) return;
    
    const confirmDisable = window.confirm(
      `Are you sure you want to disable the ${pipelineType === 'tour' ? 'Tour' : 'Competition'} Pipeline for ${selectedCycle.label}? This will not delete the configuration.`
    );
    
    if (confirmDisable) {
      setCampaign(prev => ({
        ...prev,
        cycles: prev.cycles.map(cycle => 
          cycle.id === selectedCycleId
            ? {
                ...cycle,
                [pipelineType === 'tour' ? 'tourPipeline' : 'competitionPipeline']: {
                  ...cycle[pipelineType === 'tour' ? 'tourPipeline' : 'competitionPipeline'],
                  enabled: false
                }
              }
            : cycle
        )
      }));
      alert(`${pipelineType === 'tour' ? 'Tour' : 'Competition'} Pipeline disabled for ${selectedCycle.label}`);
    }
  };

  const handleAddStage = () => {
    if (!selectedCycle || !newStageName.trim()) return;

    const pipeline = selectedCycle[selectedPipelineType === 'tour' ? 'tourPipeline' : 'competitionPipeline'];
    const maxOrder = Math.max(...pipeline.stages.map(s => s.order), 0);
    
    const newStage: Stage = {
      id: `STAGE-${Date.now()}`,
      name: newStageName,
      order: maxOrder + 1,
      activities: []
    };

    setCampaign(prev => ({
      ...prev,
      cycles: prev.cycles.map(cycle => 
        cycle.id === selectedCycleId
          ? {
              ...cycle,
              [selectedPipelineType === 'tour' ? 'tourPipeline' : 'competitionPipeline']: {
                ...cycle[selectedPipelineType === 'tour' ? 'tourPipeline' : 'competitionPipeline'],
                stages: [...pipeline.stages, newStage]
              }
            }
          : cycle
      )
    }));

    setNewStageName('');
    setShowAddStageModal(false);
    alert(`Stage "${newStageName}" added successfully!`);
  };

  const handleDeleteStage = (stageId: string, pipelineType: 'tour' | 'competition') => {
    if (!selectedCycle) return;

    const pipeline = selectedCycle[pipelineType === 'tour' ? 'tourPipeline' : 'competitionPipeline'];
    const stage = pipeline.stages.find(s => s.id === stageId);
    
    if (!stage) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the stage "${stage.name}"? This will also delete all ${stage.activities.length} activities in this stage.`
    );

    if (confirmDelete) {
      setCampaign(prev => ({
        ...prev,
        cycles: prev.cycles.map(cycle => 
          cycle.id === selectedCycleId
            ? {
                ...cycle,
                [pipelineType === 'tour' ? 'tourPipeline' : 'competitionPipeline']: {
                  ...cycle[pipelineType === 'tour' ? 'tourPipeline' : 'competitionPipeline'],
                  stages: pipeline.stages.filter(s => s.id !== stageId)
                }
              }
            : cycle
        )
      }));
      alert(`Stage "${stage.name}" deleted successfully!`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <AdminHeader
        title="Pipeline Builder"
        subtitle={`Configure pipeline stages and activities for ${campaign.name}`}
        screenCode="ADM-C01-PB"
        showFilters={false}
        onToggleSidebar={toggleSidebar}
        actions={
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="px-3 lg:px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[12px] lg:text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Campaigns</span>
              <span className="sm:hidden">Back</span>
            </button>
            <button
              className="px-3 lg:px-4 py-2 bg-[#2F6B3C] text-white rounded-lg hover:bg-[#274F30] transition-colors"
            >
              <span className="hidden sm:inline">Save Pipeline Configuration</span>
              <span className="sm:hidden">Save</span>
            </button>
          </div>
        }
      />

      <div className="flex-1 overflow-auto px-4 lg:px-8 py-6 max-w-full">
        {/* Campaign Overview */}
        <div className="mb-6 p-4 lg:p-5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div>
              <h2 className="text-[14px] lg:text-[16px] text-[#2B2B2B] mb-1">{campaign.name}</h2>
              <div className="text-[12px] lg:text-[13px] text-[#9E9E9E]">
                {new Date(campaign.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} – {new Date(campaign.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[12px] lg:text-[13px] text-[#9E9E9E]">Total Cycles</div>
              <div className="text-[18px] lg:text-[20px] text-[#2B2B2B]">{campaign.cycles.length}</div>
            </div>
          </div>
        </div>

        {/* Cycle Selector */}
        <div className="mb-6">
          <div className="text-[12px] lg:text-[13px] text-[#9E9E9E] mb-3">Select Cycle to Configure</div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {campaign.cycles.map((cycle) => (
              <button
                key={cycle.id}
                onClick={() => setSelectedCycleId(cycle.id)}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  selectedCycleId === cycle.id
                    ? 'border-[#F5A623] bg-[#FFF4E6]'
                    : 'border-[#E5E7EB] bg-white hover:border-[#F5A623]'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-[#F5A623]" />
                  <div className="text-[13px] lg:text-[14px] text-[#2B2B2B]">{cycle.label}</div>
                </div>
                <div className="text-[11px] lg:text-[12px] text-[#9E9E9E]">
                  {new Date(cycle.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – {new Date(cycle.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  {cycle.tourPipeline.enabled && (
                    <span className="text-[9px] lg:text-[10px] bg-[#2F6B3C] text-white px-2 py-0.5 rounded">TOUR</span>
                  )}
                  {cycle.competitionPipeline.enabled && (
                    <span className="text-[9px] lg:text-[10px] bg-[#F5A623] text-white px-2 py-0.5 rounded">COMP</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedCycle && (
          <div className="space-y-6">
            {/* Tour Pipeline */}
            <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
              <button
                onClick={() => togglePipeline('tour')}
                className="w-full p-4 bg-[#F0F9F4] hover:bg-[#E5F4EB] transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#2F6B3C]" />
                  <div className="text-left">
                    <div className="text-[14px] lg:text-[16px] text-[#2B2B2B]">Tour Pipeline</div>
                    <div className="text-[11px] lg:text-[12px] text-[#9E9E9E]">
                      School visits and activations – {selectedCycle.tourPipeline.stages.length} stages
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedCycle.tourPipeline.enabled && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('Edit Pipeline Settings: Tour');
                      }}
                      className="px-2 lg:px-3 py-1 text-[11px] lg:text-[12px] text-[#2F6B3C] hover:bg-white rounded transition-colors flex items-center gap-1"
                      title="Edit Pipeline Settings"
                    >
                      <Edit className="w-3 h-3" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                  )}
                  {selectedCycle.tourPipeline.enabled ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDisablePipeline('tour');
                      }}
                      className="px-2 lg:px-3 py-1 text-[11px] lg:text-[12px] text-[#8C1D18] hover:bg-[#FFF0F0] rounded transition-colors"
                      title="Disable Pipeline"
                    >
                      Disable
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnablePipeline('tour');
                      }}
                      className="px-2 lg:px-3 py-1 text-[11px] lg:text-[12px] text-[#2F6B3C] hover:bg-[#E5F4EB] rounded transition-colors"
                      title="Enable Pipeline"
                    >
                      Enable
                    </button>
                  )}
                  {expandedPipelines.includes('tour') ? (
                    <ChevronDown className="w-5 h-5 text-[#2B2B2B]" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-[#2B2B2B]" />
                  )}
                </div>
              </button>

              {expandedPipelines.includes('tour') && (
                <div className="p-4 bg-white">
                  {/* Stages */}
                  <div className="space-y-3">
                    {selectedCycle.tourPipeline.stages
                      .sort((a, b) => a.order - b.order)
                      .map((stage, index) => (
                        <div key={stage.id} className="border border-[#E5E7EB] rounded-lg overflow-hidden">
                          <div
                            className="p-3 bg-[#F9FAFB] flex items-center justify-between cursor-pointer hover:bg-[#F0F0F0] transition-colors"
                            onClick={() => toggleStage(stage.id)}
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <GripVertical className="w-4 h-4 text-[#9E9E9E] flex-shrink-0" />
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                <div className="w-6 h-6 rounded-full bg-[#2F6B3C] text-white text-[11px] flex items-center justify-center flex-shrink-0">
                                  {stage.order}
                                </div>
                                <div className="text-[13px] lg:text-[14px] text-[#2B2B2B] truncate">{stage.name}</div>
                              </div>
                              <div className="text-[10px] lg:text-[11px] text-[#9E9E9E] bg-white px-2 py-0.5 rounded flex-shrink-0">
                                {stage.activities.length} {stage.activities.length === 1 ? 'activity' : 'activities'}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddActivity(stage.id, 'tour');
                                }}
                                className="px-2 lg:px-3 py-1 text-[11px] lg:text-[12px] text-[#2F6B3C] hover:bg-[#E5F4EB] rounded transition-colors"
                              >
                                + Activity
                              </button>
                              {selectedCycle.tourPipeline.enabled && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteStage(stage.id, 'tour');
                                  }}
                                  className="p-1 text-[#9E9E9E] hover:text-[#8C1D18] hover:bg-[#FFF0F0] rounded transition-colors"
                                  title="Delete Stage"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                              {expandedStages.includes(stage.id) ? (
                                <ChevronDown className="w-4 h-4 text-[#9E9E9E]" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-[#9E9E9E]" />
                              )}
                            </div>
                          </div>

                          {/* Stage Activities */}
                          {expandedStages.includes(stage.id) && (
                            <div className="p-4 bg-white">
                              {stage.activities.length === 0 ? (
                                <div className="text-center py-6 text-[12px] lg:text-[13px] text-[#9E9E9E]">
                                  No activities configured for this stage.
                                  <button
                                    onClick={() => handleAddActivity(stage.id, 'tour')}
                                    className="block mx-auto mt-2 text-[#2F6B3C] hover:underline"
                                  >
                                    + Add Activity
                                  </button>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  {stage.activities.map((activity) => (
                                    <div
                                      key={activity.id}
                                      className="flex items-center justify-between p-3 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors"
                                    >
                                      <div className="flex items-center gap-3">
                                        <FileText className="w-4 h-4 text-[#F5A623]" />
                                        <div>
                                          <div className="text-[12px] lg:text-[13px] text-[#2B2B2B]">{activity.name}</div>
                                          <div className="text-[10px] lg:text-[11px] text-[#9E9E9E] capitalize">{activity.type}</div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <button className="p-1 text-[#9E9E9E] hover:text-[#F5A623] hover:bg-[#FFF4E6] rounded transition-colors">
                                          <Settings className="w-4 h-4" />
                                        </button>
                                        <button className="p-1 text-[#9E9E9E] hover:text-[#8C1D18] hover:bg-[#FFF0F0] rounded transition-colors">
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>

                  {selectedCycle.tourPipeline.enabled && (
                    <button
                      onClick={() => {
                        setSelectedPipelineType('tour');
                        setShowAddStageModal(true);
                      }}
                      className="mt-4 w-full px-4 py-2 border-2 border-dashed border-[#E5E7EB] rounded-lg text-[13px] lg:text-[14px] text-[#9E9E9E] hover:border-[#2F6B3C] hover:text-[#2F6B3C] hover:bg-[#F0F9F4] transition-colors"
                    >
                      + Add New Stage
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Competition Pipeline */}
            <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
              <button
                onClick={() => togglePipeline('competition')}
                className="w-full p-4 bg-[#FFF4E6] hover:bg-[#FFE8CC] transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-[#F5A623]" />
                  <div className="text-left">
                    <div className="text-[14px] lg:text-[16px] text-[#2B2B2B]">Competition Pipeline</div>
                    <div className="text-[11px] lg:text-[12px] text-[#9E9E9E]">
                      {selectedCycle.competitionPipeline.competitionConfig?.competitionName || 'Competition activities'} – {selectedCycle.competitionPipeline.stages.length} stages
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedCycle.competitionPipeline.enabled && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCompetitionConfigModal(true);
                      }}
                      className="px-2 lg:px-3 py-1 text-[11px] lg:text-[12px] text-[#F5A623] hover:bg-white rounded transition-colors flex items-center gap-1"
                    >
                      <Settings className="w-3 h-3" />
                      <span className="hidden sm:inline">Configure Competition</span>
                      <span className="sm:hidden">Config</span>
                    </button>
                  )}
                  {selectedCycle.competitionPipeline.enabled ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDisablePipeline('competition');
                      }}
                      className="px-2 lg:px-3 py-1 text-[11px] lg:text-[12px] text-[#8C1D18] hover:bg-[#FFF0F0] rounded transition-colors"
                      title="Disable Pipeline"
                    >
                      Disable
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnablePipeline('competition');
                      }}
                      className="px-2 lg:px-3 py-1 text-[11px] lg:text-[12px] text-[#F5A623] hover:bg-[#FFE8CC] rounded transition-colors"
                      title="Enable Pipeline"
                    >
                      Enable
                    </button>
                  )}
                  {expandedPipelines.includes('competition') ? (
                    <ChevronDown className="w-5 h-5 text-[#2B2B2B]" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-[#2B2B2B]" />
                  )}
                </div>
              </button>

              {expandedPipelines.includes('competition') && (
                <div className="p-4 bg-white">
                  {/* Competition Config Summary */}
                  {selectedCycle.competitionPipeline.competitionConfig && selectedCycle.competitionPipeline.enabled && (
                    <div className="mb-4 p-3 bg-[#FFF4E6] border border-[#F5A623] rounded-lg">
                      <div className="text-[12px] lg:text-[13px] text-[#2B2B2B] mb-2">
                        {selectedCycle.competitionPipeline.competitionConfig.competitionName}
                      </div>
                      {selectedCycle.competitionPipeline.competitionConfig.categories.length > 0 ? (
                        <div className="text-[10px] lg:text-[11px] text-[#9E9E9E]">
                          {selectedCycle.competitionPipeline.competitionConfig.categories.length} categories configured
                        </div>
                      ) : (
                        <div className="text-[10px] lg:text-[11px] text-[#9E9E9E]">
                          No categories configured yet
                        </div>
                      )}
                    </div>
                  )}

                  {/* Stages */}
                  <div className="space-y-3">
                    {selectedCycle.competitionPipeline.stages
                      .sort((a, b) => a.order - b.order)
                      .map((stage) => (
                        <div key={stage.id} className="border border-[#E5E7EB] rounded-lg overflow-hidden">
                          <div
                            className="p-3 bg-[#F9FAFB] flex items-center justify-between cursor-pointer hover:bg-[#F0F0F0] transition-colors"
                            onClick={() => toggleStage(stage.id)}
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <GripVertical className="w-4 h-4 text-[#9E9E9E] flex-shrink-0" />
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                <div className="w-6 h-6 rounded-full bg-[#F5A623] text-white text-[11px] flex items-center justify-center flex-shrink-0">
                                  {stage.order}
                                </div>
                                <div className="text-[13px] lg:text-[14px] text-[#2B2B2B] truncate">{stage.name}</div>
                              </div>
                              <div className="text-[10px] lg:text-[11px] text-[#9E9E9E] bg-white px-2 py-0.5 rounded flex-shrink-0">
                                {stage.activities.length} {stage.activities.length === 1 ? 'activity' : 'activities'}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddActivity(stage.id, 'competition');
                                }}
                                className="px-2 lg:px-3 py-1 text-[11px] lg:text-[12px] text-[#F5A623] hover:bg-[#FFF4E6] rounded transition-colors"
                              >
                                + Activity
                              </button>
                              {selectedCycle.competitionPipeline.enabled && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteStage(stage.id, 'competition');
                                  }}
                                  className="p-1 text-[#9E9E9E] hover:text-[#8C1D18] hover:bg-[#FFF0F0] rounded transition-colors"
                                  title="Delete Stage"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                              {expandedStages.includes(stage.id) ? (
                                <ChevronDown className="w-4 h-4 text-[#9E9E9E]" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-[#9E9E9E]" />
                              )}
                            </div>
                          </div>

                          {/* Stage Activities */}
                          {expandedStages.includes(stage.id) && (
                            <div className="p-4 bg-white">
                              {stage.activities.length === 0 ? (
                                <div className="text-center py-6 text-[12px] lg:text-[13px] text-[#9E9E9E]">
                                  No activities configured for this stage.
                                  <button
                                    onClick={() => handleAddActivity(stage.id, 'competition')}
                                    className="block mx-auto mt-2 text-[#F5A623] hover:underline"
                                  >
                                    + Add Activity
                                  </button>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  {stage.activities.map((activity) => (
                                    <div
                                      key={activity.id}
                                      className="flex items-center justify-between p-3 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors"
                                    >
                                      <div className="flex items-center gap-3">
                                        <FileText className="w-4 h-4 text-[#F5A623]" />
                                        <div>
                                          <div className="text-[12px] lg:text-[13px] text-[#2B2B2B]">{activity.name}</div>
                                          <div className="text-[10px] lg:text-[11px] text-[#9E9E9E] capitalize">{activity.type}</div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <button className="p-1 text-[#9E9E9E] hover:text-[#F5A623] hover:bg-[#FFF4E6] rounded transition-colors">
                                          <Settings className="w-4 h-4" />
                                        </button>
                                        <button className="p-1 text-[#9E9E9E] hover:text-[#8C1D18] hover:bg-[#FFF0F0] rounded transition-colors">
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>

                  {selectedCycle.competitionPipeline.enabled && (
                    <button
                      onClick={() => {
                        setSelectedPipelineType('competition');
                        setShowAddStageModal(true);
                      }}
                      className="mt-4 w-full px-4 py-2 border-2 border-dashed border-[#E5E7EB] rounded-lg text-[13px] lg:text-[14px] text-[#9E9E9E] hover:border-[#F5A623] hover:text-[#F5A623] hover:bg-[#FFF4E6] transition-colors"
                    >
                      + Add New Stage
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Activity Modal - Placeholder */}
      {showAddActivityModal && selectedStage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 lg:p-6">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-4 lg:p-6 border-b border-[#E5E7EB]">
              <h2 className="text-[16px] lg:text-[18px] text-[#2B2B2B]">Add Activity to Stage: {selectedStage.name}</h2>
              <p className="text-[12px] lg:text-[13px] text-[#9E9E9E] mt-1">Select or create a form/activity for this stage</p>
            </div>
            <div className="p-4 lg:p-6">
              <p className="text-[13px] lg:text-[14px] text-[#9E9E9E]">Activity selection interface will be built next...</p>
            </div>
            <div className="p-4 lg:p-6 border-t border-[#E5E7EB] flex justify-end gap-3">
              <button
                onClick={() => setShowAddActivityModal(false)}
                className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[13px] lg:text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Competition Config Modal - Placeholder */}
      {showCompetitionConfigModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 lg:p-6">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-auto">
            <div className="p-4 lg:p-6 border-b border-[#E5E7EB]">
              <h2 className="text-[16px] lg:text-[18px] text-[#2B2B2B]">Configure Competition</h2>
              <p className="text-[12px] lg:text-[13px] text-[#9E9E9E] mt-1">Set competition name, categories, and finalist counts</p>
            </div>
            <div className="p-4 lg:p-6">
              <p className="text-[13px] lg:text-[14px] text-[#9E9E9E]">Competition configuration interface will be built next...</p>
            </div>
            <div className="p-4 lg:p-6 border-t border-[#E5E7EB] flex justify-end gap-3">
              <button
                onClick={() => setShowCompetitionConfigModal(false)}
                className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[13px] lg:text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Stage Modal */}
      {showAddStageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 lg:p-6">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-4 lg:p-6 border-b border-[#E5E7EB]">
              <h2 className="text-[16px] lg:text-[18px] text-[#2B2B2B]">Add New Stage to {selectedPipelineType === 'tour' ? 'Tour' : 'Competition'} Pipeline</h2>
              <p className="text-[12px] lg:text-[13px] text-[#9E9E9E] mt-1">Enter the name of the new stage</p>
            </div>
            <div className="p-4 lg:p-6">
              <input
                type="text"
                value={newStageName}
                onChange={(e) => setNewStageName(e.target.value)}
                className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2F6B3C] text-[14px]"
                placeholder="Stage Name"
              />
            </div>
            <div className="p-4 lg:p-6 border-t border-[#E5E7EB] flex justify-end gap-3">
              <button
                onClick={() => setShowAddStageModal(false)}
                className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[13px] lg:text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStage}
                className="px-4 py-2 bg-[#2F6B3C] text-white rounded-lg hover:bg-[#274F30] transition-colors text-[13px] lg:text-[14px]"
              >
                Add Stage
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
