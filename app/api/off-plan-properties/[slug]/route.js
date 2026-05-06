import { offPlanListings } from '@/data/off-plan-data'

/**
 * Single off-plan property by slug from static data.
 */
export async function GET(request, { params }) {
  try {
    const { slug } = params
    
    // Lookup in static listings
    const oldProperty = offPlanListings.find(
      old => old.slug === slug
    )
    
    if (oldProperty) {
      return Response.json({ 
        success: true, 
        data: oldProperty,
        source: 'fallback'
      })
    }
    
    return Response.json({ 
      success: false, 
      error: 'Property not found'
    }, { status: 404 })
  } catch (error) {
    console.error('Error fetching off-plan property:', error)
    
    // Fallback to old data on error
    const { slug } = params
    const oldProperty = offPlanListings.find(
      old => old.slug === slug
    )
    
    if (oldProperty) {
      return Response.json({ 
        success: true, 
        data: oldProperty,
        source: 'fallback',
        error: error.message
      })
    }
    
    return Response.json({ 
      success: false, 
      error: error.message
    }, { status: 500 })
  }
}

