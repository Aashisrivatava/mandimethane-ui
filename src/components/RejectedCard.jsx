export default function RejectedCard({ result, onReset }) {
  return (
    <div className="rounded-xl border border-red-300 bg-red-50 p-5">
      <h2 className="text-xl font-bold text-red-700">❌ Waste Rejected</h2>
      <p className="mt-3 text-gray-800">
        {result.message || 'Inorganic contamination (plastic) detected. This load cannot be accepted.'}
      </p>
      <p className="mt-2 text-sm text-gray-600">
        Please remove plastic and other non-organic material, then take a new photo.
      </p>
      <button
        onClick={onReset}
        className="mt-4 w-full rounded-xl bg-red-600 py-3 font-semibold text-white"
      >
        Try again
      </button>
    </div>
  )
}