import bundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  // Tree-shake barrel imports (smaller client bundles)
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
  compiler: {
    removeConsole: isProd
      ? {
          exclude: ["error", "warn"],
        }
      : false,
  },

  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    // Optimize image processing
    formats: ["image/avif", "image/webp"],
  },

  env: {
    RapidAPIKey: process.env.RapidAPIKey,
    RapidAPIHost: process.env.RapidAPIHost,
    ReactMapBoxToken: process.env.ReactMapBoxToken,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN,
    GERMAN_INSTAGRAM_ACCESS_TOKEN: process.env.GERMAN_INSTAGRAM_ACCESS_TOKEN,
    FB_PIXEL_ID: process.env.FB_PIXEL_ID,
    FB_CONVERSIONS_ACCESS_TOKEN: process.env.FB_CONVERSIONS_ACCESS_TOKEN,
    BAYUT_API_KEY: process.env.BAYUT_API_KEY,
    BAYUT_API_HOST: process.env.BAYUT_API_HOST,
    // Client bundles read NEXT_PUBLIC_* — prefer explicit Vercel vars, else bridge from BAYUT_*
    NEXT_PUBLIC_BAYUT_API_KEY:
      process.env.NEXT_PUBLIC_BAYUT_API_KEY || process.env.BAYUT_API_KEY,
    NEXT_PUBLIC_BAYUT_API_HOST:
      process.env.NEXT_PUBLIC_BAYUT_API_HOST || process.env.BAYUT_API_HOST,
  },

  async redirects() {
    return [
      { source: "/about", destination: "/our-story", permanent: true, },
      { source: "/the-oasis", destination: "/communities/the-oasis", permanent: true },
      { source: "/the-oasis/:path*", destination: "/communities/the-oasis/:path*", permanent: true },
      { source: "/grand-polo-club", destination: "/communities/grand-polo-club", permanent: true },
      { source: "/grand-polo-club/:path*", destination: "/communities/grand-polo-club/:path*", permanent: true },
      { source: "/mina-rashid-by-emaar", destination: "/communities/mina-rashid-by-emaar", permanent: true },
      { source: "/mina-rashid-by-emaar/:path*", destination: "/communities/mina-rashid-by-emaar/:path*", permanent: true },
      { source: "/dubai-hills-estate", destination: "/communities/dubai-hills-estate", permanent: true },
      { source: "/dubai-hills-estate/:path*", destination: "/communities/dubai-hills-estate/:path*", permanent: true },
      { source: "/dubai-creek-harbour", destination: "/communities/dubai-creek-harbour", permanent: true },
      { source: "/dubai-creek-harbour/thankyou", destination: "/communities/dubai-creek-harbour/thankyou", permanent: true, },
      { source: "/the-valley", destination: "/communities/the-valley", permanent: true },
      { source: "/the-valley/:path*", destination: "/communities/the-valley/:path*", permanent: true },
      { source: "/palm-jebel-ali", destination: "/communities/palm-jebel-ali", permanent: true },
      { source: "/palm-jebel-ali/:path*", destination: "/communities/palm-jebel-ali/:path*", permanent: true },
      { source: "/dubai-maritime-city", destination: "/communities/dubai-maritime-city", permanent: true },
      { source: "/dubai-maritime-city/thankyou", destination: "/communities/dubai-maritime-city/thankyou", permanent: true, },
      { source: "/dubai-meritime-city", destination: "/communities/dubai-maritime-city", permanent: true },
      { source: "/dubai-meritime-city/thankyou", destination: "/communities/dubai-maritime-city/thankyou", permanent: true },
    ];
  },

  async headers() {
    if (!isProd) return [];

    return [
      {
        // Security headers for all routes
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Next.js build output (hashed)
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Next Image optimizer assets
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Your custom static assets (fonts, images, videos)
        source:
          "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|mp4|webm|woff|woff2|ttf|otf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Optional: your /media folder
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // NOTE: no headers for "/" or dynamic routes => HTML stays fresh
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
