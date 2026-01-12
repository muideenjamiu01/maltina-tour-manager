import React from 'react';
import { X, Calendar, Check, ArrowRight, ArrowLeft, Clock } from 'lucide-react';

interface CycleFormData {
  label: string;
  startDate: string;
  endDate: string;
  targetSchools: number;
  targetChildren: number;
  enableTour: boolean;
  enableCompetition: boolean;
  tourTargets?: {
    schools: number;
    children: number;
  };
  competitionTargets?: {
    schools: number;
    children: number;
  };
}

interface CampaignFormData {
  name: string;
  startDate: string;
  endDate: string;
  numberOfCycles: number;
  cycles: CycleFormData[];
}

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  onNext: () => void;
  onPrev: () => void;
  onFinish: (status: 'draft' | 'published') => void;
}

export function CreateCampaignModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  currentStep,
  setCurrentStep,
  onNext,
  onPrev,
  onFinish
}: CreateCampaignModalProps) {
  if (!isOpen) return null;

  const totalSteps = formData.numberOfCycles + 1;
  const isLastStep = currentStep > formData.numberOfCycles;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <h2 className="text-[18px] text-[#2B2B2B]">
              {currentStep === 1
                ? 'Create New Campaign'
                : `Configure Cycle ${currentStep - 1} of ${formData.numberOfCycles}`}
            </h2>
            <p className="text-[13px] text-[#9E9E9E]">
              {currentStep === 1
                ? 'Define campaign details and number of cycles'
                : 'Set dates and targets for this cycle'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9E9E9E]" />
          </button>
        </div>

        {/* Progress Indicator */}
        {formData.numberOfCycles > 0 && (
          <div className="px-6 pt-4 pb-2">
            <div className="flex items-center gap-2">
              {[...Array(totalSteps)].map((_, idx) => (
                <div key={idx} className="flex items-center flex-1">
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[12px] transition-colors ${
                        idx + 1 < currentStep
                          ? 'bg-[#2F6B3C] text-white'
                          : idx + 1 === currentStep
                          ? 'bg-[#F5A623] text-white'
                          : 'bg-[#E5E7EB] text-[#9E9E9E]'
                      }`}
                    >
                      {idx + 1 < currentStep ? <Check className="w-4 h-4" /> : idx + 1}
                    </div>
                    <div className="text-[11px] text-[#9E9E9E] hidden sm:block">
                      {idx === 0 ? 'Campaign' : `Cycle ${idx}`}
                    </div>
                  </div>
                  {idx < totalSteps - 1 && (
                    <div
                      className={`flex-1 h-[2px] mx-2 ${
                        idx + 1 < currentStep ? 'bg-[#2F6B3C]' : 'bg-[#E5E7EB]'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content - Scrollable */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Step 1: Campaign Configuration */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                  Campaign Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Maltina Nourishment Programme 2026"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, startDate: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                    End Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, endDate: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                    Target Schools (Optional)
                  </label>
                  <input
                    type="number"
                    placeholder="800"
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                    Target Children (Optional)
                  </label>
                  <input
                    type="number"
                    placeholder="120000"
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                  Number of Cycles *
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={formData.numberOfCycles}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    setFormData((prev) => ({
                      ...prev,
                      numberOfCycles: Math.max(1, Math.min(12, value)),
                    }))
                  }}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                />
                <div className="text-[11px] text-[#9E9E9E] mt-1">
                  Enter a number between 1 and 12
                </div>
              </div>

              <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[12px] text-[#9E9E9E]">
                After creating the campaign, you can add cycles (Q1, Q2, etc.) and configure targets for each cycle.
              </div>
            </div>
          )}

          {/* Step 2+: Cycle Configuration */}
          {currentStep > 1 && currentStep <= formData.numberOfCycles + 1 && (() => {
            const cycleIndex = currentStep - 2;
            const cycle = formData.cycles[cycleIndex];
            if (!cycle) return null;

            return (
              <div className="space-y-4">
                <div className="p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                  <div className="text-[14px] text-[#2B2B2B]">
                    Cycle {cycleIndex + 1} of {formData.numberOfCycles}
                  </div>
                  <div className="text-[12px] text-[#9E9E9E]">
                    Campaign: {formData.name || 'Untitled Campaign'}
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                    Cycle Label *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Q1 2028, January 2028, H1 2028"
                    value={cycle.label}
                    onChange={(e) => {
                      const updatedCycles = [...formData.cycles];
                      updatedCycles[cycleIndex].label = e.target.value;
                      setFormData((prev) => ({ ...prev, cycles: updatedCycles }));
                    }}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                      Cycle Start Date *
                    </label>
                    <input
                      type="date"
                      value={cycle.startDate}
                      onChange={(e) => {
                        const updatedCycles = [...formData.cycles];
                        updatedCycles[cycleIndex].startDate = e.target.value;
                        setFormData((prev) => ({ ...prev, cycles: updatedCycles }));
                      }}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                      Cycle End Date *
                    </label>
                    <input
                      type="date"
                      value={cycle.endDate}
                      onChange={(e) => {
                        const updatedCycles = [...formData.cycles];
                        updatedCycles[cycleIndex].endDate = e.target.value;
                        setFormData((prev) => ({ ...prev, cycles: updatedCycles }));
                      }}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Activity Pipelines Section */}
                <div className="border-t border-[#E5E7EB] pt-4">
                  <div className="text-[13px] text-[#2B2B2B] mb-3">Activity Pipelines</div>
                  <div className="text-[12px] text-[#9E9E9E] mb-3">
                    Select which activities this cycle will run (at least one required)
                  </div>

                  {/* Tour Pipeline Toggle */}
                  <div className="mb-4">
                    <label className="flex items-center gap-3 p-3 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB] transition-colors">
                      <input
                        type="checkbox"
                        checked={cycle.enableTour}
                        onChange={(e) => {
                          const updatedCycles = [...formData.cycles];
                          updatedCycles[cycleIndex].enableTour = e.target.checked;
                          if (e.target.checked && !updatedCycles[cycleIndex].tourTargets) {
                            updatedCycles[cycleIndex].tourTargets = {
                              schools: 0,
                              children: 0
                            };
                          }
                          setFormData((prev) => ({ ...prev, cycles: updatedCycles }));
                        }}
                        className="w-4 h-4 text-[#F5A623] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#F5A623]"
                      />
                      <div className="flex-1">
                        <div className="text-[14px] text-[#2B2B2B]">School Tour Activities</div>
                        <div className="text-[12px] text-[#9E9E9E]">RECEE inspections, tour activations, and school visits</div>
                      </div>
                    </label>

                    {/* Tour Targets (shown when enabled) */}
                    {cycle.enableTour && (
                      <div className="mt-3 ml-7 grid grid-cols-2 gap-4 p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                        <div>
                          <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                            Tour Target Schools *
                          </label>
                          <input
                            type="number"
                            placeholder="300"
                            value={cycle.tourTargets?.schools || ''}
                            onChange={(e) => {
                              const updatedCycles = [...formData.cycles];
                              if (!updatedCycles[cycleIndex].tourTargets) {
                                updatedCycles[cycleIndex].tourTargets = { schools: 0, children: 0 };
                              }
                              updatedCycles[cycleIndex].tourTargets!.schools = parseInt(e.target.value) || 0;
                              setFormData((prev) => ({ ...prev, cycles: updatedCycles }));
                            }}
                            className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                            Tour Target Children *
                          </label>
                          <input
                            type="number"
                            placeholder="45000"
                            value={cycle.tourTargets?.children || ''}
                            onChange={(e) => {
                              const updatedCycles = [...formData.cycles];
                              if (!updatedCycles[cycleIndex].tourTargets) {
                                updatedCycles[cycleIndex].tourTargets = { schools: 0, children: 0 };
                              }
                              updatedCycles[cycleIndex].tourTargets!.children = parseInt(e.target.value) || 0;
                              setFormData((prev) => ({ ...prev, cycles: updatedCycles }));
                            }}
                            className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Competition Pipeline Toggle */}
                  <div>
                    <label className="flex items-center gap-3 p-3 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB] transition-colors">
                      <input
                        type="checkbox"
                        checked={cycle.enableCompetition}
                        onChange={(e) => {
                          const updatedCycles = [...formData.cycles];
                          updatedCycles[cycleIndex].enableCompetition = e.target.checked;
                          if (e.target.checked && !updatedCycles[cycleIndex].competitionTargets) {
                            updatedCycles[cycleIndex].competitionTargets = {
                              schools: 0,
                              children: 0
                            };
                          }
                          setFormData((prev) => ({ ...prev, cycles: updatedCycles }));
                        }}
                        className="w-4 h-4 text-[#F5A623] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#F5A623]"
                      />
                      <div className="flex-1">
                        <div className="text-[14px] text-[#2B2B2B]">Competition Activities</div>
                        <div className="text-[12px] text-[#9E9E9E]">Student competitions, talent hunts, and awards</div>
                      </div>
                    </label>

                    {/* Competition Targets (shown when enabled) */}
                    {cycle.enableCompetition && (
                      <div className="mt-3 ml-7 grid grid-cols-2 gap-4 p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                        <div>
                          <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                            Competition Target Schools *
                          </label>
                          <input
                            type="number"
                            placeholder="200"
                            value={cycle.competitionTargets?.schools || ''}
                            onChange={(e) => {
                              const updatedCycles = [...formData.cycles];
                              if (!updatedCycles[cycleIndex].competitionTargets) {
                                updatedCycles[cycleIndex].competitionTargets = { schools: 0, children: 0 };
                              }
                              updatedCycles[cycleIndex].competitionTargets!.schools = parseInt(e.target.value) || 0;
                              setFormData((prev) => ({ ...prev, cycles: updatedCycles }));
                            }}
                            className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                            Competition Target Children *
                          </label>
                          <input
                            type="number"
                            placeholder="30000"
                            value={cycle.competitionTargets?.children || ''}
                            onChange={(e) => {
                              const updatedCycles = [...formData.cycles];
                              if (!updatedCycles[cycleIndex].competitionTargets) {
                                updatedCycles[cycleIndex].competitionTargets = { schools: 0, children: 0 };
                              }
                              updatedCycles[cycleIndex].competitionTargets!.children = parseInt(e.target.value) || 0;
                              setFormData((prev) => ({ ...prev, cycles: updatedCycles }));
                            }}
                            className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Overall Targets (auto-calculated or manual) */}
                <div className="border-t border-[#E5E7EB] pt-4">
                  <div className="text-[13px] text-[#2B2B2B] mb-3">Overall Cycle Targets</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                        Total Target Schools *
                      </label>
                      <input
                        type="number"
                        placeholder="500"
                        value={cycle.targetSchools || ''}
                        onChange={(e) => {
                          const updatedCycles = [...formData.cycles];
                          updatedCycles[cycleIndex].targetSchools =
                            parseInt(e.target.value) || 0;
                          setFormData((prev) => ({ ...prev, cycles: updatedCycles }));
                        }}
                        className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                      />
                      <div className="text-[11px] text-[#9E9E9E] mt-1">
                        {cycle.enableTour && cycle.enableCompetition && (
                          <>Combined: {(cycle.tourTargets?.schools || 0) + (cycle.competitionTargets?.schools || 0)} schools</>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                        Total Target Children *
                      </label>
                      <input
                        type="number"
                        placeholder="75000"
                        value={cycle.targetChildren || ''}
                        onChange={(e) => {
                          const updatedCycles = [...formData.cycles];
                          updatedCycles[cycleIndex].targetChildren =
                            parseInt(e.target.value) || 0;
                          setFormData((prev) => ({ ...prev, cycles: updatedCycles }));
                        }}
                        className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                      />
                      <div className="text-[11px] text-[#9E9E9E] mt-1">
                        {cycle.enableTour && cycle.enableCompetition && (
                          <>Combined: {(cycle.tourTargets?.children || 0) + (cycle.competitionTargets?.children || 0)} children</>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Footer - Navigation */}
        <div className="p-6 border-t border-[#E5E7EB] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            {/* Step 1: Show Draft and Publish buttons */}
            {currentStep === 1 && (
              <>
                <button
                  onClick={() => onFinish('draft')}
                  className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors"
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => onFinish('published')}
                  className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors"
                >
                  Publish Campaign
                </button>
              </>
            )}

            {/* Cycle Configuration Steps */}
            {currentStep > 1 && (
              <>
                <button
                  onClick={onPrev}
                  className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>

                {currentStep <= formData.numberOfCycles && (
                  <button
                    onClick={onNext}
                    className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors flex items-center gap-2"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {isLastStep && (
                  <>
                    <button
                      onClick={() => onFinish('draft')}
                      className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors"
                    >
                      Save as Draft
                    </button>
                    <button
                      onClick={() => onFinish('published')}
                      className="px-4 py-2 bg-[#2F6B3C] text-white rounded-lg hover:bg-[#274F30] transition-colors flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Publish Campaign
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}