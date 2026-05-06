/**
 * Map GMB-style or flat review objects to ReviewCard / UI props.
 */
export function normalizeGoogleReviewRating(r) {
  if (typeof r.rating === "number" && Number.isFinite(r.rating)) {
    return Math.min(5, Math.max(0, Math.round(r.rating)));
  }
  if (typeof r.starRating === "string") {
    const map = {
      ONE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5,
      STAR_RATING_UNSPECIFIED: 0,
    };
    return map[r.starRating] ?? 5;
  }
  return 5;
}

export function getGoogleReviewerName(r) {
  if (typeof r.reviewer === "string") return r.reviewer.trim();
  if (r.reviewer && typeof r.reviewer === "object" && r.reviewer.displayName) {
    return String(r.reviewer.displayName).trim();
  }
  return "Google reviewer";
}

export function mapGoogleReviewsForDisplay(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map((r, index) => ({
    id: `${index}-${getGoogleReviewerName(r)}-${String(r.comment || "").slice(0, 24)}`,
    name: getGoogleReviewerName(r),
    date: typeof r.date === "string" ? r.date : "",
    rating: normalizeGoogleReviewRating(r),
    comment: String(r.comment || "").trim(),
  }));
}
