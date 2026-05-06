import { getAreasByEmirate } from "@/lib/fetchAreaGuidesData";

export async function GET(request, { params }) {
  const { emirateSlug } = params;

  try {
    console.log(`🔍 API Route: Fetching areas for emirate: ${emirateSlug}`);
    const data = await getAreasByEmirate(emirateSlug);
    
    console.log("📦 API Route: Received data:", data);
    
    if (!data) {
      console.error(`❌ API Route: No data returned for ${emirateSlug}`);
      return Response.json(
        { success: false, error: `Areas not found for ${emirateSlug}`, data: [] },
        { status: 500 }
      );
    }

    if (!data.data || data.data.length === 0) {
      console.warn(`⚠️ API Route: Empty areas for ${emirateSlug}`);
      return Response.json(
        { success: false, error: `No areas found for ${emirateSlug}`, data: [] },
        { status: 200 }
      );
    }

    console.log(`✅ API Route: Returning ${data.data.length} areas for ${emirateSlug}`);
    return Response.json({ success: true, ...data });
  } catch (error) {
    console.error(`❌ API Route Error for ${emirateSlug}:`, error);
    return Response.json(
      { success: false, error: error.message, data: [] },
      { status: 500 }
    );
  }
}
