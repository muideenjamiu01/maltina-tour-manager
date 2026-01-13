export default function VoteFilters() {
  return (
   <section className="py-6">
      <div className="max-w-6xl mx-auto px-6 space-y-6">

        {/* FILTER BY SECTION */}
        <div className="space-y-2">
          <span className="block text-sm font-medium text-black">
            Filter by
          </span>
        {/* TOP ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select className="p-3 rounded-md border bg-gray-100 border w-full">
            <option>All Categories</option>
            <option>Primary</option>
            <option>Secondary</option>
          </select>

          <select className="p-3 rounded-md border bg-gray-100 border-gray-300 border w-full">
            <option>All Zones</option>
            <option>North</option>
            <option>South</option>
          </select>
        </div>
  </div>
        
        {/* FILTER BY LABEL */}
         <div className="space-y-2">
          <span className="block text-sm font-medium text-black">
            Sort by
          </span>

        {/* BOTTOM ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[50%]">
  <select className="p-3 rounded-md border bg-gray-100 w-50%">
    <option>Most Popular</option>
    <option>Newest</option>
  </select>

  <select className="p-3 rounded-md border bg-gray-100 w-50%">
    <option>All Time</option>
    <option>This Week</option>
    <option>Today</option>
  </select>
</div>

     </div>
      </div>
    </section>
  )
}
