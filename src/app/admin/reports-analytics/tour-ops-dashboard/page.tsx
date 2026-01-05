'use client'

import { useState } from 'react';
//import { useScreen } from '../contexts/ScreenContext';
import { AlertTriangle, CheckCircle, Clock, AlertCircle, TrendingUp, XCircle } from 'lucide-react';
import { SCHOOLS, getSchoolsByStatus } from '../../../admin/week2-pipeline-data';

interface StatusCardProps {
  title: string;
  count: number;
  status: 'healthy' | 'attention' | 'blocked' | 'neutral';
  icon: any;
  onClick: () => void;
}

function StatusCard({ title, count, status, icon: Icon, onClick }: StatusCardProps) {
  const statusConfig = {
    healthy: { bg: 'bg-[#2F6B3C]', text: 'text-white' },
    attention: { bg: 'bg-[#D4A017]', text: 'text-white' },
    blocked: { bg: 'bg-[#8C1D18]', text: 'text-white' },
    neutral: { bg: 'bg-white border border-[#E5E7EB]', text: 'text-[#2B2B2B]' }
  };

  const config = statusConfig[status];

  return (
    <button
      onClick={onClick}
      className={`${config.bg} ${config.text} rounded-lg p-4 md:p-5 hover:opacity-90 transition-opacity text-left w-full`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-sm opacity-90">{title}</div>
        <Icon className="w-5 h-5 opacity-75" />
      </div>
      <div className="text-3xl md:text-4xl">{count}</div>
    </button>
  );
}

interface SLABreachRowProps {
  school: string;
  stage: string;
  daysStuck: number;
  owner: string;
  priority: 'high' | 'medium';
}

function SLABreachRow({ school, stage, daysStuck, owner, priority }: SLABreachRowProps) {
  return (
    <tr className="border-b border-[#E5E7EB] hover:bg-[#FFFDF8] transition-colors">
      <td className="px-3 md:px-4 py-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${priority === 'high' ? 'bg-[#8C1D18]' : 'bg-[#D4A017]'}`} />
          <span className="text-sm text-[#2B2B2B]">{school}</span>
        </div>
      </td>
      <td className="px-3 md:px-4 py-3 text-sm text-[#9E9E9E] hidden md:table-cell">{stage}</td>
      <td className="px-3 md:px-4 py-3">
        <span className={`text-sm ${daysStuck > 7 ? 'text-[#8C1D18]' : 'text-[#D4A017]'}`}>
          {daysStuck}d
        </span>
      </td>
      <td className="px-3 md:px-4 py-3 text-sm text-[#2B2B2B] hidden sm:table-cell">{owner}</td>
      <td className="px-3 md:px-4 py-3">
        <button className="px-3 md:px-4 py-1.5 bg-[#F5A623] text-white text-sm rounded-lg hover:bg-[#E09615] transition-colors">
          Review
        </button>
      </td>
    </tr>
  );
}

export default function TourOpsDashboard() {
 // const { setScreen } = useScreen();
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week'>('today');

  // Calculate real stats from Week 2 data
  const stats = {
    newNominations: getSchoolsByStatus('Nominated').length,
    awaitingDecision: getSchoolsByStatus('Nominated').length,
    interestPending: getSchoolsByStatus('Interest Requested (Invite Sent)').length,
    interestConfirmed: getSchoolsByStatus('Interest Confirmed').length,
    criteriaFailed: getSchoolsByStatus('Rejected – Criteria').length,
    approvedForRECEE: getSchoolsByStatus('Approved for RECEE').length,
    receeScheduled: getSchoolsByStatus('RECEE Scheduled').length,
    receePass: getSchoolsByStatus('RECEE Completed – Passed').length,
    receeFail: getSchoolsByStatus('RECEE Completed – Failed').length,
    approvedForTour: getSchoolsByStatus('Approved for Tour').length,
    clustered: getSchoolsByStatus('Clustered (Assigned to Cluster)').length,
    bookingSetup: getSchoolsByStatus('Booking Setup Complete (Dates/Slots Ready)').length,
    bookingOpen: getSchoolsByStatus('Booking Open (Link Sent)').length,
    booked: getSchoolsByStatus('Booked').length,
    readyForTour: getSchoolsByStatus('Ready for Tour').length,
    slaBreaches: 4 // Calculate based on age in stage
  };

  const slaBreaches: SLABreachRowProps[] = [
    { school: 'St. Augustine College', stage: 'Nominated', daysStuck: 9, owner: 'T. Adebayo', priority: 'high' },
    { school: 'Kings Academy', stage: 'Interest Confirmed', daysStuck: 8, owner: 'C. Okafor', priority: 'high' },
    { school: 'Victory High School', stage: 'Approved for RECEE', daysStuck: 6, owner: 'A. Musa', priority: 'medium' },
    { school: 'Grace International School', stage: 'RECEE Scheduled', daysStuck: 5, owner: 'T. Adebayo', priority: 'medium' }
  ];

  const handleCardClick = (filter: string) => {
    console.log(`Opening school list with filter: ${filter}`);
    // In real implementation, this would navigate to filtered school list
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 md:px-8 py-4 md:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-[#2B2B2B] mb-1">Tour Operations Dashboard</h1>
              <p className="text-sm text-[#9E9E9E]">Real-time pipeline status and action queue</p>
            </div>
            
            {/* Period Toggle */}
            <div className="flex items-center gap-2 bg-[#F2F1EE] rounded-lg p-1 w-full sm:w-auto">
              <button
                onClick={() => setSelectedPeriod('today')}
                className={`px-4 py-2 rounded-md text-sm transition-colors flex-1 sm:flex-none ${
                  selectedPeriod === 'today'
                    ? 'bg-white text-[#2B2B2B] shadow-sm'
                    : 'text-[#9E9E9E] hover:text-[#2B2B2B]'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setSelectedPeriod('week')}
                className={`px-4 py-2 rounded-md text-sm transition-colors flex-1 sm:flex-none ${
                  selectedPeriod === 'week'
                    ? 'bg-white text-[#2B2B2B] shadow-sm'
                    : 'text-[#9E9E9E] hover:text-[#2B2B2B]'
                }`}
              >
                This Week
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* New Nominations & Decisions */}
        <div>
          <h2 className="text-lg text-[#2B2B2B] mb-4">Nominations & Decisions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatusCard
              title="New Nominations"
              count={stats.newNominations}
              status="neutral"
              icon={TrendingUp}
              onClick={() => handleCardClick('new-nominations')}
            />
            <StatusCard
              title="Awaiting Nomination Decision"
              count={stats.awaitingDecision}
              status={stats.awaitingDecision > 10 ? 'attention' : 'neutral'}
              icon={Clock}
              onClick={() => handleCardClick('awaiting-decision')}
            />
            <StatusCard
              title="Interest Confirmed, Pending Criteria"
              count={stats.criteriaFailed}
              status="neutral"
              icon={AlertCircle}
              onClick={() => handleCardClick('criteria-pending')}
            />
            <StatusCard
              title="Criteria Failed, Awaiting Review"
              count={stats.criteriaFailed}
              status={stats.criteriaFailed > 5 ? 'attention' : 'neutral'}
              icon={AlertTriangle}
              onClick={() => handleCardClick('criteria-failed')}
            />
          </div>
        </div>

        {/* RECEE Status */}
        <div>
          <h2 className="text-lg text-[#2B2B2B] mb-4">RECEE Pipeline</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatusCard
              title="Approved for RECEE, Not Scheduled"
              count={stats.awaitingDecision}
              status={stats.awaitingDecision > 10 ? 'attention' : 'neutral'}
              icon={Clock}
              onClick={() => handleCardClick('recee-not-scheduled')}
            />
            <StatusCard
              title="RECEE Completed - Passed"
              count={stats.receePass}
              status="healthy"
              icon={CheckCircle}
              onClick={() => handleCardClick('recee-passed')}
            />
            <StatusCard
              title="RECEE Completed - Failed"
              count={stats.receeFail}
              status={stats.receeFail > 2 ? 'blocked' : 'neutral'}
              icon={XCircle}
              onClick={() => handleCardClick('recee-failed')}
            />
          </div>
        </div>

        {/* Booking & SLA */}
        <div>
          <h2 className="text-lg text-[#2B2B2B] mb-4">Booking & SLA</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatusCard
              title="Booking Open, Not Booked"
              count={stats.bookingOpen}
              status={stats.bookingOpen > 10 ? 'attention' : 'neutral'}
              icon={AlertCircle}
              onClick={() => handleCardClick('booking-not-booked')}
            />
            <StatusCard
              title="SLA Breaches"
              count={stats.slaBreaches}
              status={stats.slaBreaches > 5 ? 'blocked' : stats.slaBreaches > 0 ? 'attention' : 'healthy'}
              icon={AlertTriangle}
              onClick={() => handleCardClick('sla-breaches')}
            />
          </div>
        </div>

        {/* SLA Breach Queue */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
            <div>
              <h3 className="text-[#2B2B2B]">SLA Breach Queue</h3>
              <p className="text-sm text-[#9E9E9E]">Schools requiring immediate attention</p>
            </div>
            <button
           
              className="text-sm text-[#F5A623] hover:text-[#E09615] transition-colors hidden sm:block"
            >
              View All →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F2F1EE]">
                <tr>
                  <th className="px-3 md:px-4 py-3 text-left text-xs text-[#9E9E9E] uppercase tracking-wide">School</th>
                  <th className="px-3 md:px-4 py-3 text-left text-xs text-[#9E9E9E] uppercase tracking-wide hidden md:table-cell">Stage</th>
                  <th className="px-3 md:px-4 py-3 text-left text-xs text-[#9E9E9E] uppercase tracking-wide">Days</th>
                  <th className="px-3 md:px-4 py-3 text-left text-xs text-[#9E9E9E] uppercase tracking-wide hidden sm:table-cell">Owner</th>
                  <th className="px-3 md:px-4 py-3 text-left text-xs text-[#9E9E9E] uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody>
                {slaBreaches.map((breach, idx) => (
                  <SLABreachRow key={idx} {...breach} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View All Button */}
          <div className="px-4 py-3 border-t border-[#E5E7EB] sm:hidden">
            <button
              className="w-full px-4 py-2 text-sm text-[#F5A623] hover:bg-[#FFF7ED] rounded-lg transition-colors"
            >
              View All SLA Breaches →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}