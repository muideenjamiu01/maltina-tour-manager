'use client'
import { useState } from 'react';
import { AlertCircle, Download, Users, Flag, CheckCircle } from 'lucide-react';
import { AdminHeader } from '@/components/admin/admin-header';

export default function AdminDashboard() {

  const [activeTab, setActiveTab] = useState<'submissions' | 'judges' | 'verification' | 'voting' | 'audit'>('submissions');

  const metrics = {
    totalEntries: 1247,
    entriesByZone: { north: 298, south: 334, east: 287, west: 328 },
    unverifiedSchools: 23,
    unassignedDesigns: 0,
    judgesActive: 12,
    judgesInactive: 3
  };

  const submissions = [
    { id: 'COMP-2025-0001', child: 'Jane D.', age: 10, zone: 'West', school: 'Greenfield Primary', status: 'Pending Review', judgeScore: null },
    { id: 'COMP-2025-0002', child: 'John S.', age: 12, zone: 'North', school: 'St. Mary\'s Secondary', status: 'Judged', judgeScore: 82 },
    { id: 'COMP-2025-0003', child: 'Mary K.', age: 9, zone: 'East', school: 'Victory College', status: 'Shortlisted', judgeScore: 95 },
  ];

  return (
       <div className="min-h-screen bg-white">
          <AdminHeader 
            title="Competition Manager"
            subtitle="Create and manage competitions across campaigns and cycles"
          
          />
     <div className="max-w-[1200px] mx-auto py-8">
      {/* Role Banner */}
      <div className="bg-[#FFF7ED] border border-[#FFBC3A] rounded-lg p-3 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#FF8500]" />
          <span className="text-sm text-[#1F2937]">
            <strong>Role:</strong> Competition Admin · All changes are logged
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[#1F2937] mb-2">Competition Admin Dashboard</h1>
          <p className="text-[#6B7280]">Maltina Design Competition 2025</p>
        </div>
        <button className="px-4 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
          <div className="text-sm text-[#6B7280] mb-1">Total Entries</div>
          <div className="text-2xl text-[#1F2937]">{metrics.totalEntries}</div>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
          <div className="text-sm text-[#6B7280] mb-1">Unverified Schools</div>
          <div className="text-2xl text-[#FF8500]">{metrics.unverifiedSchools}</div>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
          <div className="text-sm text-[#6B7280] mb-1">Active Judges</div>
          <div className="text-2xl text-[#10B981]">{metrics.judgesActive}</div>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
          <div className="text-sm text-[#6B7280] mb-1">Unassigned Designs</div>
          <div className="text-2xl text-[#1F2937]">{metrics.unassignedDesigns}</div>
        </div>
      </div>

      {/* Entries by Zone */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6">
        <h2 className="text-[#1F2937] mb-4">Entries by Zone</h2>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(metrics.entriesByZone).map(([zone, count]) => (
            <div key={zone} className="text-center p-4 bg-[#F9FAFB] rounded-lg">
              <div className="text-sm text-[#6B7280] mb-1 capitalize">{zone}</div>
              <div className="text-2xl text-[#FF8500]">{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg">
        <div className="border-b border-[#E5E7EB] flex">
          {(['submissions', 'judges', 'verification', 'voting', 'audit'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm capitalize transition-colors ${
                activeTab === tab
                  ? 'text-[#FF8500] border-b-2 border-[#FF8500]'
                  : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm text-[#6B7280]">Entry ID</th>
                    <th className="text-left px-4 py-3 text-sm text-[#6B7280]">Child</th>
                    <th className="text-left px-4 py-3 text-sm text-[#6B7280]">Age</th>
                    <th className="text-left px-4 py-3 text-sm text-[#6B7280]">Zone</th>
                    <th className="text-left px-4 py-3 text-sm text-[#6B7280]">School</th>
                    <th className="text-left px-4 py-3 text-sm text-[#6B7280]">Status</th>
                    <th className="text-left px-4 py-3 text-sm text-[#6B7280]">Score</th>
                    <th className="text-left px-4 py-3 text-sm text-[#6B7280]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {submissions.map(sub => (
                    <tr key={sub.id} className="hover:bg-[#F9FAFB]">
                      <td className="px-4 py-3 text-sm font-mono text-[#6B7280]">{sub.id}</td>
                      <td className="px-4 py-3 text-sm text-[#1F2937]">{sub.child}</td>
                      <td className="px-4 py-3 text-sm text-[#6B7280]">{sub.age}</td>
                      <td className="px-4 py-3 text-sm text-[#FF8500]">{sub.zone}</td>
                      <td className="px-4 py-3 text-sm text-[#6B7280]">{sub.school}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded ${
                          sub.status === 'Shortlisted' ? 'bg-[#D1FAE5] text-[#065F46]' :
                          sub.status === 'Judged' ? 'bg-[#F3F4F6] text-[#1F2937]' :
                          'bg-[#FFF7ED] text-[#FF8500]'
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#1F2937]">
                        {sub.judgeScore ? `${sub.judgeScore}/100` : '-'}
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-sm px-3 py-1 bg-[#FF8500] text-white rounded hover:bg-[#E67700]">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Judges Tab */}
        {activeTab === 'judges' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#1F2937]">Judge Management</h2>
              <button
                //onClick={() => setScreen('COMP-A02 Judge Management')}
                className="px-4 py-2 bg-[#FF8500] text-white rounded-lg hover:bg-[#E67700] flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Manage Judges
              </button>
            </div>
            <p className="text-sm text-[#6B7280]">
              {metrics.judgesActive} active judges · {metrics.judgesInactive} inactive
            </p>
          </div>
        )}

        {/* Other tabs placeholder */}
        {activeTab !== 'submissions' && activeTab !== 'judges' && (
          <div className="p-12 text-center text-[#6B7280]">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content coming soon
          </div>
        )}
      </div>
    </div>
    </div>
  );
 
}
