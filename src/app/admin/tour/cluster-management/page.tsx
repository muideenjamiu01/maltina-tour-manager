'use client'
import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { SummaryMetrics } from '@/components/SummaryMetrics';
import { FiltersCard } from '@/components/FiltersCard';
import { DataTableCard } from '@/components/DataTableCard';

export default function ClusterList() {
  const [filters, setFilters] = useState({
    state: 'all',
    lga: 'all',
    ward: 'all',
    status: 'all',
    search: '',
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-8">
      <PageHeader />
      <SummaryMetrics />
      <FiltersCard filters={filters} onFilterChange={handleFilterChange} />
      <DataTableCard filters={filters} />
    </div>
  );
}
