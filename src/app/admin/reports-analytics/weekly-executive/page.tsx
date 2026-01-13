
'use client'
import { useState } from 'react';
import { TrendingUp, TrendingDown, Download, Calendar, AlertTriangle, CheckCircle, X as XIcon } from 'lucide-react';
import { WeeklyMetric, Toast, WeekData, TopLGA, RejectionReason, SLARisk } from '../../../../types/weekly-executive.types';


export default function WeeklyExecutive() {
  const [selectedWeek, setSelectedWeek] = useState('current');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (toast: Omit<Toast, 'id'>) => {
    const id = `t-${Date.now()}`;
    setToasts((s) => [...s, { id, ...toast }]);
    setTimeout(() => setToasts((s) => s.filter((t) => t.id !== id)), 3000);
  };

  // Week data repository
  const weeksData: Record<string, WeekData> = {
    current: {
      week: 'Current Week (Dec 17-23)',
      metrics: [
        { label: 'Nominated', current: 47, previous: 52, delta: -5, deltaPercentage: -9.6, trend: 'down' },
        { label: 'Interest Confirmed', current: 38, previous: 42, delta: -4, deltaPercentage: -9.5, trend: 'down' },
        { label: 'Approved for RECEE', current: 31, previous: 28, delta: 3, deltaPercentage: 10.7, trend: 'up' },
        { label: 'RECEE Passed', current: 24, previous: 19, delta: 5, deltaPercentage: 26.3, trend: 'up' },
        { label: 'Booking Open', current: 18, previous: 15, delta: 3, deltaPercentage: 20, trend: 'up' },
        { label: 'Booked', current: 15, previous: 12, delta: 3, deltaPercentage: 25, trend: 'up' },
        { label: 'Rejections', current: 23, previous: 28, delta: -5, deltaPercentage: -17.9, trend: 'down' },
        { label: 'Cancelled', current: 2, previous: 4, delta: -2, deltaPercentage: -50, trend: 'down' }
      ],
      topLGAs: [
        { lga: 'Ikeja', state: 'Lagos', nominations: 12, booked: 9, conversionRate: 75 },
        { lga: 'Port Harcourt', state: 'Rivers', nominations: 11, booked: 8, conversionRate: 73 },
        { lga: 'Ibadan North', state: 'Oyo', nominations: 10, booked: 7, conversionRate: 70 },
        { lga: 'Lekki', state: 'Lagos', nominations: 9, booked: 6, conversionRate: 67 },
        { lga: 'Abeokuta North', state: 'Ogun', nominations: 8, booked: 5, conversionRate: 63 }
      ],
      rejectionReasons: [
        { reason: 'School type not eligible', count: 8, percentage: 35 },
        { reason: 'Duplicate school', count: 7, percentage: 30 },
        { reason: 'Location not eligible', count: 5, percentage: 22 },
        { reason: 'Infrastructure unsuitable', count: 3, percentage: 13 }
      ],
      slaRisks: [
        { stage: 'Nominated, not reviewed', count: 8, criticalCount: 3 },
        { stage: 'Interest confirmed, not validated', count: 5, criticalCount: 2 },
        { stage: 'Approved for RECEE, not scheduled', count: 7, criticalCount: 2 },
        { stage: 'RECEE completed, not decided', count: 4, criticalCount: 1 }
      ]
    },
    last: {
      week: 'Last Week (Dec 10-16)',
      metrics: [
        { label: 'Nominated', current: 52, previous: 48, delta: 4, deltaPercentage: 8.3, trend: 'up' },
        { label: 'Interest Confirmed', current: 42, previous: 40, delta: 2, deltaPercentage: 5, trend: 'up' },
        { label: 'Approved for RECEE', current: 28, previous: 25, delta: 3, deltaPercentage: 12, trend: 'up' },
        { label: 'RECEE Passed', current: 19, previous: 18, delta: 1, deltaPercentage: 5.6, trend: 'up' },
        { label: 'Booking Open', current: 15, previous: 13, delta: 2, deltaPercentage: 15.4, trend: 'up' },
        { label: 'Booked', current: 12, previous: 10, delta: 2, deltaPercentage: 20, trend: 'up' },
        { label: 'Rejections', current: 28, previous: 32, delta: -4, deltaPercentage: -12.5, trend: 'down' },
        { label: 'Cancelled', current: 4, previous: 3, delta: 1, deltaPercentage: 33.3, trend: 'up' }
      ],
      topLGAs: [
        { lga: 'Port Harcourt', state: 'Rivers', nominations: 13, booked: 9, conversionRate: 69 },
        { lga: 'Ikeja', state: 'Lagos', nominations: 11, booked: 8, conversionRate: 73 },
        { lga: 'Ibadan South', state: 'Oyo', nominations: 10, booked: 6, conversionRate: 60 },
        { lga: 'Lekki', state: 'Lagos', nominations: 8, booked: 5, conversionRate: 63 },
        { lga: 'Nassarawa', state: 'Kano', nominations: 7, booked: 4, conversionRate: 57 }
      ],
      rejectionReasons: [
        { reason: 'School type not eligible', count: 10, percentage: 31 },
        { reason: 'Duplicate school', count: 9, percentage: 28 },
        { reason: 'Location not eligible', count: 8, percentage: 25 },
        { reason: 'Infrastructure unsuitable', count: 5, percentage: 16 }
      ],
      slaRisks: [
        { stage: 'Nominated, not reviewed', count: 12, criticalCount: 4 },
        { stage: 'Interest confirmed, not validated', count: 7, criticalCount: 3 },
        { stage: 'Approved for RECEE, not scheduled', count: 9, criticalCount: 3 },
        { stage: 'RECEE completed, not decided', count: 5, criticalCount: 2 }
      ]
    },
    '2weeks': {
      week: '2 Weeks Ago (Dec 3-9)',
      metrics: [
        { label: 'Nominated', current: 48, previous: 45, delta: 3, deltaPercentage: 6.7, trend: 'up' },
        { label: 'Interest Confirmed', current: 40, previous: 38, delta: 2, deltaPercentage: 5.3, trend: 'up' },
        { label: 'Approved for RECEE', current: 25, previous: 22, delta: 3, deltaPercentage: 13.6, trend: 'up' },
        { label: 'RECEE Passed', current: 18, previous: 16, delta: 2, deltaPercentage: 12.5, trend: 'up' },
        { label: 'Booking Open', current: 13, previous: 11, delta: 2, deltaPercentage: 18.2, trend: 'up' },
        { label: 'Booked', current: 10, previous: 8, delta: 2, deltaPercentage: 25, trend: 'up' },
        { label: 'Rejections', current: 32, previous: 28, delta: 4, deltaPercentage: 14.3, trend: 'up' },
        { label: 'Cancelled', current: 3, previous: 2, delta: 1, deltaPercentage: 50, trend: 'up' }
      ],
      topLGAs: [
        { lga: 'Ibadan North', state: 'Oyo', nominations: 12, booked: 7, conversionRate: 58 },
        { lga: 'Port Harcourt', state: 'Rivers', nominations: 10, booked: 6, conversionRate: 60 },
        { lga: 'Ikeja', state: 'Lagos', nominations: 9, booked: 6, conversionRate: 67 },
        { lga: 'Lekki', state: 'Lagos', nominations: 8, booked: 5, conversionRate: 63 },
        { lga: 'Kano Municipal', state: 'Kano', nominations: 7, booked: 4, conversionRate: 57 }
      ],
      rejectionReasons: [
        { reason: 'School type not eligible', count: 9, percentage: 29 },
        { reason: 'Location not eligible', count: 9, percentage: 29 },
        { reason: 'Duplicate school', count: 8, percentage: 26 },
        { reason: 'Infrastructure unsuitable', count: 5, percentage: 16 }
      ],
      slaRisks: [
        { stage: 'Nominated, not reviewed', count: 10, criticalCount: 3 },
        { stage: 'Interest confirmed, not validated', count: 8, criticalCount: 2 },
        { stage: 'Approved for RECEE, not scheduled', count: 11, criticalCount: 4 },
        { stage: 'RECEE completed, not decided', count: 6, criticalCount: 2 }
      ]
    }
  };

  const currentData = weeksData[selectedWeek as keyof typeof weeksData];
  const weeklyMetrics = currentData.metrics;
  const topLGAs = currentData.topLGAs;
  const topRejectionReasons = currentData.rejectionReasons;
  const slaRisks = currentData.slaRisks;
  const totalSLARisk = slaRisks.reduce((sum, r) => sum + r.count, 0);
  const criticalSLARisk = slaRisks.reduce((sum, r) => sum + r.criticalCount, 0);

  const handleExport = () => {
    toast({ title: 'Export started', description: 'Preparing weekly executive summary...' });
    try {
      const headers = ['Metric', 'This Week', 'Last Period', 'Change', 'Trend %'];
      const rows = weeklyMetrics.map((m) => [
        `"${m.label}"`,
        m.current,
        m.previous,
        m.delta > 0 ? `+${m.delta}` : m.delta,
        m.deltaPercentage > 0 ? `+${m.deltaPercentage.toFixed(1)}%` : `${m.deltaPercentage.toFixed(1)}%`
      ].join(','));
      const csv = [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `weekly-executive-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast({ title: 'Export completed', description: `${weeklyMetrics.length} metrics exported.` });
    } catch (err) {
      toast({ title: 'Export failed', description: 'Could not create export file.', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 md:px-8 py-4 md:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#F5A623]" />
              <div>
                <h1 className="text-[#2B2B2B] mb-1">Weekly Executive Summary</h1>
                <p className="text-sm text-[#9E9E9E]">Campaign performance snapshot</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="flex-1 md:flex-none px-4 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              >
                <option value="current">Current Week (Dec 17-23)</option>
                <option value="last">Last Week (Dec 10-16)</option>
                <option value="2weeks">2 Weeks Ago (Dec 3-9)</option>
              </select>
              
              <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09615] transition-colors">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
        {/* Executive Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 md:p-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-[#2F6B3C]" />
              <div className="text-sm text-[#9E9E9E]">Total Booked</div>
            </div>
            <div className="text-3xl md:text-4xl text-[#2B2B2B] mb-2">15</div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#2F6B3C]" />
              <span className="text-sm text-[#2F6B3C]">+3 from last week</span>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 md:p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-[#F5A623]" />
              <div className="text-sm text-[#9E9E9E]">Conversion Rate</div>
            </div>
            <div className="text-3xl md:text-4xl text-[#2B2B2B] mb-2">68%</div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#2F6B3C]" />
              <span className="text-sm text-[#2F6B3C]">+5% from last week</span>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 md:p-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-[#8C1D18]" />
              <div className="text-sm text-[#9E9E9E]">SLA Risk</div>
            </div>
            <div className="text-3xl md:text-4xl text-[#8C1D18] mb-2">{criticalSLARisk}</div>
            <div className="text-sm text-[#9E9E9E]">{totalSLARisk} total at risk</div>
          </div>
        </div>

        {/* Week vs Previous Week */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-[#E5E7EB]">
            <h3 className="text-[#2B2B2B]">Pipeline Performance</h3>
            <p className="text-sm text-[#9E9E9E]">Week-over-week comparison by stage</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-[#F2F1EE]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-[#9E9E9E] uppercase tracking-wide">Stage</th>
                  <th className="px-4 py-3 text-center text-xs text-[#9E9E9E] uppercase tracking-wide">This Week</th>
                  <th className="px-4 py-3 text-center text-xs text-[#9E9E9E] uppercase tracking-wide">Last Week</th>
                  <th className="px-4 py-3 text-center text-xs text-[#9E9E9E] uppercase tracking-wide">Change</th>
                  <th className="px-4 py-3 text-center text-xs text-[#9E9E9E] uppercase tracking-wide">Trend</th>
                </tr>
              </thead>
              <tbody>
                {weeklyMetrics.map((metric, idx) => (
                  <tr key={idx} className="border-b border-[#E5E7EB] hover:bg-[#FFFDF8] transition-colors">
                    <td className="px-4 py-3 text-sm text-[#2B2B2B]">{metric.label}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-lg text-[#2B2B2B]">{metric.current}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-[#9E9E9E]">{metric.previous}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-sm ${
                        metric.delta > 0 ? 'text-[#2F6B3C]' :
                        metric.delta < 0 ? 'text-[#8C1D18]' :
                        'text-[#9E9E9E]'
                      }`}>
                        {metric.delta > 0 ? '+' : ''}{metric.delta}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-[#2F6B3C]" />}
                        {metric.trend === 'down' && <TrendingDown className="w-4 h-4 text-[#8C1D18]" />}
                        <span className={`text-sm ${
                          metric.trend === 'up' ? 'text-[#2F6B3C]' :
                          metric.trend === 'down' ? 'text-[#8C1D18]' :
                          'text-[#9E9E9E]'
                        }`}>
                          {Math.abs(metric.deltaPercentage).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top LGAs */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
            <div className="px-4 md:px-6 py-4 border-b border-[#E5E7EB]">
              <h3 className="text-[#2B2B2B]">Top Performing LGAs</h3>
              <p className="text-sm text-[#9E9E9E]">By nominations this week</p>
            </div>

            <div className="p-4 md:p-6">
              <div className="space-y-4">
                {topLGAs.map((lga, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#F5A623] text-white text-xs">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="text-sm text-[#2B2B2B]">{lga.lga}</div>
                          <div className="text-xs text-[#9E9E9E]">{lga.state}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-[#2B2B2B]">{lga.booked}/{lga.nominations}</div>
                        <div className="text-xs text-[#2F6B3C]">{lga.conversionRate}%</div>
                      </div>
                    </div>
                    <div className="w-full bg-[#F2F1EE] rounded-full h-1.5">
                      <div 
                        className="bg-[#2F6B3C] h-1.5 rounded-full" 
                        style={{ width: `${lga.conversionRate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Rejection Reasons */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
            <div className="px-4 md:px-6 py-4 border-b border-[#E5E7EB]">
              <h3 className="text-[#2B2B2B]">Top Rejection Reasons</h3>
              <p className="text-sm text-[#9E9E9E]">This week's rejections</p>
            </div>

            <div className="p-4 md:p-6">
              <div className="space-y-4">
                {topRejectionReasons.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#2B2B2B]">{item.reason}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#9E9E9E]">{item.percentage}%</span>
                        <span className="text-sm text-[#8C1D18]">{item.count}</span>
                      </div>
                    </div>
                    <div className="w-full bg-[#F2F1EE] rounded-full h-1.5">
                      <div 
                        className="bg-[#8C1D18] h-1.5 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SLA Risk Summary */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-[#8C1D18]" />
            <div>
              <h3 className="text-[#2B2B2B]">SLA Risk Count</h3>
              <p className="text-sm text-[#9E9E9E]">Schools exceeding time thresholds</p>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <div className="space-y-3">
              {slaRisks.map((risk, idx) => (
                <div key={idx} className="flex items-center justify-between py-2">
                  <span className="text-sm text-[#2B2B2B] flex-1">{risk.stage}</span>
                  <div className="flex items-center gap-4">
                    {risk.criticalCount > 0 && (
                      <span className="px-3 py-1 bg-[#8C1D18] text-white text-xs rounded-full">
                        {risk.criticalCount} Critical
                      </span>
                    )}
                    <span className="text-lg text-[#D4A017] min-w-[3rem] text-right">{risk.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-[#FFF7ED] border border-[#F5A623]/30 rounded-lg p-4 md:p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#F5A623] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">💡</span>
            </div>
            <div>
              <div className="text-[#2B2B2B] mb-3">Key Insights & Actions</div>
              <ul className="text-sm text-[#2B2B2B] space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#2F6B3C]">✓</span>
                  <span><strong>Positive:</strong> Booking conversion rate up 5% week-over-week</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4A017]">⚠</span>
                  <span><strong>Watch:</strong> 8 schools stuck in nomination review (3 critical)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8C1D18]">✕</span>
                  <span><strong>Action Needed:</strong> Review school eligibility criteria - 35% of rejections due to type mismatch</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F5A623]">→</span>
                  <span><strong>Recommendation:</strong> Focus RECEE scheduling efforts on Ikeja and Port Harcourt LGAs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Toast Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`flex items-start gap-3 p-3 rounded-lg border ${t.variant === 'destructive' ? 'bg-[#8C1D18]/10 border-[#8C1D18]/30' : 'bg-[#2F6B3C]/10 border-[#2F6B3C]/30'}`}
            >
              {t.variant === 'destructive' ? (
                <AlertTriangle className="w-4 h-4 text-[#8C1D18] flex-shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="w-4 h-4 text-[#2F6B3C] flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`font-medium text-[13px] ${t.variant === 'destructive' ? 'text-[#8C1D18]' : 'text-[#2F6B3C]'}`}>
                  {t.title}
                </p>
                {t.description && (
                  <p className={`text-[12px] ${t.variant === 'destructive' ? 'text-[#8C1D18]/70' : 'text-[#2F6B3C]/70'}`}>
                    {t.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => setToasts((s) => s.filter((x) => x.id !== t.id))}
                className={`text-[#9E9E9E] hover:text-[#2B2B2B] flex-shrink-0`}
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
