export default function WeightInput({ value, onChange }) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        2. Estimated weight (tons)
      </label>
      <input
        type="number"
        inputMode="decimal"
        step="0.1"
        min="0"
        placeholder="e.g. 2.5"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-300 p-3 text-lg focus:border-green-600 focus:outline-none"
      />
    </div>
  )
}