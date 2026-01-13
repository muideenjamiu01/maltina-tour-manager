export default function StatCircle({
  number,
  label,
}: {
  number: number
  label: string
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="w-40 h-40 sm:w-48 sm:h-48 rounded-full flex items-center justify-center text-center"
        style={{
          background: "linear-gradient(135deg, #FF8A5B,rgb(240, 226, 206))",
          boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
        }}
      >
        <div>
          <p
            className="text-4xl sm:text-5xl font-bold text-white"
            style={{
              fontFamily: '"Lilita One", sans-serif',
            }}
          >
            {number}
          </p>
          <p
            className="text-xs sm:text-sm font-semibold text-white whitespace-pre-line mt-2"
            style={{
              fontFamily: '"Lilita One", sans-serif',
            }}
          >
            {label}
          </p>
        </div>
      </div>
    </div>
  )
}
