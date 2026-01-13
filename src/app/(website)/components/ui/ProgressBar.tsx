export default function ProgressBar({
  current,
  total,
}: {
  current: number
  total: number
}) {
  const percentage = (current / total) * 100

  const milestones = [
    { label: "Start", value: 0 },
    { label: "100k", value: 100000 },
    { label: "250k", value: 250000 },
    { label: "500k", value: 500000 },
    { label: "750k", value: 750000 },
    { label: "1M", value: 1000000 },
  ]

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative h-2 bg-orange-300 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-gradient-to-r from-orange-600 to-orange-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Milestones */}
      <div className="flex justify-between px-2">
        {milestones.map((milestone) => (
          <div key={milestone.value} className="flex flex-col items-center">
            <div
              className="w-3 h-3 rounded-full mb-2"
              style={{
                backgroundColor: milestone.value <= current ? "#FF8A5B" : "#E0E0E0",
              }}
            ></div>
            <p className="text-xs sm:text-sm font-semibold text-gray-700">{milestone.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
