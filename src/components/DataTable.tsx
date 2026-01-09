import { Search, Filter, Download, MoreVertical, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, X } from 'lucide-react';
import { useState } from 'react';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  filterType?: 'text' | 'select' | 'number' | 'date';
  filterOptions?: { label: string; value: any }[];
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  actions?: (row: any) => React.ReactNode;
  onRowSelect?: (selectedRows: any[]) => void;
  bulkActions?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function DataTable({ columns, data, actions, onRowSelect, bulkActions, title, subtitle }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [columnFilters, setColumnFilters] = useState<Record<string, any>>({});
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter data based on search
  const filteredData = data.filter(row => {
    // Global search filter
    const matchesSearch = Object.values(row).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Column-specific filters
    const matchesColumnFilters = Object.entries(columnFilters).every(([key, filterValue]) => {
      if (!filterValue) return true;
      const rowValue = String(row[key]).toLowerCase();
      const filter = String(filterValue).toLowerCase();
      return rowValue.includes(filter);
    });
    
    return matchesSearch && matchesColumnFilters;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    } else {
      const newSelected = new Set(paginatedData.map((_, idx) => startIndex + idx));
      setSelectedRows(newSelected);
      onRowSelect?.(paginatedData);
    }
  };

  const handleSelectRow = (index: number, row: any) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
    onRowSelect?.(data.filter((_, idx) => newSelected.has(idx)));
  };

  const getSortIcon = (columnKey: string) => {
    if (sortColumn !== columnKey) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-[#C7C7C7]" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="w-3.5 h-3.5 text-[#F5A623]" />
      : <ArrowDown className="w-3.5 h-3.5 text-[#F5A623]" />;
  };

  const handleColumnFilter = (columnKey: string, value: any) => {
    setColumnFilters(prev => ({
      ...prev,
      [columnKey]: value
    }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setColumnFilters({});
    setSearchTerm('');
    setCurrentPage(1);
  };

  const activeFilterCount = Object.values(columnFilters).filter(v => v).length + (searchTerm ? 1 : 0);

  return (
    <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
      {/* Header */}
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-[#E5E7EB]">
          {title && <h2 className="text-lg text-[#2B2B2B]">{title}</h2>}
          {subtitle && <p className="text-sm text-[#9E9E9E] mt-1">{subtitle}</p>}
        </div>
      )}

      {/* Toolbar */}
      <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E]" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#2B2B2B] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            />
          </div>

          {/* Bulk Actions */}
          {selectedRows.size > 0 && bulkActions && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#9E9E9E]">{selectedRows.size} selected</span>
              {bulkActions}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className={`relative p-2 border rounded-lg hover:bg-[#F2F1EE] transition-colors ${
              activeFilterCount > 0 ? 'border-[#F5A623] bg-[#F5A623]/10' : 'border-[#E5E7EB]'
            }`} 
            title="Filter"
          >
            <Filter className={`w-4 h-4 ${activeFilterCount > 0 ? 'text-[#F5A623]' : 'text-[#9E9E9E]'}`} />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F5A623] text-white text-xs rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-[#E5E7EB] rounded-lg hover:bg-[#F2F1EE] transition-colors text-sm text-[#2B2B2B]">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilterPanel && (
        <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-[#2B2B2B]">Column Filters</div>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-[#F5A623] hover:text-[#E09615] transition-colors flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                Clear all filters
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {columns.map((column) => (
              <div key={column.key}>
                <label className="block text-xs text-[#9E9E9E] mb-1.5">{column.label}</label>
                {column.filterType === 'select' && column.filterOptions ? (
                  <select
                    value={columnFilters[column.key] || ''}
                    onChange={(e) => handleColumnFilter(column.key, e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                  >
                    <option value="">All</option>
                    {column.filterOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder={`Filter ${column.label.toLowerCase()}...`}
                    value={columnFilters[column.key] || ''}
                    onChange={(e) => handleColumnFilter(column.key, e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F2F1EE]">
            <tr>
              {onRowSelect && (
                <th className="px-4 py-3 text-left w-12">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-[#E5E7EB] text-[#F5A623] focus:ring-[#F5A623]"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th 
                  key={column.key} 
                  className="px-4 py-3 text-left text-xs text-[#9E9E9E] uppercase tracking-wider"
                  style={{ width: column.width }}
                >
                  {column.sortable !== false ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="flex items-center gap-2 hover:text-[#2B2B2B] transition-colors"
                    >
                      {column.label}
                      {getSortIcon(column.key)}
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 text-left text-xs text-[#9E9E9E] uppercase tracking-wider w-40">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => {
              const actualIndex = startIndex + idx;
              return (
                <tr 
                  key={actualIndex} 
                  className="border-b border-[#E5E7EB] hover:bg-[#FFFDF8] transition-colors"
                >
                  {onRowSelect && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(actualIndex)}
                        onChange={() => handleSelectRow(actualIndex, row)}
                        className="w-4 h-4 rounded border-[#E5E7EB] text-[#F5A623] focus:ring-[#F5A623]"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 text-sm text-[#2B2B2B]">
                      {row[column.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-[#E5E7EB] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm text-[#9E9E9E]">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} results
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#9E9E9E]">Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 border border-[#E5E7EB] rounded-lg hover:bg-[#F2F1EE] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 text-[#9E9E9E]" />
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      currentPage === page
                        ? 'bg-[#F5A623] text-white'
                        : 'border border-[#E5E7EB] text-[#2B2B2B] hover:bg-[#F2F1EE]'
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="px-2 text-[#9E9E9E]">...</span>;
              }
              return null;
            })}
          </div>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 border border-[#E5E7EB] rounded-lg hover:bg-[#F2F1EE] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4 text-[#9E9E9E]" />
          </button>
        </div>
      </div>
    </div>
  );
}