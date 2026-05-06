import { getEmiratesList } from "@/lib/fetchAreaGuidesData";

export async function GET() {
  try {
    console.log("🔍 API Route: Fetching emirates...");
    const data = await getEmiratesList();
    
    console.log("📦 API Route: Received data:", data);
    
    if (!data) {
      console.error("❌ API Route: No data returned from getEmiratesList");
      return Response.json(
        { success: false, error: "Failed to fetch emirates - no data returned", data: [] },
        { status: 500 }
      );
    }

    if (!data.data || data.data.length === 0) {
      console.warn("⚠️ API Route: Empty emirates data");
      return Response.json(
        { success: false, error: "No emirates data found", data: [] },
        { status: 200 }
      );
    }

    console.log(`✅ API Route: Returning ${data.data.length} emirates`);
    return Response.json({ success: true, ...data });
  } catch (error) {
    console.error("❌ API Route Error:", error);
    return Response.json(
      { success: false, error: error.message, data: [] },
      { status: 500 }
    );
  }
}
