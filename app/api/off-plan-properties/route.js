import { offPlanListings } from '@/data/off-plan-data'

/**
 * Off-plan properties from static data (`data/off-plan-data.js`).
 */
export async function GET() {
  try {
    // Return mock data
    return Response.json({ 
      success: true, 
      data: offPlanListings,
      source: 'fallback'
    })
  } catch (error) {
    console.error('Error fetching off-plan properties:', error)
    
    // Fallback to old data on error
    return Response.json({ 
      success: true, 
      data: offPlanListings,
      source: 'fallback',
      error: error.message
    })
  }
}

