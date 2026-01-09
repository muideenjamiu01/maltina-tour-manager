"use client"

import StatCircle from "../components/ui/StatCircle"
import ProgressBar from "../components/ui/ProgressBar"

export default function ChildrenReached() {
  const stats = [
    { number: 24, label: "Schools\nReached" },
    { number: 4280, label: "Teachers\nEngaged" },
    { number: 18, label: "States\nEngaged" },
  ]

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#FBDA8F" }}>
      <div className="max-w-5xl mx-auto">
        {/* Title and Counter */}
        <div className="text-center mb-16">
          <h3
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{
              fontFamily: '"Lilita One", sans-serif',
              color: "#292526",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
            }}
          >
            Children Reached
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <p
              className="text-6xl sm:text-7xl lg:text-8xl font-bold"
              style={{
                fontFamily: '"Lilita One", sans-serif',
                color: "#292526",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              184,000
            </p>
            <p
              className="text-4xl sm:text-5xl font-bold"
              style={{
                fontFamily: '"Lilita One", sans-serif',
                color: "#292526",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              /1,000,000
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-16">
            <ProgressBar current={184000} total={1000000} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCircle key={index} number={stat.number} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
