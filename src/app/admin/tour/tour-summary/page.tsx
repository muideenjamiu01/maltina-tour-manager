'use client'
import { useState } from 'react';
import { Search, Filter, Download, Eye, Calendar, MapPin, Users, TrendingUp } from 'lucide-react';
import { AdminHeader } from "@/components/admin/admin-header"

interface Tour {
  id: string;
  tourName: string;
  location: string;
  date: string;
  school: string;
  numberOfChildren: number;
  status: 'completed' | 'in-progress' | 'scheduled' | 'cancelled';
  gender: { male: number; female: number };
  ageGroup: { under10: number; age10to12: number; age13plus: number };
  schoolType: 'primary' | 'secondary' | 'mixed';
}

export default function TourSummary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterSchool, setFilterSchool] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState('all');

  const tours: Tour[] = [
    {
      id: 'TR-001',
      tourName: 'Lagos Island School Tour Wave 1',
      location: 'Lagos Island, Lagos',
      date: '2025-02-15',
      school: "King's College Lagos",
      numberOfChildren: 856,
      status: 'completed',
      gender: { male: 412, female: 444 },
      ageGroup: { under10: 120, age10to12: 456, age13plus: 280 },
      schoolType: 'secondary'
    },
    {
      id: 'TR-002',
      tourName: 'Ikeja Schools Activation',
      location: 'Ikeja, Lagos',
      date: '2025-02-18',
      school: 'Green Valley Secondary School',
      numberOfChildren: 650,
      status: 'completed',
      gender: { male: 320, female: 330 },
      ageGroup: { under10: 85, age10to12: 380, age13plus: 185 },
      schoolType: 'secondary'
    },
    {
      id: 'TR-003',
      tourName: 'Surulere Primary Schools Drive',
      location: 'Surulere, Lagos',
      date: '2025-02-20',
      school: 'Unity Primary School',
      numberOfChildren: 420,
      status: 'completed',
      gender: { male: 205, female: 215 },
      ageGroup: { under10: 280, age10to12: 140, age13plus: 0 },
      schoolType: 'primary'
    },
    {
      id: 'TR-004',
      tourName: 'Kano Municipal Education Tour',
      location: 'Kano Municipal, Kano',
      date: '2025-02-22',
      school: 'Bright Future Academy',
      numberOfChildren: 580,
      status: 'completed',
      gender: { male: 290, female: 290 },
      ageGroup: { under10: 150, age10to12: 320, age13plus: 110 },
      schoolType: 'mixed'
    },
    {
      id: 'TR-005',
      tourName: 'Lekki Schools Engagement',
      location: 'Lekki, Lagos',
      date: '2025-02-25',
      school: 'Excellence International School',
      numberOfChildren: 720,
      status: 'completed',
      gender: { male: 355, female: 365 },
      ageGroup: { under10: 180, age10to12: 420, age13plus: 120 },
      schoolType: 'mixed'
    },
    {
      id: 'TR-006',
      tourName: 'Abuja Central Schools Wave 1',
      location: 'Garki, Abuja',
      date: '2025-03-02',
      school: 'Capital Heights School',
      numberOfChildren: 780,
      status: 'in-progress',
      gender: { male: 390, female: 390 },
      ageGroup: { under10: 140, age10to12: 480, age13plus: 160 },
      schoolType: 'secondary'
    },
    {
      id: 'TR-007',
      tourName: 'Wuse District Education Drive',
      location: 'Wuse, Abuja',
      date: '2025-03-05',
      school: 'Sunrise Academy Wuse',
      numberOfChildren: 550,
      status: 'scheduled',
      gender: { male: 275, female: 275 },
      ageGroup: { under10: 200, age10to12: 280, age13plus: 70 },
      schoolType: 'primary'
    },
    {
      id: 'TR-008',
      tourName: 'Victoria Island Premium Schools',
      location: 'Victoria Island, Lagos',
      date: '2025-03-08',
      school: 'International School Lagos',
      numberOfChildren: 920,
      status: 'scheduled',
      gender: { male: 460, female: 460 },
      ageGroup: { under10: 180, age10to12: 520, age13plus: 220 },
      schoolType: 'mixed'
    }
  ];

  // Filter tours
  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.tourName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = filterLocation === 'all' || tour.location.includes(filterLocation);
    const matchesSchool = filterSchool === 'all' || tour.school === filterSchool;
    const matchesDate = filterDateRange === 'all' || 
      (filterDateRange === 'february' && tour.date.includes('2025-02')) ||
      (filterDateRange === 'march' && tour.date.includes('2025-03'));
    return matchesSearch && matchesLocation && matchesSchool && matchesDate;
  });

  // Calculate totals
  const totalTours = filteredTours.length;
  const schoolsVisited = new Set(filteredTours.filter(t => t.status === 'completed').map(t => t.school)).size;
  const totalChildren = filteredTours.reduce((sum, tour) => sum + tour.numberOfChildren, 0);
  const completedTours = filteredTours.filter(t => t.status === 'completed').length;
  const completionRate = totalTours > 0 ? (completedTours / totalTours) * 100 : 0;

  // Children breakdown
  const totalMale = filteredTours.reduce((sum, tour) => sum + tour.gender.male, 0);
  const totalFemale = filteredTours.reduce((sum, tour) => sum + tour.gender.female, 0);
  const totalUnder10 = filteredTours.reduce((sum, tour) => sum + tour.ageGroup.under10, 0);
  const totalAge10to12 = filteredTours.reduce((sum, tour) => sum + tour.ageGroup.age10to12, 0);
  const totalAge13plus = filteredTours.reduce((sum, tour) => sum + tour.ageGroup.age13plus, 0);
  const primarySchools = filteredTours.filter(t => t.schoolType === 'primary').length;
  const secondarySchools = filteredTours.filter(t => t.schoolType === 'secondary').length;
  const mixedSchools = filteredTours.filter(t => t.schoolType === 'mixed').length;

  const getStatusBadge = (status: Tour['status']) => {
    const config = {
      'completed': { bg: 'bg-[#FEF3E2]', text: 'text-[#FF8500]', label: 'Completed' },
      'in-progress': { bg: 'bg-[#FFF7ED]', text: 'text-[#FFBC3A]', label: 'In Progress' },
      'scheduled': { bg: 'bg-[#F2F1EE]', text: 'text-[#9E9E9E]', label: 'Scheduled' },
      'cancelled': { bg: 'bg-[#FDE8E7]', text: 'text-[#8C1D18]', label: 'Cancelled' }
    };
    const statusConfig = config[status];
    return (
      <span className={`${statusConfig.bg} ${statusConfig.text} px-2 py-1 rounded text-[11px]`}>
        {statusConfig.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader 
        title="Tour Summary"
        subtitle="Overview of all tours with children reach and completion metrics"
        screenCode="TOUR-01"
        actions={
          <button className="px-4 py-2 bg-[#FF8500] text-white rounded-lg hover:bg-[#E07600] transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        }
      />

      <div className="max-w-[1280px] mx-auto px-8 py-8">
        {/* Top Summary Cards */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Total Tours</span>
              <Calendar className="w-4 h-4 text-[#FF8500]" />
            </div>
            <div className="text-[28px] text-[#2B2B2B]">{totalTours}</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">{completedTours} completed</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Schools Visited</span>
              <MapPin className="w-4 h-4 text-[#FF8500]" />
            </div>
            <div className="text-[28px] text-[#FF8500]">{schoolsVisited}</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">Unique schools</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Total Children Reached</span>
              <Users className="w-4 h-4 text-[#FF8500]" />
            </div>
            <div className="text-[28px] text-[#2B2B2B]">{totalChildren.toLocaleString()}</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">Across all tours</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Completion Rate</span>
              <TrendingUp className="w-4 h-4 text-[#FF8500]" />
            </div>
            <div className="text-[28px] text-[#FF8500]">{completionRate.toFixed(1)}%</div>
            <div className="text-[11px] text-[#9E9E9E] mt-1">{completedTours} of {totalTours} tours</div>
          </div>
        </div>

        {/* Children Breakdown Charts */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          {/* Gender Breakdown */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-5">
            <div className="text-[13px] text-[#FF8500] font-bold mb-4">CHILDREN BY GENDER</div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-[#2B2B2B]">Male</span>
                  <span className="text-[13px] text-[#2B2B2B]">{totalMale.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-[#F2F1EE] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FF8500]" 
                    style={{ width: `${(totalMale / totalChildren) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#9E9E9E] mt-1">
                  {((totalMale / totalChildren) * 100).toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-[#2B2B2B]">Female</span>
                  <span className="text-[13px] text-[#2B2B2B]">{totalFemale.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-[#F2F1EE] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FFBC3A]" 
                    style={{ width: `${(totalFemale / totalChildren) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#9E9E9E] mt-1">
                  {((totalFemale / totalChildren) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          {/* Age Group Breakdown */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-5">
            <div className="text-[13px] text-[#FF8500] font-bold mb-4">CHILDREN BY AGE GROUP</div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-[#2B2B2B]">Under 10</span>
                  <span className="text-[13px] text-[#2B2B2B]">{totalUnder10.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-[#F2F1EE] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FF8500]" 
                    style={{ width: `${(totalUnder10 / totalChildren) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#9E9E9E] mt-1">
                  {((totalUnder10 / totalChildren) * 100).toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-[#2B2B2B]">10-12 years</span>
                  <span className="text-[13px] text-[#2B2B2B]">{totalAge10to12.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-[#F2F1EE] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FFBC3A]" 
                    style={{ width: `${(totalAge10to12 / totalChildren) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#9E9E9E] mt-1">
                  {((totalAge10to12 / totalChildren) * 100).toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-[#2B2B2B]">13+ years</span>
                  <span className="text-[13px] text-[#2B2B2B]">{totalAge13plus.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-[#F2F1EE] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FF8500]" 
                    style={{ width: `${(totalAge13plus / totalChildren) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#9E9E9E] mt-1">
                  {((totalAge13plus / totalChildren) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          {/* School Type Breakdown */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-5">
            <div className="text-[13px] text-[#FF8500] font-bold mb-4">TOURS BY SCHOOL TYPE</div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-[#2B2B2B]">Primary Schools</span>
                  <span className="text-[13px] text-[#2B2B2B]">{primarySchools}</span>
                </div>
                <div className="h-2 bg-[#F2F1EE] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FF8500]" 
                    style={{ width: `${(primarySchools / totalTours) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#9E9E9E] mt-1">
                  {((primarySchools / totalTours) * 100).toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-[#2B2B2B]">Secondary Schools</span>
                  <span className="text-[13px] text-[#2B2B2B]">{secondarySchools}</span>
                </div>
                <div className="h-2 bg-[#F2F1EE] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FFBC3A]" 
                    style={{ width: `${(secondarySchools / totalTours) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#9E9E9E] mt-1">
                  {((secondarySchools / totalTours) * 100).toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-[#2B2B2B]">Mixed Schools</span>
                  <span className="text-[13px] text-[#2B2B2B]">{mixedSchools}</span>
                </div>
                <div className="h-2 bg-[#F2F1EE] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FF8500]" 
                    style={{ width: `${(mixedSchools / totalTours) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#9E9E9E] mt-1">
                  {((mixedSchools / totalTours) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9E9E9E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tours or schools..."
              className="w-full pl-10 pr-4 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
            />
          </div>

          <select
            value={filterDateRange}
            onChange={(e) => setFilterDateRange(e.target.value)}
            className="px-3 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
          >
            <option value="all">All Dates</option>
            <option value="february">February 2025</option>
            <option value="march">March 2025</option>
          </select>

          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="px-3 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
          >
            <option value="all">All Locations</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            <option value="Kano">Kano</option>
          </select>

          <select
            value={filterSchool}
            onChange={(e) => setFilterSchool(e.target.value)}
            className="px-3 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
          >
            <option value="all">All Schools</option>
            {Array.from(new Set(tours.map(t => t.school))).map(school => (
              <option key={school} value={school}>{school}</option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div className="mb-3 text-[13px] text-[#9E9E9E]">
          Showing {filteredTours.length} tours
        </div>

        {/* Tours Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Tour Name</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Location</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Date</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">School</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Children</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Status</th>
                <th className="px-4 py-3 text-right text-[11px] text-[#FF8500] font-bold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTours.map((tour, index) => (
                <tr key={tour.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FFFDF8]'}>
                  <td className="px-4 py-4">
                    <div className="text-[13px] text-[#2B2B2B]">{tour.tourName}</div>
                    <div className="text-[11px] text-[#9E9E9E]">{tour.id}</div>
                  </td>
                  <td className="px-4 py-4 text-[13px] text-[#2B2B2B]">{tour.location}</td>
                  <td className="px-4 py-4 text-[13px] text-[#2B2B2B]">{tour.date}</td>
                  <td className="px-4 py-4 text-[13px] text-[#2B2B2B]">{tour.school}</td>
                  <td className="px-4 py-4 text-[13px] text-[#2B2B2B]">
                    {tour.numberOfChildren.toLocaleString()}
                  </td>
                  <td className="px-4 py-4">{getStatusBadge(tour.status)}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        className="p-1.5 text-[#FF8500] hover:bg-[#FFF4E6] rounded transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTours.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
            <p className="text-[14px] text-[#9E9E9E]">No tours found</p>
          </div>
        )}
      </div>
    </div>
  );
}
