export default function VoteFilters({ filters, setFilters }) {
  return (
 <section className="py-6">
      <div className="max-w-6xl mx-auto px-6 space-y-6">

        <div>
          <span className="block text-sm font-medium">Filter by</span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              className="p-3 rounded-md border bg-gray-100 w-full"
              value={filters.category}
              onChange={e =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="All">All Categories</option>
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
            </select>

            <select
              className="p-3 rounded-md border bg-gray-100 w-full"
              value={filters.zone}
              onChange={e =>
                setFilters({ ...filters, zone: e.target.value })
              }
            >
              <option value="All">All Zones</option>
              <option value="North">North</option>
              <option value="South">South</option>
            </select>
          </div>
        </div>

        <div>
          <span className="block text-sm font-medium">Sort by</span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:max-w-[50%]">
            <select
              className="p-3 rounded-md border bg-gray-100 w-full"
              value={filters.sort}
              onChange={e =>
                setFilters({ ...filters, sort: e.target.value })
              }
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
            </select>

            <select
              className="p-3 rounded-md border bg-gray-100 w-full"
              value={filters.time}
              onChange={e =>
                setFilters({ ...filters, time: e.target.value })
              }
            >
              <option value="all">All Time</option>
              <option value="week">This Week</option>
              <option value="today">Today</option>
            </select>
          </div>
        </div>

      </div>
    </section>
  )
}
