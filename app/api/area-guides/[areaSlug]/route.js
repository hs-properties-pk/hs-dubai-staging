import { getAreaGuideDetail } from "@/lib/fetchAreaGuidesData";

export async function GET(request, { params }) {
  const { areaSlug } = params;

  try {
    console.log(`🔍 API Route: Fetching area detail for: ${areaSlug}`);
    const data = await getAreaGuideDetail(areaSlug);
    
    console.log("📦 API Route: Received data:", data);
    
    if (!data) {
      console.error(`❌ API Route: No data returned for ${areaSlug}`);
      return Response.json(
        { success: false, error: `Area guide not found: ${areaSlug}`, data: null },
        { status: 404 }
      );
    }

    console.log(`✅ API Route: Returning area detail for ${areaSlug}`);
    return Response.json({ success: true, data: data });
  } catch (error) {
    console.error(`❌ API Route Error for ${areaSlug}:`, error);
    return Response.json(
      { success: false, error: error.message, data: null },
      { status: 500 }
    );
  }
}
