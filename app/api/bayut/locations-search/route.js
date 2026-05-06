import { NextResponse } from "next/server";
import {
  getBayutApiHeaders,
  getBayutLocationsSearchCached,
} from "@/lib/bayutCached";

export async function GET(req) {
  try {
    const headers = getBayutApiHeaders();
    if (!headers["x-rapidapi-key"] || !headers["x-rapidapi-host"]) {
      return NextResponse.json(
        { error: "Bayut API not configured" },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";
    if (!query.trim()) {
      return NextResponse.json({ hits: [], results: [] });
    }

    const result = await getBayutLocationsSearchCached(query);
    return NextResponse.json(result ?? { hits: [], results: [] });
  } catch (e) {
    console.error("api/bayut/locations-search", e);
    return NextResponse.json(
      { error: "Upstream error" },
      { status: 502 }
    );
  }
}
