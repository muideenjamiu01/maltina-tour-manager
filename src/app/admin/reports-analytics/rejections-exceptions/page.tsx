'use client'
import { useState } from 'react';
import { XCircle, TrendingDown, Filter, Download, CheckCircle, AlertTriangle, X as XIcon } from 'lucide-react';
import { RejectionData, Toast, RejectionByStage, RejectionByReason, TrendData, TopRejectedLGA } from '../../../../../types/rejections-exceptions.types';

export default function  RejectionsExceptions() {
  const [filterStage, setFilterStage] = useState('all');
  const [filterReason, setFilterReason] = useState('all');
  const [filterState, setFilterState] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [dateRange, setDateRange] = useState('');

  // Simple toast for feedback
  const useToast = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const toast = ({ title, description = '', variant = 'default' }: Omit<Toast, 'id'>) => {
      const id = `t-${Date.now()}`;
      setToasts((s) => [...s, { id, title, description, variant }]);
      setTimeout(() => setToasts((s) => s.filter((t) => t.id !== id)), 3000);
    };
    return { toasts, setToasts, toast } as const;
  };
  const { toasts, setToasts, toast } = useToast();

  // Sample rejection data
  const rejectionsByStage = [
    { stage: 'Rejected – Nomination', count: 72, percentage: 16 },
    { stage: 'Rejected – Criteria', count: 63, percentage: 14 },
    { stage: 'RECEE Completed – Failed', count: 26, percentage: 6 },
    { stage: 'Cancelled', count: 19, percentage: 4 }
  ];

  const rejectionsByReason = [
    { stage: 'Rejected – Nomination', reason: 'Duplicate school', count: 38 },
    { stage: 'Rejected – Nomination', reason: 'Invalid or incomplete data', count: 22 },
    { stage: 'Rejected – Nomination', reason: 'Outside campaign scope', count: 12 },
    
    { stage: 'Rejected – Criteria', reason: 'School type not eligible', count: 28 },
    { stage: 'Rejected – Criteria', reason: 'Location not eligible', count: 21 },
    { stage: 'Rejected – Criteria', reason: 'Capacity below threshold', count: 14 },
    
    { stage: 'RECEE Completed – Failed', reason: 'Infrastructure unsuitable', count: 15 },
    { stage: 'RECEE Completed – Failed', reason: 'Safety concerns', count: 7 },
    { stage: 'RECEE Completed – Failed', reason: 'Access constraints', count: 4 },
    
    { stage: 'Cancelled', reason: 'School withdrew', count: 12 },
    { stage: 'Cancelled', reason: 'Principal unavailable', count: 7 }
  ];

  const trendData = [
    { week: 'Week 1', total: 18 },
    { week: 'Week 2', total: 24 },
    { week: 'Week 3', total: 31 },
    { week: 'Week 4', total: 27 },
    { week: 'This Week', total: 20 }
  ];

  const topRejectedLGAs = [
    { lga: 'Ikeja', state: 'Lagos', count: 12 },
    { lga: 'Abeokuta North', state: 'Ogun', count: 9 },
    { lga: 'Ibadan North', state: 'Oyo', count: 8 },
    { lga: 'Port Harcourt', state: 'Rivers', count: 7 },
    { lga: 'Kano Municipal', state: 'Kano', count: 6 }
  ];

  const filteredRejections = rejectionsByReason.filter(r => {
    if (filterStage !== 'all' && r.stage !== filterStage) return false;
    if (filterReason !== 'all' && r.reason !== filterReason) return false;
    return true;
  });

  // Export handler
  const handleExport = () => {
    toast({ title: 'Export started', description: 'Preparing rejection report...' });
    try {
      const headers = ['Stage','Reason','Count'];
      const rows = filteredRejections.map(r => [
        `"${r.stage}"`,
        `"${r.reason}"`,
        r.count
      ].join(','));
      const csv = [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rejection-report-${new Date().toISOString().slice(0,10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast({ title: 'Export completed', description: `${filteredRejections.length} records exported.` });
    } catch (err) {
      toast({ title: 'Export failed', description: 'Could not create export file.', variant: 'destructive' });
    }
  };

  const totalRejections = rejectionsByStage.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 md:px-8 py-4 md:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <XCircle className="w-6 h-6 text-[#8C1D18]" />
              <div>
                <h1 className="text-[#2B2B2B] mb-1">Rejections & Exceptions</h1>
                <p className="text-sm text-[#9E9E9E]">Detailed rejection analysis across pipeline stages</p>
              </div>
            </div>
            
            <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F2F1EE] transition-colors w-full md:w-auto justify-center">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>

          {/* Period Toggle */}
          <div className="flex items-center gap-2 bg-[#F2F1EE] rounded-lg p-1 w-full sm:w-auto">
            {(['week', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-md text-sm transition-colors flex-1 sm:flex-none ${
                  selectedPeriod === period
                    ? 'bg-white text-[#2B2B2B] shadow-sm'
                    : 'text-[#9E9E9E] hover:text-[#2B2B2B]'
                }`}
              >
                {period === 'week' ? 'This Week' : period === 'month' ? 'This Month' : 'This Year'}
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
              <XCircle className="w-5 h-5 text-[#8C1D18]" />
              <div className="text-sm text-[#9E9E9E]">Total Rejections</div>
            </div>
            <div className="text-2xl md:text-3xl text-[#8C1D18]">{totalRejections}</div>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-sm text-[#9E9E9E] mb-2">Rejection Rate</div>
            <div className="text-2xl md:text-3xl text-[#2B2B2B]">36%</div>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-sm text-[#9E9E9E] mb-2">Top Reason</div>
            <div className="text-base md:text-lg text-[#2B2B2B]">Duplicate</div>
            <div className="text-xs text-[#9E9E9E]">38 schools</div>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-sm text-[#9E9E9E] mb-2">RECEE Failures</div>
            <div className="text-2xl md:text-3xl text-[#D4A017]">26</div>
          </div>
        </div>

        {/* Rejections by Stage */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-[#E5E7EB]">
            <h3 className="text-[#2B2B2B]">Rejections by Stage</h3>
            <p className="text-sm text-[#9E9E9E]">Distribution across pipeline stages</p>
          </div>
          
          <div className="p-4 md:p-6">
            <div className="space-y-4">
              {rejectionsByStage.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#2B2B2B]">{item.stage}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#9E9E9E]">{item.percentage}%</span>
                      <span className="text-lg text-[#8C1D18]">{item.count}</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#F2F1EE] rounded-full h-2">
                    <div 
                      className="bg-[#8C1D18] h-2 rounded-full" 
                      style={{ width: `${item.percentage * 2.5}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-[#9E9E9E]" />
            <h3 className="text-[#2B2B2B]">Filter Rejections</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-[#9E9E9E] mb-2">Stage</label>
              <select
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              >
                <option value="all">All Stages</option>
                <option value="Rejected – Nomination">Rejected – Nomination</option>
                <option value="Rejected – Criteria">Rejected – Criteria</option>
                <option value="RECEE Completed – Failed">RECEE Failed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-[#9E9E9E] mb-2">State</label>
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              >
                <option value="all">All States</option>
                <option value="lagos">Lagos</option>
                <option value="ogun">Ogun</option>
                <option value="oyo">Oyo</option>
                <option value="rivers">Rivers</option>
                <option value="kano">Kano</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-[#9E9E9E] mb-2">Date Range</label>
              <input
                type="date"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Detailed Rejection Reasons */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-[#E5E7EB]">
            <h3 className="text-[#2B2B2B]">Rejection Reasons</h3>
            <p className="text-sm text-[#9E9E9E]">
              Showing {filteredRejections.length} rejection reason(s)
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F2F1EE]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-[#9E9E9E] uppercase tracking-wide">Stage</th>
                  <th className="px-4 py-3 text-left text-xs text-[#9E9E9E] uppercase tracking-wide">Reason</th>
                  <th className="px-4 py-3 text-right text-xs text-[#9E9E9E] uppercase tracking-wide">Count</th>
                  <th className="px-4 py-3 text-center text-xs text-[#9E9E9E] uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRejections.map((item, idx) => (
                  <tr key={idx} className="border-b border-[#E5E7EB] hover:bg-[#FFFDF8] transition-colors">
                    <td className="px-4 py-3 text-sm text-[#2B2B2B]">{item.stage}</td>
                    <td className="px-4 py-3 text-sm text-[#9E9E9E]">{item.reason}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-block px-3 py-1 bg-[#8C1D18] text-white text-sm rounded-full">
                        {item.count}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button className="text-sm text-[#F5A623] hover:text-[#E09615] transition-colors">
                        View List
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trend Over Time */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-3">
            <TrendingDown className="w-5 h-5 text-[#8C1D18]" />
            <div>
              <h3 className="text-[#2B2B2B]">Rejection Trend</h3>
              <p className="text-sm text-[#9E9E9E]">Weekly rejection count</p>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <div className="flex items-end justify-between gap-2 h-48">
              {trendData.map((week, idx) => {
                const maxValue = Math.max(...trendData.map(w => w.total));
                const heightPercent = (week.total / maxValue) * 100;
                
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-sm text-[#8C1D18]">{week.total}</div>
                    <div 
                      className="w-full bg-[#8C1D18] rounded-t hover:bg-[#6B1512] transition-colors cursor-pointer"
                      style={{ height: `${heightPercent}%` }}
                      title={`${week.week}: ${week.total} rejections`}
                    />
                    <div className="text-xs text-[#9E9E9E] text-center">{week.week.replace('Week ', 'W')}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Rejected LGAs */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-[#E5E7EB]">
            <h3 className="text-[#2B2B2B]">Top Rejected LGAs</h3>
            <p className="text-sm text-[#9E9E9E]">Geographic concentration of rejections</p>
          </div>

          <div className="p-4 md:p-6">
            <div className="space-y-3">
              {topRejectedLGAs.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#9E9E9E]">#{idx + 1}</span>
                    <div>
                      <div className="text-sm text-[#2B2B2B]">{item.lga}</div>
                      <div className="text-xs text-[#9E9E9E]">{item.state} State</div>
                    </div>
                  </div>
                  <span className="text-lg text-[#8C1D18]">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toasts */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {toasts.map((t) => (
          <div key={t.id} className={`flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg border animate-in slide-in-from-right transition-all ${t.variant === 'destructive' ? 'bg-[#8C1D18] border-[#6F1713] text-white' : 'bg-[#2F6B3C] border-[#265A2F] text-white'}`}>
            {t.variant === 'destructive' ? (
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[13px]">{t.title}</p>
              {t.description ? <p className="text-[12px] opacity-90 mt-0.5">{t.description}</p> : null}
            </div>
            <button onClick={() => setToasts((s) => s.filter((x) => x.id !== t.id))} className="shrink-0 hover:opacity-75 transition-opacity">
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
