export const LOCATIONS = [
  { label: 'Jaipur Fruit Market', lat: 26.9124, lon: 75.7873 },
  { label: 'Laxmangarh Mandi', lat: 27.8181, lon: 75.0286 },
  { label: 'Custom Lat/Long', custom: true },
]

export default function LocationSelect({
  selected,
  onSelect,
  customLat,
  customLon,
  onCustomLat,
  onCustomLon,
}) {
  const isCustom = selected === 'Custom Lat/Long'
  const inputClass =
    'w-full rounded-xl border border-gray-300 p-3 focus:border-green-600 focus:outline-none'

  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        3. Mandi location
      </label>
      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className={`${inputClass} bg-white text-lg`}
      >
        <option value="">Select a location</option>
        {LOCATIONS.map((loc) => (
          <option key={loc.label} value={loc.label}>
            {loc.label}
          </option>
        ))}
      </select>

      {isCustom && (
        <div className="mt-3 grid grid-cols-2 gap-3">
          <input
            type="number"
            step="any"
            placeholder="Latitude"
            value={customLat}
            onChange={(e) => onCustomLat(e.target.value)}
            className={inputClass}
          />
          <input
            type="number"
            step="any"
            placeholder="Longitude"
            value={customLon}
            onChange={(e) => onCustomLon(e.target.value)}
            className={inputClass}
          />
        </div>
      )}
    </div>
  )
}