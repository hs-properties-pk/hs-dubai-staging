import { NextResponse } from "next/server";
import {
  getBayutApiHeaders,
  getBayutPropertiesSearchCached,
} from "@/lib/bayutCached";

export async function POST(req) {
  try {
    const headers = getBayutApiHeaders();
    if (!headers["x-rapidapi-key"] || !headers["x-rapidapi-host"]) {
      return NextResponse.json(
        { error: "Bayut API not configured" },
        { status: 503 }
      );
    }

    const data = await req.json();
    const page = Math.max(0, parseInt(data.page ?? 0, 10));
    const { page: _drop, ...body } = data;

    if (!body.purpose) {
      return NextResponse.json({ error: "Missing purpose" }, { status: 400 });
    }

    const result = await getBayutPropertiesSearchCached(body, page);
    return NextResponse.json(result);
  } catch (e) {
    console.error("api/bayut/properties-search", e);
    return NextResponse.json(
      { error: "Upstream error" },
      { status: 502 }
    );
  }
}
