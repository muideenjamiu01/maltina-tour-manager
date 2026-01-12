import { Search, Filter, X } from 'lucide-react';

interface FilterProps {
  filters: {
    state: string;
    lga: string;
    ward: string;
    status: string;
    search: string;
  };
  onFilterChange: (filters: any) => void;
}

export function FiltersCard({ filters, onFilterChange }: FilterProps) {
  const hasActiveFilters = filters.state !== 'all' || filters.lga !== 'all' || filters.ward !== 'all' || filters.status !== 'all' || filters.search !== '';

  const handleClearFilters = () => {
    onFilterChange({
      state: 'all',
      lga: 'all',
      ward: 'all',
      status: 'all',
      search: '',
    });
  };

  const handleFilterChange = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#4B5563]" />
          <label className="text-sm text-[#1F2937]">Filters</label>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 bg-[#FF8500] text-white text-xs rounded-full">
              Active
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="flex items-center gap-1 text-sm text-[#4B5563] hover:text-[#FF8500] transition-colors"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <label htmlFor="state" className="block text-sm text-[#4B5563] mb-2">
            State
          </label>
          <select
            id="state"
            value={filters.state}
            onChange={(e) => handleFilterChange('state', e.target.value)}
            className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#1F2937] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFBC3A] focus:border-transparent"
          >
            <option value="all">All States</option>
            <option value="lagos">Lagos</option>
            <option value="abuja">Abuja</option>
            <option value="kano">Kano</option>
          </select>
        </div>

        <div className="col-span-2">
          <label htmlFor="lga" className="block text-sm text-[#4B5563] mb-2">
            LGA
          </label>
          <select
            id="lga"
            value={filters.lga}
            onChange={(e) => handleFilterChange('lga', e.target.value)}
            className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#1F2937] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFBC3A] focus:border-transparent"
          >
            <option value="all">All LGAs</option>
            <option value="ikeja">Ikeja</option>
            <option value="surulere">Surulere</option>
            <option value="yaba">Yaba</option>
          </select>
        </div>

        <div className="col-span-2">
          <label htmlFor="status" className="block text-sm text-[#4B5563] mb-2">
            Status
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#1F2937] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFBC3A] focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="full">Full</option>
            <option value="assigned">Assigned</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="col-span-6">
          <label htmlFor="search" className="block text-sm text-[#4B5563] mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B5563]" />
            <input
              id="search"
              type="text"
              placeholder="Search by cluster name or ID..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border-2 border-[#FF8500] rounded-lg text-[#1F2937] text-sm placeholder:text-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#FFBC3A] focus:border-[#FF8500]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}