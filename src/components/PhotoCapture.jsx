export default function PhotoCapture({ preview, onChange }) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        1. Photo of waste pile
      </label>
      <label className="flex h-48 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-green-500 bg-green-50">
        {preview ? (
          <img src={preview} alt="Waste preview" className="h-full w-full object-cover" />
        ) : (
          <span className="text-center text-green-700">
            📷 Tap to take a photo
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={onChange}
        />
      </label>
    </div>
  )
}