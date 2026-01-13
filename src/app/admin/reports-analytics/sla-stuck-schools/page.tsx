'use client'
import { useState } from 'react';
import { Clock, AlertTriangle, User, ArrowRight, AlertCircle } from 'lucide-react';

interface StuckSchool {
  id: string;
  school: string;
  stage: string;
  daysInStage: number;
  lastAction: string;
  lastActionDate: string;
  owner: string;
  nextAction: string;
  priority: 'critical' | 'high' | 'medium';
  state: string;
  lga: string;
}

interface QueueSectionProps {
  title: string;
  description: string;
  schools: StuckSchool[];
  onReview: (schoolId: string) => void;
}

function QueueSection({ title, description, schools, onReview }: QueueSectionProps) {
  const criticalCount = schools.filter(s => s.priority === 'critical').length;
  const highCount = schools.filter(s => s.priority === 'high').length;

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
      <div className="px-4 md:px-6 py-4 border-b border-[#E5E7EB] bg-[#FFFDF8]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-[#2B2B2B] mb-1">{title}</h3>
            <p className="text-sm text-[#9E9E9E]">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            {criticalCount > 0 && (
              <span className="px-3 py-1 bg-[#8C1D18] text-white text-xs rounded-full">
                {criticalCount} Critical
              </span>
            )}
            {highCount > 0 && (
              <span className="px-3 py-1 bg-[#D4A017] text-white text-xs rounded-full">
                {highCount} High
              </span>
            )}
          </div>
        </div>
      </div>

      {schools.length === 0 ? (
        <div className="px-4 md:px-6 py-8 text-center text-[#9E9E9E]">
          ✓ No schools stuck in this stage
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-[#F2F1EE]">
              <tr>
                <th className="px-3 md:px-4 py-3 text-left text-xs text-[#9E9E9E] uppercase tracking-wide">School</th>
                <th className="px-3 md:px-4 py-3 text-left text-xs text-[#9E9E9E] uppercase tracking-wide hidden lg:table-cell">Last Action</th>
                <th className="px-3 md:px-4 py-3 text-center text-xs text-[#9E9E9E] uppercase tracking-wide">Days</th>
                <th className="px-3 md:px-4 py-3 text-left text-xs text-[#9E9E9E] uppercase tracking-wide hidden md:table-cell">Owner</th>
                <th className="px-3 md:px-4 py-3 text-left text-xs text-[#9E9E9E] uppercase tracking-wide hidden xl:table-cell">Next Action</th>
                <th className="px-3 md:px-4 py-3 text-center text-xs text-[#9E9E9E] uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school) => (
                <tr key={school.id} className="border-b border-[#E5E7EB] hover:bg-[#FFFDF8] transition-colors">
                  <td className="px-3 md:px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        school.priority === 'critical' ? 'bg-[#8C1D18]' : 
                        school.priority === 'high' ? 'bg-[#D4A017]' : 
                        'bg-[#C7C7C7]'
                      }`} />
                      <div>
                        <div className="text-sm text-[#2B2B2B]">{school.school}</div>
                        <div className="text-xs text-[#9E9E9E]">{school.lga}, {school.state}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-4 py-3 hidden lg:table-cell">
                    <div className="text-sm text-[#2B2B2B]">{school.lastAction}</div>
                    <div className="text-xs text-[#9E9E9E]">{school.lastActionDate}</div>
                  </td>
                  <td className="px-3 md:px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-1 rounded text-sm ${
                      school.daysInStage > 7 ? 'bg-[#8C1D18] text-white' :
                      school.daysInStage > 4 ? 'bg-[#D4A017] text-white' :
                      'bg-[#F2F1EE] text-[#9E9E9E]'
                    }`}>
                      {school.daysInStage}d
                    </span>
                  </td>
                  <td className="px-3 md:px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#9E9E9E]" />
                      <span className="text-sm text-[#2B2B2B]">{school.owner}</span>
                    </div>
                  </td>
                  <td className="px-3 md:px-4 py-3 text-sm text-[#9E9E9E] hidden xl:table-cell">
                    {school.nextAction}
                  </td>
                  <td className="px-3 md:px-4 py-3 text-center">
                    <button
                      onClick={() => onReview(school.id)}
                      className="px-3 md:px-4 py-1.5 bg-[#F5A623] text-white text-sm rounded-lg hover:bg-[#E09615] transition-colors"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function SLAStuckSchools() {
  const [activeQueue, setActiveQueue] = useState<'all' | 'nominated' | 'interest' | 'recee-scheduling' | 'recee-decision' | 'booking'>('all');

  const stuckSchools: StuckSchool[] = [
    // Nominated, not reviewed
    { id: '1', school: 'St. Augustine College', stage: 'Nominated', daysInStage: 9, lastAction: 'School nominated', lastActionDate: '14 Dec 2025', owner: 'T. Adebayo', nextAction: 'Review nomination', priority: 'critical', state: 'Lagos', lga: 'Ikeja' },
    { id: '2', school: 'Unity Secondary School', stage: 'Nominated', daysInStage: 8, lastAction: 'School nominated', lastActionDate: '15 Dec 2025', owner: 'T. Adebayo', nextAction: 'Review nomination', priority: 'critical', state: 'Ogun', lga: 'Abeokuta' },
    { id: '3', school: 'Bright Future Academy', stage: 'Nominated', daysInStage: 6, lastAction: 'School nominated', lastActionDate: '17 Dec 2025', owner: 'C. Okafor', nextAction: 'Review nomination', priority: 'high', state: 'Lagos', lga: 'Lekki' },
    
    // Interest confirmed, not validated
    { id: '4', school: 'Kings Academy', stage: 'Interest Confirmed', daysInStage: 8, lastAction: 'Interest confirmed', lastActionDate: '15 Dec 2025', owner: 'C. Okafor', nextAction: 'Run criteria validation', priority: 'critical', state: 'Oyo', lga: 'Ibadan' },
    { id: '5', school: 'Premier College', stage: 'Interest Confirmed', daysInStage: 5, lastAction: 'Interest confirmed', lastActionDate: '18 Dec 2025', owner: 'A. Musa', nextAction: 'Run criteria validation', priority: 'high', state: 'Rivers', lga: 'Port Harcourt' },
    
    // Approved for RECEE, not scheduled
    { id: '6', school: 'Victory High School', stage: 'Approved for RECEE', daysInStage: 6, lastAction: 'Approved for RECEE', lastActionDate: '17 Dec 2025', owner: 'A. Musa', nextAction: 'Schedule RECEE visit', priority: 'high', state: 'Lagos', lga: 'Surulere' },
    { id: '7', school: 'Grace International', stage: 'Approved for RECEE', daysInStage: 5, lastAction: 'Approved for RECEE', lastActionDate: '18 Dec 2025', owner: 'T. Adebayo', nextAction: 'Schedule RECEE visit', priority: 'high', state: 'Kano', lga: 'Kano Municipal' },
    
    // RECEE completed, not decided
    { id: '8', school: 'Hope Academy', stage: 'RECEE Completed', daysInStage: 4, lastAction: 'RECEE visit completed', lastActionDate: '19 Dec 2025', owner: 'C. Okafor', nextAction: 'Review RECEE results', priority: 'medium', state: 'Lagos', lga: 'Yaba' },
    
    // Booking open, not booked
    { id: '9', school: 'Prime College', stage: 'Booking Open', daysInStage: 5, lastAction: 'Booking link sent', lastActionDate: '18 Dec 2025', owner: 'T. Adebayo', nextAction: 'Follow up with school', priority: 'medium', state: 'Ogun', lga: 'Ifo' },
    { id: '10', school: 'Excellence Academy', stage: 'Booking Open', daysInStage: 4, lastAction: 'Booking link sent', lastActionDate: '19 Dec 2025', owner: 'A. Musa', nextAction: 'Follow up with school', priority: 'medium', state: 'Oyo', lga: 'Ogbomoso' }
  ];

  const getFilteredSchools = () => {
    if (activeQueue === 'all') return stuckSchools;
    
    const stageMap = {
      nominated: 'Nominated',
      interest: 'Interest Confirmed',
      'recee-scheduling': 'Approved for RECEE',
      'recee-decision': 'RECEE Completed',
      booking: 'Booking Open'
    };
    
    return stuckSchools.filter(s => s.stage === stageMap[activeQueue]);
  };

  const handleReview = (schoolId: string) => {
    console.log('Reviewing school:', schoolId);
    // In real implementation, navigate to school case file
  };

  const queues = [
    { id: 'all', label: 'All Queues', count: stuckSchools.length },
    { id: 'nominated', label: 'Nominated, Not Reviewed', count: stuckSchools.filter(s => s.stage === 'Nominated').length },
    { id: 'interest', label: 'Interest, Not Validated', count: stuckSchools.filter(s => s.stage === 'Interest Confirmed').length },
    { id: 'recee-scheduling', label: 'RECEE, Not Scheduled', count: stuckSchools.filter(s => s.stage === 'Approved for RECEE').length },
    { id: 'recee-decision', label: 'RECEE, Not Decided', count: stuckSchools.filter(s => s.stage === 'RECEE Completed').length },
    { id: 'booking', label: 'Booking, Not Booked', count: stuckSchools.filter(s => s.stage === 'Booking Open').length }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 md:px-8 py-4 md:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-[#8C1D18]" />
            <div>
              <h1 className="text-[#2B2B2B] mb-1">SLA & Stuck Schools</h1>
              <p className="text-sm text-[#9E9E9E]">Schools exceeding time thresholds by pipeline stage</p>
            </div>
          </div>

          {/* Queue Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {queues.map((queue) => (
              <button
                key={queue.id}
                onClick={() => setActiveQueue(queue.id as any)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  activeQueue === queue.id
                    ? 'bg-[#F5A623] text-white'
                    : 'bg-[#F2F1EE] text-[#2B2B2B] hover:bg-[#E5E7EB]'
                }`}
              >
                {queue.label} <span className="ml-1 opacity-75">({queue.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-[#8C1D18]" />
              <div className="text-sm text-[#9E9E9E]">Critical</div>
            </div>
            <div className="text-2xl md:text-3xl text-[#8C1D18]">
              {stuckSchools.filter(s => s.priority === 'critical').length}
            </div>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-[#D4A017]" />
              <div className="text-sm text-[#9E9E9E]">High</div>
            </div>
            <div className="text-2xl md:text-3xl text-[#D4A017]">
              {stuckSchools.filter(s => s.priority === 'high').length}
            </div>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-[#9E9E9E]" />
              <div className="text-sm text-[#9E9E9E]">Medium</div>
            </div>
            <div className="text-2xl md:text-3xl text-[#2B2B2B]">
              {stuckSchools.filter(s => s.priority === 'medium').length}
            </div>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowRight className="w-5 h-5 text-[#9E9E9E]" />
              <div className="text-sm text-[#9E9E9E]">Avg Days</div>
            </div>
            <div className="text-2xl md:text-3xl text-[#2B2B2B]">
              {Math.round(stuckSchools.reduce((sum, s) => sum + s.daysInStage, 0) / stuckSchools.length)}
            </div>
          </div>
        </div>

        {/* SLA Thresholds Info */}
        <div className="bg-[#FFF7ED] border border-[#F5A623]/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#F5A623] flex-shrink-0" />
            <div>
              <div className="text-sm text-[#2B2B2B] mb-2">⏱️ SLA Thresholds</div>
              <div className="text-sm text-[#9E9E9E] space-y-1">
                <div>• Nomination review: <strong>3 days</strong></div>
                <div>• Criteria validation: <strong>2 days</strong></div>
                <div>• RECEE scheduling: <strong>5 days</strong></div>
                <div>• RECEE decision: <strong>2 days</strong></div>
                <div>• Booking completion: <strong>4 days</strong></div>
              </div>
            </div>
          </div>
        </div>

        {/* Queue Display */}
        {activeQueue === 'all' ? (
          <div className="space-y-6">
            <QueueSection
              title="Nominated, Not Reviewed"
              description="Schools waiting for initial nomination review"
              schools={stuckSchools.filter(s => s.stage === 'Nominated')}
              onReview={handleReview}
            />
            <QueueSection
              title="Interest Confirmed, Not Validated"
              description="Schools waiting for criteria validation"
              schools={stuckSchools.filter(s => s.stage === 'Interest Confirmed')}
              onReview={handleReview}
            />
            <QueueSection
              title="Approved for RECEE, Not Scheduled"
              description="Schools waiting for RECEE visit scheduling"
              schools={stuckSchools.filter(s => s.stage === 'Approved for RECEE')}
              onReview={handleReview}
            />
            <QueueSection
              title="RECEE Completed, Not Decided"
              description="Schools waiting for RECEE decision"
              schools={stuckSchools.filter(s => s.stage === 'RECEE Completed')}
              onReview={handleReview}
            />
            <QueueSection
              title="Booking Open, Not Booked"
              description="Schools with pending booking completion"
              schools={stuckSchools.filter(s => s.stage === 'Booking Open')}
              onReview={handleReview}
            />
          </div>
        ) : (
          <QueueSection
            title={queues.find(q => q.id === activeQueue)?.label || ''}
            description="Schools in this queue"
            schools={getFilteredSchools()}
            onReview={handleReview}
          />
        )}
      </div>
    </div>
  );
}