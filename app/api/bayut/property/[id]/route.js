import { NextResponse } from "next/server";
import { getBayutPropertyDataForPage } from "@/lib/bayutCached";

export async function GET(request, { params }) {
  const purpose =
    new URL(request.url).searchParams.get("purpose") || "for-sale";
  const { id } = params;

  const { data, error } = await getBayutPropertyDataForPage(purpose, id);

  if (purpose === "off-plan" && !data) {
    return NextResponse.json(
      { data: null, error: "Not found" },
      { status: 404 }
    );
  }

  if (error && !data) {
    return NextResponse.json({ data: null, error }, { status: 502 });
  }

  return NextResponse.json({ data, error: error || null });
}
