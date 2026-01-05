import { Eye, MoreVertical, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Edit2, Trash2, Calendar, Users } from 'lucide-react';
import { useState } from 'react';

interface ClusterData {
  id: string;
  name: string;
  state: string;
  lga: string;
  ward: string;
  schools: number;
  status: 'Full' | 'Assigned' | 'Draft';
  lastUpdated: string;
}

const mockData: ClusterData[] = [
  {
    id: 'CL-001',
    name: 'Ikeja Central Cluster',
    state: 'Lagos',
    lga: 'Ikeja',
    ward: 'Ward 3',
    schools: 12,
    status: 'Full',
    lastUpdated: '2025-12-13',
  },
  {
    id: 'CL-002',
    name: 'Surulere East Zone',
    state: 'Lagos',
    lga: 'Surulere',
    ward: 'Ward 5',
    schools: 8,
    status: 'Assigned',
    lastUpdated: '2025-12-12',
  },
  {
    id: 'CL-003',
    name: 'Yaba Education Hub',
    state: 'Lagos',
    lga: 'Yaba',
    ward: 'Ward 2',
    schools: 15,
    status: 'Full',
    lastUpdated: '2025-12-11',
  },
  {
    id: 'CL-004',
    name: 'Victoria Island Cluster',
    state: 'Lagos',
    lga: 'Eti-Osa',
    ward: 'Ward 1',
    schools: 6,
    status: 'Draft',
    lastUpdated: '2025-12-10',
  },
  {
    id: 'CL-005',
    name: 'Lekki Peninsula Schools',
    state: 'Lagos',
    lga: 'Eti-Osa',
    ward: 'Ward 4',
    schools: 10,
    status: 'Assigned',
    lastUpdated: '2025-12-09',
  },
  {
    id: 'CL-006',
    name: 'Mainland Central',
    state: 'Lagos',
    lga: 'Lagos Mainland',
    ward: 'Ward 7',
    schools: 14,
    status: 'Full',
    lastUpdated: '2025-12-08',
  },
  {
    id: 'CL-007',
    name: 'Ikorodu Learning Zone',
    state: 'Lagos',
    lga: 'Ikorodu',
    ward: 'Ward 6',
    schools: 9,
    status: 'Assigned',
    lastUpdated: '2025-12-07',
  },
  {
    id: 'CL-008',
    name: 'Badagry Coastal Cluster',
    state: 'Lagos',
    lga: 'Badagry',
    ward: 'Ward 2',
    schools: 5,
    status: 'Draft',
    lastUpdated: '2025-12-06',
  },
];

type SortField = keyof ClusterData;
type SortDirection = 'asc' | 'desc' | null;

function StatusPill({ status }: { status: ClusterData['status'] }) {
  const styles = {
    Full: 'bg-[#FFBC3A] text-[#1F2937]',
    Assigned: 'bg-[#FF8500] text-white',
    Draft: 'bg-[#6B7280] text-white',
  };

  return (
    <span className={`inline-flex items-center justify-center h-7 min-w-[96px] px-3.5 py-1 rounded-full text-xs font-semibold text-center ${styles[status]}`}>
      {status}
    </span>
  );
}

interface SortHeaderProps {
  label: string;
  field: SortField;
  currentSort: SortField | null;
  direction: SortDirection;
  onSort: (field: SortField) => void;
}

function SortHeader({ label, field, currentSort, direction, onSort }: SortHeaderProps) {
  const isActive = currentSort === field;
  
  return (
    <button
      onClick={() => onSort(field)}
      className="flex items-center gap-1.5 hover:text-[#1F2937] transition-colors group"
    >
      <span className={isActive ? 'font-semibold' : ''}>{label}</span>
      <div className="flex flex-col">
        <ChevronUp 
          className={`w-3 h-3 -mb-1 transition-colors ${
            isActive && direction === 'asc' 
              ? 'text-[#FF8500]' 
              : 'text-[#E5E7EB] group-hover:text-[#4B5563]'
          }`} 
        />
        <ChevronDown 
          className={`w-3 h-3 transition-colors ${
            isActive && direction === 'desc' 
              ? 'text-[#FF8500]' 
              : 'text-[#E5E7EB] group-hover:text-[#4B5563]'
          }`} 
        />
      </div>
    </button>
  );
}

export function DataTableCard({ filters }: { filters: { state: string; lga: string; ward: string; status: string; search: string } }) {
  const [sortField, setSortField] = useState<SortField | null>('lastUpdated');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Cycle through: asc → desc → reset to default
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        // Reset to default sort
        setSortField('lastUpdated');
        setSortDirection('desc');
      }
    } else {
      // First click on a new column: ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Apply filters to mock data
  const filteredData = mockData.filter(item => {
    // State filter
    if (filters.state !== 'all' && item.state.toLowerCase() !== filters.state) {
      return false;
    }
    
    // LGA filter
    if (filters.lga !== 'all' && item.lga.toLowerCase() !== filters.lga) {
      return false;
    }
    
    // Status filter
    if (filters.status !== 'all' && item.status.toLowerCase() !== filters.status) {
      return false;
    }
    
    // Search filter (search across name and id)
    if (filters.search) {
      const query = filters.search.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Custom status order: Draft → Assigned → Full
  const statusOrder = { Draft: 0, Assigned: 1, Full: 2 };

  const sortedData = [...filteredData].sort((a, b) => {
    // If no active sort or direction is null, use default
    if (!sortField || !sortDirection) {
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    }

    const aVal = a[sortField];
    const bVal = b[sortField];
    
    // Custom status sorting
    if (sortField === 'status') {
      const aOrder = statusOrder[aVal as ClusterData['status']];
      const bOrder = statusOrder[bVal as ClusterData['status']];
      return sortDirection === 'asc' ? aOrder - bOrder : bOrder - aOrder;
    }
    
    // String sorting
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    
    // Number sorting
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    return 0;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pageNumbers: (number | '...')[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push('...');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push('...');
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, sortedData.length);
  const totalItems = sortedData.length;

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <tr>
              <th className="px-3 py-4 text-left text-xs text-[#4B5563] uppercase tracking-wider">
                <SortHeader 
                  label="Cluster ID" 
                  field="id"
                  currentSort={sortField}
                  direction={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-3 py-4 text-left text-xs text-[#4B5563] uppercase tracking-wider">
                <SortHeader 
                  label="Cluster Name" 
                  field="name"
                  currentSort={sortField}
                  direction={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-3 py-4 text-left text-xs text-[#4B5563] uppercase tracking-wider">
                <SortHeader 
                  label="State" 
                  field="state"
                  currentSort={sortField}
                  direction={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-3 py-4 text-left text-xs text-[#4B5563] uppercase tracking-wider">
                <SortHeader 
                  label="LGA" 
                  field="lga"
                  currentSort={sortField}
                  direction={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-3 py-4 text-left text-xs text-[#4B5563] uppercase tracking-wider">
                <SortHeader 
                  label="Ward" 
                  field="ward"
                  currentSort={sortField}
                  direction={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-3 py-4 text-left text-xs text-[#4B5563] uppercase tracking-wider">
                <SortHeader 
                  label="Schools" 
                  field="schools"
                  currentSort={sortField}
                  direction={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-3 py-4 text-left text-xs text-[#4B5563] uppercase tracking-wider">
                <SortHeader 
                  label="Status" 
                  field="status"
                  currentSort={sortField}
                  direction={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-3 py-4 text-left text-xs text-[#4B5563] uppercase tracking-wider">
                <SortHeader 
                  label="Last Updated" 
                  field="lastUpdated"
                  currentSort={sortField}
                  direction={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-3 py-4 text-center text-xs text-[#4B5563] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {paginatedData.map((cluster) => (
              <tr key={cluster.id} className="hover:bg-[#F9FAFB] transition-colors">
                <td className="px-3 py-4 text-sm text-[#1F2937]">{cluster.id}</td>
                <td className="px-3 py-4 text-sm text-[#1F2937]">{cluster.name}</td>
                <td className="px-3 py-4 text-sm text-[#4B5563]">{cluster.state}</td>
                <td className="px-3 py-4 text-sm text-[#4B5563]">{cluster.lga}</td>
                <td className="px-3 py-4 text-sm text-[#4B5563]">{cluster.ward}</td>
                <td className="px-3 py-4 text-sm text-[#4B5563]">{cluster.schools}</td>
                <td className="px-3 py-4">
                  <StatusPill status={cluster.status} />
                </td>
                <td className="px-3 py-4 text-sm text-[#4B5563]">{cluster.lastUpdated}</td>
                <td className="px-3 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="p-1.5 text-[#4B5563] hover:text-[#FF8500] hover:bg-[#FFF9E6] rounded-lg transition-colors"
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1.5 text-[#4B5563] hover:text-[#1F2937] hover:bg-[#F9FAFB] rounded-lg transition-colors"
                      title="More options"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-[#E5E7EB]">
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#4B5563]">
            Showing {startIndex + 1}–{endIndex} of {totalItems} clusters
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#4B5563]">Show:</span>
            {[10, 25, 50].map((size) => (
              <button
                key={size}
                onClick={() => handlePageSizeChange(size)}
                className={`px-2 py-1 text-sm rounded transition-colors ${
                  pageSize === size
                    ? 'bg-[#FFF9E6] text-[#FF8500]'
                    : 'text-[#4B5563] hover:bg-[#F9FAFB]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#4B5563] border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="px-2 text-[#4B5563]">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page as number)}
                  className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-[#FF8500] text-white'
                      : 'text-[#4B5563] hover:bg-[#F9FAFB]'
                  }`}
                >
                  {page}
                </button>
              )
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#4B5563] border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}