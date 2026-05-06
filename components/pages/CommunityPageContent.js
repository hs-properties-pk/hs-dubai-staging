import React from "react";
import CommunityCardsGrid from "./CommunityCardsGrid";
import CommunityFaqs from "../CommunityFaqs";
import CommunityContactSection from "../CommunityContactSection";
import Image from "next/image";

export default function CommunityPageContent() {
  // SEO Content stored as HTML strings for guaranteed source code visibility
  const seoContent = {
    welcome: `
      <section class="max-w-screen-2xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div class="w-full mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-black mb-6 font-custom">
           Best Residential Communities in Dubai
          </h2>
          <p class="text-lg text-gray-700 leading-relaxed mb-8 font-custom3">
           Dubai is home to some of the most well-planned and lifestyle-driven residential communities in the world. From luxury waterfront neighborhoods to family-focused villa districts, residential communities in Dubai are designed to offer comfort, connectivity, and long-term value.
           Whether you are relocating, upgrading your lifestyle, or searching for the best areas in Dubai to live, choosing the right community plays a key role in your overall living experience.
          </p>
        </div>
        <div class="w-full mx-auto">
          <h2 class="text-xl md:text-2xl font-bold text-black mb-6 font-custom">
          Why Dubai Is Known for World-Class Residential Communities
          </h2>
          <p class="text-lg text-gray-700 leading-relaxed mb-8 font-custom3">
           Dubai residential areas are developed with a strong focus on quality of life. Most communities offer integrated amenities such as parks, schools, retail centers, healthcare facilities, and easy access to major roads.
          What makes communities in Dubai stand out is their variety residents can choose between vibrant city living, peaceful suburban environments, or exclusive waterfront destinations, all within a well-regulated and secure framework.

          </p>
        </div>
        <div class="w-full mx-auto">
          <h2 class="text-xl md:text-2xl font-bold text-black mb-6 font-custom">
            Explore the Best Communities in Dubai to Live
          </h2>
          <p class="text-lg text-gray-700 leading-relaxed mb-6 font-custom3">
            Dubai offers residential communities that suit different lifestyles and budgets. Some areas are ideal for professionals seeking central locations, while others are designed for families looking for space, greenery, and privacy.
          </p>
          <p class="text-lg text-gray-700 leading-relaxed mb-4 font-custom3">
            The best communities to live in Dubai typically offer:
          </p>
          <ul class="list-disc list-inside space-y-2 mb-6 text-gray-700 font-custom3">
            <li>Safe and family-friendly environments</li>
            <li>Modern infrastructure and connectivity</li>
            <li>A mix of apartments, townhouses, and villas</li>
            <li>Strong long-term residential demand</li>
            <li>World-class amenities including parks, schools, and retail centers</li>
            <li>Excellent connectivity to major business districts and attractions</li>
          </ul>
          <p class="text-lg text-gray-700 leading-relaxed mb-4 font-custom3">
            Popular communities include iconic destinations like Palm Jumeirah, vibrant waterfront areas such as Dubai Marina, and master-planned developments like Dubai Creek Harbour. Each community offers unique advantages, from luxury beachfront living to family-oriented suburban environments.
          </p>
          <p class="text-lg text-gray-700 leading-relaxed mb-8 font-custom3">
            Choosing the right Dubai residence depends on lifestyle preferences, daily commute, and future plans. Our team at H&S Real Estate can help you explore these communities and find the perfect match for your needs.
          </p>
        </div>

      </section>
    `,
    afterCards: `
      <section class="max-w-screen-2xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div class="w-full mx-auto space-y-12">
          
          <!-- Dubai Residential Areas for Families, Professionals & Investors -->
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-black mb-4 font-custom">
              Dubai Residential Areas for Families, Professionals & Investors
            </h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-4 font-custom3">
              Many Dubai residential areas are master-planned to support long-term living. Family-oriented communities focus on schools, parks, and villas, while urban residential zones offer apartments close to business hubs and entertainment districts.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed font-custom3">
              For investors, residential communities in Dubai remain highly attractive due to consistent rental demand, population growth, and government-backed development planning.
            </p>
          </div>

          <!-- Best Villa Communities -->
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-black mb-4 font-custom">
              Best Villa Communities in Dubai for Spacious Living
            </h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-4 font-custom3">
              For buyers seeking space and privacy, best villa communities in Dubai offer an ideal solution. These communities are designed around low-density living, landscaped surroundings, and premium amenities.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed font-custom3">
              Villa communities are especially popular among families and long-term residents who value outdoor space, community facilities, and a quieter lifestyle compared to high-rise living.
            </p>
          </div>

          <!-- Finding Residential Communities Near You -->
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-black mb-4 font-custom">
              Finding Residential Communities Near You in Dubai
            </h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-4 font-custom3">
              With Dubai's rapid expansion, residents often search for communities near me to stay close to workplaces, schools, or lifestyle hubs. Well-connected residential communities near major highways and public transport routes make daily commuting easier while maintaining a comfortable living environment.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed font-custom3">
              Dubai's planning ensures that even newer residential areas are supported by essential services and future infrastructure growth.
            </p>
          </div>

          <!-- How H&S Real Estate Helps -->
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-black mb-4 font-custom">
              How H&S Real Estate Helps You Choose the Right Community
            </h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-4 font-custom3">
              At H&S Real Estate, we help clients navigate Dubai's residential landscape with clarity and confidence. Instead of focusing only on properties, we guide you through community selection based on lifestyle needs, location preferences, and long-term value.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed mb-4 font-custom3">
              Our team helps you:
            </p>
            <ul class="list-disc list-inside space-y-2 mb-4 text-gray-700 font-custom3">
              <li>Compare the best residential areas in Dubai</li>
              <li>Shortlist communities that match your lifestyle</li>
              <li>Understand future growth and demand</li>
              <li>Make informed decisions for living or investment</li>
            </ul>
          </div>

          <!-- Explore Featured Communities -->
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-black mb-4 font-custom">
              Explore Featured Residential Communities in Dubai
            </h2>
            <p class="text-lg text-gray-700 leading-relaxed font-custom3">
              Discover carefully selected residential communities across Dubai, including established neighborhoods and future-focused developments. Each community offers a unique living experience designed to match different needs and preferences.
            </p>
          </div>

          <!-- Why Dubai Residential Communities Continue to Grow -->
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-black mb-4 font-custom">
              Why Dubai Residential Communities Continue to Grow in Demand
            </h2>
            <p class="text-lg text-gray-700 leading-relaxed font-custom3">
              Dubai's population growth, lifestyle appeal, and continuous urban development ensure that residential communities in Dubai remain in high demand. From established neighborhoods to future-ready developments, Dubai continues to offer some of the best residential living options in the region.
            </p>
          </div>
        </div>
      </section>
    `,
  };

  return (
    <>
      {/* Welcome Section - SEO Content as HTML */}
      <div dangerouslySetInnerHTML={{ __html: seoContent.welcome }} />

      {/* Communities Grid with Map View */}
      <CommunityCardsGrid />

      <CommunityContactSection />

      {/* After Cards Content - SEO Content as HTML */}
      <div dangerouslySetInnerHTML={{ __html: seoContent.afterCards }} />

      <CommunityFaqs />
    </>
  );
}
