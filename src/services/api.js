import { compressToBase64 } from './imageUtils'

const API_URL = import.meta.env.VITE_API_URL
const USE_MOCK = !API_URL

// Mock data uses the SAME format as Manasvi's real API
const MOCK_RESPONSES = [
  {
    grade: 'Grade B (Rotting/Fermenting Organic Waste)',
    recommendation: 'Optimal for Compressed Biogas (CBG) Anaerobic Digesters',
    ph_warning: 'High acidity detected. Add lime buffer during slurry preparation.',
    matched_facility: 'Sikar Clean Energy CBG Plant',
    distance_km: 11.4,
    estimated_pickup: '10:15 PM Tonight',
    eway_bill_url: '',
  },
  {
    grade: 'Grade C (Plastic Contaminated)',
    recommendation: 'REJECTED: Remove inorganic trash before dispatching.',
    matched_facility: 'None',
    distance_km: 0,
    estimated_pickup: 'N/A',
    eway_bill_url: '',
  },
]

// Converts the backend response into the shape our cards use
function normalize(data) {
  const gradeText = data.grade || ''
  const match = gradeText.match(/Grade\s*([ABC])/i)
  return {
    grade: match ? match[1].toUpperCase() : '',
    gradeLabel: gradeText,
    message: data.recommendation,
    ph_warning: data.ph_warning,
    facility_name: data.matched_facility,
    distance_km: data.distance_km,
    pickup_time: data.estimated_pickup,
    pdf_url: data.eway_bill_url,
  }
}

export async function submitWaste({ photo, weight_tons, lat, lon }) {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const pick = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)]
    return normalize(pick)
  }

  const image_base64 = await compressToBase64(photo)

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image_base64, weight_tons, lat, lon }),
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  let data = await response.json()
  console.log('API response:', data)

  // Some Lambda setups wrap the result as { statusCode, body: "..." }
  if (typeof data.body === 'string') {
    data = JSON.parse(data.body)
  }

  return normalize(data)
}