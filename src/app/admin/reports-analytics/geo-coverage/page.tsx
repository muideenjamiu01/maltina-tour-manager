'use client'
import { useState } from 'react';
import { MapPin, TrendingUp, Filter, CheckCircle, AlertTriangle, X as XIcon } from 'lucide-react';
import { Fragment } from 'react';
import { GeoDataRow, Toast, CellProps } from '../../../../../types/geo-coverage.types';

function DataCell({ value, onClick, highlight }: CellProps) {
  const highlightStyles = {
    high: 'bg-[#2F6B3C]/10 text-[#2F6B3C] hover:bg-[#2F6B3C]/20',
    medium: 'bg-[#D4A017]/10 text-[#D4A017] hover:bg-[#D4A017]/20',
    low: 'bg-[#F2F1EE] text-[#9E9E9E] hover:bg-[#E5E7EB]',
    fail: 'bg-[#8C1D18]/10 text-[#8C1D18] hover:bg-[#8C1D18]/20'
  };

  const style = highlight ? highlightStyles[highlight] : 'hover:bg-[#F2F1EE]';

  return (
    <td className="px-3 md:px-4 py-3 text-center">
      <button
        onClick={onClick}
        className={`w-full px-2 py-1 rounded transition-colors ${style} cursor-pointer`}
        title="Click to view schools"
      >
        <span className="text-sm">{value}</span>
      </button>
    </td>
  );
}

const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toast = ({ title, description = '', variant = 'default' }: Omit<Toast, 'id'>) => {
    const id = `t-${Date.now()}`;
    setToasts((s) => [...s, { id, title, description, variant }]);
    setTimeout(() => setToasts((s) => s.filter((t) => t.id !== id)), 3000);
  };
  return { toasts, setToasts, toast } as const;
};

export default function GeoCoverage() {
 // const { setScreen } = useScreen();
  const [expandedState, setExpandedState] = useState<string | null>('Lagos');
  const [searchQuery, setSearchQuery] = useState('');
  const { toasts, setToasts, toast } = useToast();

  const handleDrillDown = (state: string, lga: string | undefined, stage: string) => {
    const location = lga ? `${lga}, ${state}` : state;

    console.log(`Drilling down to: ${stage} schools in ${location}`);
   // setScreen('OPS-SCH01 School Directory');
    // In production, you would pass these filters as URL params or state
  };

  const geoData: GeoDataRow[] = [
    // Lagos State
    { state: 'Lagos', lga: 'Ikeja', nominated: 45, interestConfirmed: 38, criteriaFail: 5, receePass: 32, receeFail: 3, booked: 28 },
    { state: 'Lagos', lga: 'Lekki', nominated: 38, interestConfirmed: 35, criteriaFail: 2, receePass: 31, receeFail: 2, booked: 27 },
    { state: 'Lagos', lga: 'Surulere', nominated: 32, interestConfirmed: 28, criteriaFail: 3, receePass: 24, receeFail: 2, booked: 22 },
    { state: 'Lagos', lga: 'Yaba', nominated: 28, interestConfirmed: 24, criteriaFail: 2, receePass: 21, receeFail: 1, booked: 19 },
    
    // Ogun State
    { state: 'Ogun', lga: 'Abeokuta North', nominated: 22, interestConfirmed: 18, criteriaFail: 3, receePass: 15, receeFail: 1, booked: 14 },
    { state: 'Ogun', lga: 'Abeokuta South', nominated: 19, interestConfirmed: 16, criteriaFail: 2, receePass: 14, receeFail: 0, booked: 13 },
    { state: 'Ogun', lga: 'Ifo', nominated: 15, interestConfirmed: 12, criteriaFail: 2, receePass: 10, receeFail: 1, booked: 9 },
    
    // Oyo State
    { state: 'Oyo', lga: 'Ibadan North', nominated: 26, interestConfirmed: 22, criteriaFail: 3, receePass: 19, receeFail: 1, booked: 17 },
    { state: 'Oyo', lga: 'Ibadan South', nominated: 24, interestConfirmed: 20, criteriaFail: 2, receePass: 18, receeFail: 0, booked: 16 },
    { state: 'Oyo', lga: 'Ogbomoso', nominated: 18, interestConfirmed: 15, criteriaFail: 2, receePass: 13, receeFail: 1, booked: 12 },
    
    // Rivers State
    { state: 'Rivers', lga: 'Port Harcourt', nominated: 35, interestConfirmed: 30, criteriaFail: 4, receePass: 26, receeFail: 2, booked: 23 },
    { state: 'Rivers', lga: 'Obio-Akpor', nominated: 28, interestConfirmed: 24, criteriaFail: 3, receePass: 21, receeFail: 1, booked: 19 },
    
    // Kano State
    { state: 'Kano', lga: 'Kano Municipal', nominated: 31, interestConfirmed: 26, criteriaFail: 4, receePass: 22, receeFail: 2, booked: 20 },
    { state: 'Kano', lga: 'Nassarawa', nominated: 23, interestConfirmed: 19, criteriaFail: 3, receePass: 16, receeFail: 1, booked: 14 }
  ];

  // Group by state
  const stateGroups = geoData.reduce((acc, row) => {
    if (!acc[row.state]) acc[row.state] = [];
    acc[row.state].push(row);
    return acc;
  }, {} as Record<string, GeoDataRow[]>);

  // Filter states and LGAs based on search query
  const filteredStateGroups = searchQuery.trim()
    ? Object.entries(stateGroups).reduce((acc, [state, rows]) => {
        if (!acc[state]) acc[state] = [];
        const filtered = rows.filter((row) =>
          row.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.lga.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filtered.length > 0) {
          acc[state] = filtered;
        }
        return acc;
      }, {} as Record<string, GeoDataRow[]>)
    : stateGroups;

  // Calculate filtered state totals
  const filteredStateTotals = Object.entries(filteredStateGroups).map(([state, rows]) => ({
    state,
    nominated: rows.reduce((sum, r) => sum + r.nominated, 0),
    interestConfirmed: rows.reduce((sum, r) => sum + r.interestConfirmed, 0),
    criteriaFail: rows.reduce((sum, r) => sum + r.criteriaFail, 0),
    receePass: rows.reduce((sum, r) => sum + r.receePass, 0),
    receeFail: rows.reduce((sum, r) => sum + r.receeFail, 0),
    booked: rows.reduce((sum, r) => sum + r.booked, 0)
  }));

  const handleCellClick = (filter: { state?: string; lga?: string; stage?: string }) => {
    console.log('Drilling down with filter:', filter);
    // In real implementation, navigate to filtered school list
  };

  const getHighlight = (value: number, max: number, isFailure: boolean = false): 'high' | 'medium' | 'low' | 'fail' | undefined => {
    if (isFailure && value > 0) return 'fail';
    if (value === 0) return 'low';
    const percentage = (value / max) * 100;
    if (percentage >= 70) return 'high';
    if (percentage >= 40) return 'medium';
    return 'low';
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 md:px-8 py-4 md:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-[#F5A623]" />
              <div>
                <h1 className="text-[#2B2B2B] mb-1">Geographic Coverage Report</h1>
                <p className="text-sm text-[#9E9E9E]">State and LGA pipeline breakdown</p>
              </div>
            </div>
            
            {/* Search */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search state or LGA..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 md:flex-none md:w-64 px-4 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-sm text-[#9E9E9E] mb-1">Total States</div>
            <div className="text-2xl md:text-3xl text-[#2B2B2B]">{Object.keys(filteredStateGroups).length}</div>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-sm text-[#9E9E9E] mb-1">Total LGAs</div>
            <div className="text-2xl md:text-3xl text-[#2B2B2B]">{Object.values(filteredStateGroups).reduce((sum, rows) => sum + rows.length, 0)}</div>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-sm text-[#9E9E9E] mb-1">Top State</div>
            <div className="text-lg md:text-xl text-[#2F6B3C]">Lagos</div>
            <div className="text-sm text-[#9E9E9E]">143 nominated</div>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-sm text-[#9E9E9E] mb-1">Top LGA</div>
            <div className="text-lg md:text-xl text-[#2F6B3C]">Ikeja</div>
            <div className="text-sm text-[#9E9E9E]">45 nominated</div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-[#FFF7ED] border border-[#F5A623]/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-[#F5A623] flex-shrink-0" />
            <div className="text-sm text-[#2B2B2B]">
              Click any number to drill down into the school list for that state, LGA, and pipeline stage.
            </div>
          </div>
        </div>

        {/* Geographic Data Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-[#F2F1EE] sticky top-0">
                <tr>
                  <th className="px-3 md:px-4 py-3 text-left text-xs text-[#9E9E9E] uppercase tracking-wide">State / LGA</th>
                  <th className="px-3 md:px-4 py-3 text-center text-xs text-[#9E9E9E] uppercase tracking-wide">Nominated</th>
                  <th className="px-3 md:px-4 py-3 text-center text-xs text-[#9E9E9E] uppercase tracking-wide">Interest</th>
                  <th className="px-3 md:px-4 py-3 text-center text-xs text-[#9E9E9E] uppercase tracking-wide">Criteria Fail</th>
                  <th className="px-3 md:px-4 py-3 text-center text-xs text-[#9E9E9E] uppercase tracking-wide">RECEE Pass</th>
                  <th className="px-3 md:px-4 py-3 text-center text-xs text-[#9E9E9E] uppercase tracking-wide">RECEE Fail</th>
                  <th className="px-3 md:px-4 py-3 text-center text-xs text-[#9E9E9E] uppercase tracking-wide">Booked</th>
                </tr>
              </thead>
              <tbody>
                {filteredStateTotals.map((stateTotal) => {
                  const isExpanded = expandedState === stateTotal.state;
                  const lgaRows = filteredStateGroups[stateTotal.state];

                  return (
                    <Fragment key={stateTotal.state}>
                      {/* State Row */}
                      <tr
                        className="border-b-2 border-[#E5E7EB] bg-[#FFFDF8] hover:bg-[#FFF7ED] transition-colors cursor-pointer"
                        onClick={() => setExpandedState(isExpanded ? null : stateTotal.state)}
                      >
                        <td className="px-3 md:px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{isExpanded ? '▼' : '▶'}</span>
                            <span className="text-[#2B2B2B]">{stateTotal.state}</span>
                          </div>
                        </td>
                        <DataCell 
                          value={stateTotal.nominated} 
                          onClick={() => handleDrillDown(stateTotal.state, undefined, 'nominated')}
                          highlight={getHighlight(stateTotal.nominated, 150, false)}
                        />
                        <DataCell 
                          value={stateTotal.interestConfirmed} 
                          onClick={() => handleDrillDown(stateTotal.state, undefined, 'interest')}
                          highlight={getHighlight(stateTotal.interestConfirmed, stateTotal.nominated, false)}
                        />
                        <DataCell 
                          value={stateTotal.criteriaFail} 
                          onClick={() => handleDrillDown(stateTotal.state, undefined, 'criteria-fail')}
                          highlight={getHighlight(stateTotal.criteriaFail, stateTotal.nominated, true)}
                        />
                        <DataCell 
                          value={stateTotal.receePass} 
                          onClick={() => handleDrillDown(stateTotal.state, undefined, 'recee-pass')}
                          highlight={getHighlight(stateTotal.receePass, stateTotal.nominated, false)}
                        />
                        <DataCell 
                          value={stateTotal.receeFail} 
                          onClick={() => handleDrillDown(stateTotal.state, undefined, 'recee-fail')}
                          highlight={getHighlight(stateTotal.receeFail, stateTotal.nominated, true)}
                        />
                        <DataCell 
                          value={stateTotal.booked} 
                          onClick={() => handleDrillDown(stateTotal.state, undefined, 'booked')}
                          highlight={getHighlight(stateTotal.booked, stateTotal.nominated, false)}
                        />
                      </tr>

                      {/* LGA Rows (if expanded) */}
                      {isExpanded && lgaRows.map((row) => (
                        <tr key={`${row.state}-${row.lga}`} className="border-b border-[#E5E7EB] hover:bg-[#FFFDF8] transition-colors">
                          <td className="px-3 md:px-4 py-3 pl-12">
                            <span className="text-sm text-[#9E9E9E]">{row.lga}</span>
                          </td>
                          <DataCell 
                            value={row.nominated} 
                            onClick={() => handleDrillDown(row.state, row.lga, 'nominated')}
                            highlight={getHighlight(row.nominated, 50, false)}
                          />
                          <DataCell 
                            value={row.interestConfirmed} 
                            onClick={() => handleDrillDown(row.state, row.lga, 'interest')}
                            highlight={getHighlight(row.interestConfirmed, row.nominated, false)}
                          />
                          <DataCell 
                            value={row.criteriaFail} 
                            onClick={() => handleDrillDown(row.state, row.lga, 'criteria-fail')}
                            highlight={getHighlight(row.criteriaFail, row.nominated, true)}
                          />
                          <DataCell 
                            value={row.receePass} 
                            onClick={() => handleDrillDown(row.state, row.lga, 'recee-pass')}
                            highlight={getHighlight(row.receePass, row.nominated, false)}
                          />
                          <DataCell 
                            value={row.receeFail} 
                            onClick={() => handleDrillDown(row.state, row.lga, 'recee-fail')}
                            highlight={getHighlight(row.receeFail, row.nominated, true)}
                          />
                          <DataCell 
                            value={row.booked} 
                            onClick={() => handleDrillDown(row.state, row.lga, 'booked')}
                            highlight={getHighlight(row.booked, row.nominated, false)}
                          />
                        </tr>
                      ))}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
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
