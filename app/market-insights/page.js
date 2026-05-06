import React from 'react'
import MarketInsightsPage from '@/components/pages/MarketInsightsPage';

export const metadata = {
  title: 'Market Insights | H&S Real Estate',
  description: "Stay updated with market insights from H&S Real Estate. Explore the latest property trends, investment opportunities, and expert analysis to guide your decisions.",
}


function page() {
  return (
    <div><MarketInsightsPage /></div>
  )
}

export default page