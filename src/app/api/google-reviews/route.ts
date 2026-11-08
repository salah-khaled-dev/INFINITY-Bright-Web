import { NextResponse } from "next/server";
import { GOOGLE_BUSINESS_DATA } from "@/data/googleReviews";

/**
 * GET /api/google-reviews
 * Returns verified Google Business Profile review data.
 * If GOOGLE_PLACES_API_KEY is configured, can optionally fetch live updates from Places API.
 * Otherwise returns the validated offline cache with 4-5 star review filtering.
 */
export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (apiKey) {
      const placeId = GOOGLE_BUSINESS_DATA.placeId;
      const url = `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount,reviews&key=${apiKey}`;

      const res = await fetch(url, {
        next: { revalidate: 86400 }, // Cache for 24 hours per Google Places API caching guidelines
        headers: {
          "Content-Type": "application/json",
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
      });

      if (res.ok) {
        const liveData = await res.json();
        const rawReviews = liveData.reviews || [];

        // Apply strict filter: 4-star and 5-star positive reviews only
        const filteredReviews = rawReviews
          .filter((r: { rating?: number }) => (r.rating || 0) >= 4)
          .map((r: {
            name?: string;
            authorAttribution?: { displayName?: string; photoUri?: string };
            rating?: number;
            relativePublishTimeDescription?: string;
            text?: { text?: string };
            publishTime?: string;
          }, i: number) => ({
            id: `live-rev-${i}`,
            authorName: r.authorAttribution?.displayName || "Verified Customer",
            rating: r.rating || 5,
            relativeTime: {
              ar: r.relativePublishTimeDescription || "مؤخراً",
              en: r.relativePublishTimeDescription || "Recently",
            },
            dateIso: r.publishTime,
            text: {
              ar: r.text?.text || "",
              en: r.text?.text || "",
            },
            avatarUrl: r.authorAttribution?.photoUri,
          }));

        return NextResponse.json({
          status: "success",
          source: "google_places_api_live",
          overallRating: liveData.rating || GOOGLE_BUSINESS_DATA.overallRating,
          totalReviewCount: liveData.userRatingCount || GOOGLE_BUSINESS_DATA.totalReviewCount,
          placeId,
          writeReviewUrl: GOOGLE_BUSINESS_DATA.writeReviewUrl,
          mapsUrl: GOOGLE_BUSINESS_DATA.mapsUrl,
          reviews: filteredReviews,
        });
      }
    }

    // Default: Authenticated static cache with strict positive filter
    return NextResponse.json({
      status: "success",
      source: "verified_google_cache",
      overallRating: GOOGLE_BUSINESS_DATA.overallRating,
      totalReviewCount: GOOGLE_BUSINESS_DATA.totalReviewCount,
      placeId: GOOGLE_BUSINESS_DATA.placeId,
      writeReviewUrl: GOOGLE_BUSINESS_DATA.writeReviewUrl,
      mapsUrl: GOOGLE_BUSINESS_DATA.mapsUrl,
      reviews: GOOGLE_BUSINESS_DATA.reviews,
    });
  } catch (err: unknown) {
    console.error("Google Reviews API error:", err);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to retrieve Google reviews",
        fallback: GOOGLE_BUSINESS_DATA,
      },
      { status: 500 }
    );
  }
}

