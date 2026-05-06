import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isAllowedTag(tag) {
  if (
    tag === "blogs" ||
    tag === "area-guides" ||
    tag === "brands" ||
    tag === "properties"
  ) {
    return true;
  }

  return (
    tag.startsWith("area-guides:emirate:") ||
    tag.startsWith("area-guides:detail:") ||
    tag === "area-guides:emirates" ||
    tag === "brands:list" ||
    tag.startsWith("brands:detail:") ||
    tag.startsWith("properties:purpose:") ||
    tag.startsWith("properties:detail:")
  );
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));

    const requestSecret =
      request.headers.get("x-revalidate-secret") || body.secret;
    const expectedSecret = process.env.REVALIDATE_SECRET;

    if (!expectedSecret) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing REVALIDATE_SECRET on server",
        },
        { status: 500 }
      );
    }

    if (requestSecret !== expectedSecret) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid secret",
        },
        { status: 401 }
      );
    }

    const inputTags = Array.isArray(body.tags) ? body.tags : [];
    const inputPaths = Array.isArray(body.paths) ? body.paths : [];

    const tags = inputTags.filter(
      (tag) => typeof tag === "string" && isAllowedTag(tag)
    );
    const paths = inputPaths.filter((path) => typeof path === "string");

    const tagsToRevalidate = tags.length ? tags : ["blogs", "area-guides", "brands", "properties"];

    for (const tag of tagsToRevalidate) {
      revalidateTag(tag);
    }

    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({
      success: true,
      revalidated: {
        tags: tagsToRevalidate,
        paths,
      },
      now: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Revalidation failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
