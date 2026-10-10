import { useState } from 'react'
import Header from './components/Header'
import PhotoCapture from './components/PhotoCapture'
import WeightInput from './components/WeightInput'
import LocationSelect, { LOCATIONS } from './components/LocationSelect'
import Spinner from './components/Spinner'
import MatchCard from './components/MatchCard'
import RejectedCard from './components/RejectedCard'
import { submitWaste } from './services/api'

export default function App() {
  const [photo, setPhoto] = useState(null)
  const [preview, setPreview] = useState('')
  const [weight, setWeight] = useState('')
  const [location, setLocation] = useState('')
  const [customLat, setCustomLat] = useState('')
  const [customLon, setCustomLon] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [result, setResult] = useState(null)

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPhoto(file)
    setPreview(URL.createObjectURL(file))
  }

  const isCustom = location === 'Custom Lat/Long'
  const locationReady = isCustom ? customLat && customLon : location
  const canSubmit = photo && weight && locationReady

  const handleSubmit = async () => {
    const chosen = LOCATIONS.find((l) => l.label === location)
    const lat = isCustom ? Number(customLat) : chosen.lat
    const lon = isCustom ? Number(customLon) : chosen.lon
    setStatus('loading')
    try {
      const data = await submitWaste({ photo, weight_tons: Number(weight), lat, lon })
      setResult(data)
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const reset = () => {
    setPhoto(null); setPreview(''); setWeight(''); setLocation('')
    setCustomLat(''); setCustomLon(''); setResult(null); setStatus('idle')
  }

  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <div className="min-h-screen w-full max-w-md bg-white p-4 shadow-lg">
        <Header />
        {status === 'loading' && <Spinner />}
        {status === 'success' && result.grade === 'C' && (
  <RejectedCard result={result} onReset={reset} />
)}
{status === 'success' && result.grade !== 'C' && (
  <MatchCard result={result} onReset={reset} />
)}
        {status === 'error' && (
          <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
            Something went wrong. Please try again.
            <button onClick={() => setStatus('idle')} className="mt-3 block w-full rounded-xl bg-red-600 py-2 font-semibold text-white">
              Back to form
            </button>
          </div>
        )}
        {status === 'idle' && (
          <>
            <PhotoCapture preview={preview} onChange={handlePhoto} />
            <WeightInput value={weight} onChange={setWeight} />
            <LocationSelect
              selected={location}
              onSelect={setLocation}
              customLat={customLat}
              customLon={customLon}
              onCustomLat={setCustomLat}
              onCustomLon={setCustomLon}
            />
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full rounded-xl bg-green-600 py-4 text-lg font-semibold text-white disabled:bg-gray-300"
            >
              Find Matching Plant
            </button>
          </>
        )}
      </div>
    </div>
  )
}