"use client";

import { Filters } from "@/types/vote.types";

type VoteFiltersProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

export default function VoteFilters({ filters, setFilters }: VoteFiltersProps) {
  return (
    <section className="py-6">
      <div className="max-w-6xl mx-auto px-6 space-y-6">

        {/* Filter by */}
        <div>
          <span className="block text-sm font-medium mb-2">Filter by</span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* SEARCH FIELD */}
            <input
              type="text"
              placeholder="Search by name, school, location, zone, category..."
              className="p-3 rounded-md border bg-gray-100 w-full"
              value={filters.query}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, query: e.target.value }))
              }
            />

            {/* ZONE SELECT */}
            <select
              className="p-3 rounded-md border bg-gray-100 w-full"
              value={filters.zone}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, zone: e.target.value }))
              }
            >
              <option value="All">All Zones</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="West">West</option>
              <option value="East">East</option>
            </select>
          </div>
        </div>

      </div>
    </section>
  );
}
