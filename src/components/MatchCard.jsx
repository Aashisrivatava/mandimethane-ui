export default function MatchCard({ result, onReset }) {
  return (
    <div className="rounded-xl border border-green-300 bg-green-50 p-5">
      <h2 className="text-xl font-bold text-green-700">✅ Match Confirmed!</h2>
      <dl className="mt-4 space-y-3 text-gray-800">
        <div>
          <dt className="text-xs uppercase text-gray-500">AI Grade</dt>
          <dd className="font-semibold">{result.gradeLabel}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-gray-500">Recommendation</dt>
          <dd>{result.message}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-gray-500">Matched facility</dt>
          <dd className="font-semibold">{result.facility_name}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-gray-500">Distance</dt>
          <dd>{result.distance_km} km away</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-gray-500">Pickup scheduled</dt>
          <dd>{result.pickup_time}</dd>
        </div>
      </dl>

      {result.ph_warning && (
        <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
          ⚠️ {result.ph_warning}
        </div>
      )}

      {result.pdf_url && (
        <a
          href={result.pdf_url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 block rounded-xl bg-green-600 py-3 text-center font-semibold text-white"
        >
          Download E-Way Bill PDF
        </a>
      )}

      <button
        onClick={onReset}
        className="mt-3 w-full rounded-xl border border-gray-300 py-3 font-semibold text-gray-700"
      >
        Start new dispatch
      </button>
    </div>
  )
}