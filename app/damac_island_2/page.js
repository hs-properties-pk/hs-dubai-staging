import DamacIslandTwo from './DamacIslandTwo';

export const metadata = {
  title: 'DAMAC Island 2 Dubai: Villas & Townhouses Phase 2',
  description: 'Discover luxury living at DAMAC Island 2 Dubai with Phase 2 offering exquisite villas and townhouses. Explore the vibrant community and find your dream home today!',
  keywords: 'DAMAC Island 2 Dubai, DAMAC Islands Phase 2, DAMAC Island 2 community, DAMAC Island 2 villas, DAMAC Island 2 townhouses',
};

export default function Page() {
  const pixelId = process.env.FB_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  return <DamacIslandTwo pixelId={pixelId} />;
}