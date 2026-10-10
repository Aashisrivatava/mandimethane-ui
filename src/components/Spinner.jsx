export default function Spinner() {
  return (
    <div className="flex flex-col items-center py-10">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />
      <p className="mt-4 text-sm text-gray-600">Analysing waste and finding a plant...</p>
    </div>
  )
}