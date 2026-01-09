'use client'
import { ArrowLeft, ChevronDown, ChevronRight, Search, X } from 'lucide-react';
import { useState } from 'react';
//import { useScreen } from '../contexts/ScreenContext';

interface School {
  id: string;
  name: string;
  type: string;
  lga: string;
  ward: string;
  status: 'Full' | 'Assigned' | 'Draft';
}

const availableSchools: School[] = [
  { id: 'SCH-001', name: 'Government Secondary School Ikeja', type: 'Public', lga: 'Ikeja', ward: 'Ward 3', status: 'Draft' },
  { id: 'SCH-002', name: 'Community Primary School Surulere', type: 'Public', lga: 'Surulere', ward: 'Ward 5', status: 'Draft' },
  { id: 'SCH-003', name: 'St. Agnes Primary School Yaba', type: 'Private', lga: 'Yaba', ward: 'Ward 2', status: 'Draft' },
  { id: 'SCH-004', name: 'Kings College Lagos', type: 'Public', lga: 'Lagos Island', ward: 'Ward 1', status: 'Assigned' },
  { id: 'SCH-005', name: 'Queens College Yaba', type: 'Public', lga: 'Yaba', ward: 'Ward 4', status: 'Full' },
];

function StatusChip({ status }: { status: 'Full' | 'Assigned' | 'Draft' }) {
  const styles = {
    Full: 'bg-[#FFBC3A] text-[#1F2937]',
    Assigned: 'bg-[#FF8500] text-white',
    Draft: 'bg-[#6B7280] text-white',
  };

  return (
    <span className={`inline-flex items-center justify-center h-7 min-w-[96px] px-3 rounded-full text-xs ${styles[status]}`}>
      {status}
    </span>
  );
}

export default function CreateEditCluster() {
 // const { setScreen } = useScreen();
  const isEditMode = false; // Toggle based on context
  const [clusterName, setClusterName] = useState('Ikeja Central Cluster');
  const [clusterCode] = useState('CLU-2024-001');
  const [state, setState] = useState('Lagos');
  const [lga, setLga] = useState('Ikeja');
  const [ward, setWard] = useState('Ward 3');
  const [selectedSchools, setSelectedSchools] = useState<School[]>([
    availableSchools[0],
    availableSchools[1],
    availableSchools[2],
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('2024-02-01');
  const [endDate, setEndDate] = useState('2024-02-28');
  const [slotCapacity, setSlotCapacity] = useState('50');
  const [auditExpanded, setAuditExpanded] = useState(false);

  const maxSchools = 10;

  const handleAddSchool = (school: School) => {
    if (selectedSchools.length < maxSchools && !selectedSchools.find(s => s.id === school.id)) {
      setSelectedSchools([...selectedSchools, school]);
    }
  };

  const handleRemoveSchool = (schoolId: string) => {
    setSelectedSchools(selectedSchools.filter(s => s.id !== schoolId));
  };

  const filteredSchools = availableSchools.filter(school => 
    !selectedSchools.find(s => s.id === school.id) &&
    (school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     school.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSave = () => {
    console.log('Saving cluster...');
   // setScreen('ADMN01 Cluster List');
  };

  const handleCancel = () => {
   // setScreen('ADMN01 Cluster List');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[980px] mx-auto px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-[#1F2937] text-2xl font-semibold mb-1.5">
            {isEditMode ? 'Edit Cluster' : 'Create Cluster'}
          </h1>
          <p className="text-[#4B5563]">
            Define cluster location, schools, and booking window
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2.5 border border-[#E5E7EB] text-[#4B5563] rounded-lg hover:bg-[#F9FAFB] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#FF8500] text-white rounded-lg hover:bg-[#E67700] transition-colors"
          >
            Save Cluster
          </button>
        </div>
      </div>

      {/* Card 1 — Cluster Details */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 mb-6">
        <h2 className="text-[#1F2937] mb-4">Cluster Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="clusterName" className="block text-sm text-[#4B5563] mb-2">
              Cluster Name *
            </label>
            <input
              id="clusterName"
              type="text"
              value={clusterName}
              onChange={(e) => setClusterName(e.target.value)}
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[#1F2937] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFBC3A] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="clusterCode" className="block text-sm text-[#4B5563] mb-2">
              Cluster Code
            </label>
            <input
              id="clusterCode"
              type="text"
              value={clusterCode}
              disabled
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg bg-[#F9FAFB] text-[#4B5563] text-sm cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm text-[#4B5563] mb-2">
              State *
            </label>
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#1F2937] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFBC3A] focus:border-transparent"
            >
              <option value="">Select State</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Kano">Kano</option>
            </select>
          </div>

          <div>
            <label htmlFor="lga" className="block text-sm text-[#4B5563] mb-2">
              LGA *
            </label>
            <select
              id="lga"
              value={lga}
              onChange={(e) => setLga(e.target.value)}
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#1F2937] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFBC3A] focus:border-transparent"
            >
              <option value="">Select LGA</option>
              <option value="Ikeja">Ikeja</option>
              <option value="Surulere">Surulere</option>
              <option value="Yaba">Yaba</option>
            </select>
          </div>

          <div>
            <label htmlFor="ward" className="block text-sm text-[#4B5563] mb-2">
              Ward *
            </label>
            <select
              id="ward"
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#1F2937] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFBC3A] focus:border-transparent"
            >
              <option value="">Select Ward</option>
              <option value="Ward 1">Ward 1</option>
              <option value="Ward 2">Ward 2</option>
              <option value="Ward 3">Ward 3</option>
            </select>
          </div>
        </div>
      </div>

      {/* Card 2 — Schools in Cluster */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#1F2937]">Schools in Cluster</h2>
          <div className="text-sm text-[#4B5563]">
            <span className="text-[#1F2937]">{selectedSchools.length}</span> / {maxSchools} schools
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B5563]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search schools by name or ID..."
            className="w-full pl-10 pr-3 py-2 border-2 border-[#FFBC3A] rounded-lg text-[#1F2937] text-sm placeholder:text-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#FFBC3A] focus:border-[#FF8500]"
          />
        </div>

        {/* Schools Table */}
        {selectedSchools.length > 0 ? (
          <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-[#4B5563] uppercase tracking-wider">School Name</th>
                  <th className="px-4 py-3 text-left text-xs text-[#4B5563] uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs text-[#4B5563] uppercase tracking-wider">LGA</th>
                  <th className="px-4 py-3 text-left text-xs text-[#4B5563] uppercase tracking-wider">Ward</th>
                  <th className="px-4 py-3 text-left text-xs text-[#4B5563] uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-center text-xs text-[#4B5563] uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {selectedSchools.map((school) => (
                  <tr key={school.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-4 py-3 text-sm text-[#1F2937]">{school.name}</td>
                    <td className="px-4 py-3 text-sm text-[#4B5563]">{school.type}</td>
                    <td className="px-4 py-3 text-sm text-[#4B5563]">{school.lga}</td>
                    <td className="px-4 py-3 text-sm text-[#4B5563]">{school.ward}</td>
                    <td className="px-4 py-3">
                      <StatusChip status={school.status} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleRemoveSchool(school.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                      >
                        <X className="w-3 h-3" />
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 border border-[#E5E7EB] rounded-lg bg-[#F9FAFB]">
            <div className="text-sm text-[#4B5563]">No schools added yet.</div>
            <p className="text-xs text-[#4B5563] mt-1">Use the search above to add schools to this cluster</p>
          </div>
        )}

        {/* Available Schools (when searching) */}
        {searchQuery && filteredSchools.length > 0 && (
          <div className="mt-4">
            <div className="text-sm text-[#4B5563] mb-2">Available Schools</div>
            <div className="border border-[#E5E7EB] rounded-lg overflow-hidden max-h-64 overflow-y-auto">
              <table className="w-full">
                <tbody className="divide-y divide-[#E5E7EB]">
                  {filteredSchools.map((school) => (
                    <tr key={school.id} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="px-4 py-3 text-sm text-[#1F2937]">{school.name}</td>
                      <td className="px-4 py-3 text-sm text-[#4B5563]">{school.type}</td>
                      <td className="px-4 py-3 text-sm text-[#4B5563]">{school.lga}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleAddSchool(school)}
                          disabled={selectedSchools.length >= maxSchools}
                          className="px-3 py-1.5 text-xs bg-[#FF8500] text-white rounded-lg hover:bg-[#E67700] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Card 3 — Activation Window */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 mb-6">
        <h2 className="text-[#1F2937] mb-4">Activation Window</h2>
        <div className="grid grid-cols-3 gap-4 mb-3">
          <div>
            <label htmlFor="startDate" className="block text-sm text-[#4B5563] mb-2">
              Start Date *
            </label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[#1F2937] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFBC3A] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm text-[#4B5563] mb-2">
              End Date *
            </label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[#1F2937] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFBC3A] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="slotCapacity" className="block text-sm text-[#4B5563] mb-2">
              Slot Capacity *
            </label>
            <input
              id="slotCapacity"
              type="number"
              value={slotCapacity}
              onChange={(e) => setSlotCapacity(e.target.value)}
              min="1"
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[#1F2937] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFBC3A] focus:border-transparent"
            />
          </div>
        </div>
        <div className="text-sm text-[#4B5563]">
          Schools can only book within this window.
        </div>
      </div>

      {/* Card 4 — Audit */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 mb-24">
        <button
          onClick={() => setAuditExpanded(!auditExpanded)}
          className="w-full flex items-center justify-between text-left"
        >
          <h2 className="text-[#1F2937]">Audit</h2>
          {auditExpanded ? (
            <ChevronDown className="w-5 h-5 text-[#4B5563]" />
          ) : (
            <ChevronRight className="w-5 h-5 text-[#4B5563]" />
          )}
        </button>
        
        {auditExpanded && (
          <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-[#E5E7EB]">
            <div>
              <div className="text-xs text-[#4B5563] mb-1">Created By</div>
              <div className="text-sm text-[#1F2937]">Admin User</div>
            </div>
            <div>
              <div className="text-xs text-[#4B5563] mb-1">Created Date</div>
              <div className="text-sm text-[#1F2937]">Jan 15, 2024</div>
            </div>
            <div>
              <div className="text-xs text-[#4B5563] mb-1">Last Updated</div>
              <div className="text-sm text-[#1F2937]">Jan 20, 2024</div>
            </div>
          </div>
        )}
      </div>

      </div>
      {/* end container */}

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-[260px] right-0 bg-white border-t border-[#E5E7EB] shadow-lg z-40">
        <div className="max-w-[980px] mx-auto px-8 py-4 flex items-center justify-between">
          <div className="text-sm text-[#4B5563]">
            Changes save when you click Save
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2.5 border border-[#E5E7EB] text-[#4B5563] rounded-lg hover:bg-[#F9FAFB] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-[#FF8500] text-white rounded-lg hover:bg-[#E67700] transition-colors"
            >
              Save Cluster
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
