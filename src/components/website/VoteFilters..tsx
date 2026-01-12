export default function VoteFilters() {
  return (
    <section className="py-6">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <select className="p-3 rounded-md border">
          <option>All Categories</option>
          <option>Primary</option>
          <option>Secondary</option>
        </select>

        <select className="p-3 rounded-md border">
          <option>All Zones</option>
          <option>North</option>
          <option>South</option>
        </select>

        <select className="p-3 rounded-md border">
          <option>Most Popular</option>
          <option>Newest</option>
        </select>
      </div>
    </section>
  )
}
