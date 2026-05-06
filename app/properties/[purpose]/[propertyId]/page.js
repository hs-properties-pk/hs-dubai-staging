import PropertiesDetailsPage from "@/components/pages/PropertiesDetailsPage";
import PropertiesListingPage from "@/components/pages/PropertiesListingPage";
import { offPlanListings } from "@/data/off-plan-data";
import { notFound } from "next/navigation";
import { getBayutPropertyDataForPage } from "@/lib/bayutCached";
import { isOffPlanTypeListSlug, getOffPlanTypeListingMetadata } from "@/lib/offPlanTypeRoutes";
import { getPropertyBySlug } from "@/lib/fetchPropertiesData";

// Use ISR: cache pages and revalidate via tags from the CMS webhook
export const revalidate = 3600;

const offPlanMetaData = [
  {
    slug: "the-park-row-by-meraas-nad-al-sheba-gardens",
    metaTitle:
      "The Park Row by Meraas – Park-Facing Villas in Nad Al Sheba Gardens Dubai",
    metaDescription:
      "The Park Row by Meraas — 3, 4 & 5-bedroom park-facing villas and townhouses in Nad Al Sheba Gardens. Freehold. From AED 4.9M. 10 mins from Downtown Dubai. Enquire now.",
  },
  {
    slug: "bay-collection-at-dubai-islands",
    metaTitle:
      "Bay Collection Dubai Islands | Off-Plan Beachfront Villas by Nakheel",
    metaDescription:
      "Bay Collection at Dubai Islands by Nakheel an exclusive off-plan community of beachfront villas and townhouses on Dubai Islands. 3 to 6 bedroom residences with private beach access, Arabian Gulf views, and resort-style amenities. Enquire now.",
  },
  {
    slug: "bay-estate-at-dubai-islands",
    metaTitle:
      "Bay Estate Dubai Islands | Off-Plan Beachfront Villas by Nakheel",
    metaDescription:
      "Bay Estate at Dubai Islands by Nakheel  an exclusive off-plan beachfront villa and townhouse community on Island E. Limited 3 to 7 bedroom residences with private beach access and Arabian Gulf views. Enquire now.",
  },
  {
    slug: "city-walk-crestlane",
    metaTitle:
      "City Walk Crestlane by Meraas | Luxury Apartments in City Walk Dubai",
    metaDescription:
      "City Walk Crestlane by Meraas: premium 1 to 4 bedroom apartments and duplexes in the heart of City Walk Dubai. Waterfront living, world-class amenities, and flexible payment plans. Starting from AED 2.6M. Enquire now.",
  },
  {
    slug: "the-edit-at-d3",
    metaTitle:
      "The Edit at D3 | Luxury Waterfront Apartments in Dubai Design District",
    metaDescription:
      "The Edit at D3 by Meraas: three sculptural waterfront towers in Dubai Design District. Premium 1 to 4 bedroom apartments and signature penthouses overlooking Dubai Canal. Off-plan with flexible payment plans. Enquire now.",
  },
  {
    slug: "palm-central-private-residences-palm-jebel-ali",
    metaTitle:
      "Palm Central at Palm Jebel Ali | Off-Plan Waterfront Villas in Dubai",
    metaDescription:
      "Discover Palm Central at Palm Jebel Ali Dubai's most exclusive off-plan beachfront villa community. Private sea-facing villas and ultra-luxury mansions with direct beach access. Secure your unit with H&S Real Estate today.",
  },
  {
    slug: "shahrukhz-by-danube",
    metaTitle:
      "Shahrukhz by Danube Tower | Luxury Waterfront Apartments in Al Sufouh Dubai",
    metaDescription:
      "Shahrukhz by Danube Tower — luxury 55-storey waterfront apartments in Al Sufouh, Dubai by Danube Properties. Studio, 1 & 2 BR from AED 2.1M. 70/30 payment plan. Freehold. Enquire now.",
  },
  {
    slug: "fiori-town-square-dubai-nshama",
    metaTitle:
      "Fiori at Town Square Dubai by Nshama | Affordable Apartments with Flexible Payment Plans in a Prime Dubai Location",
    metaDescription:
      "Looking for affordable housing in Dubai? Fiori at Town Square offers 1-bed, 2-bed, and studio apartments with great payment plans in a prime location.",
  },
  {
    slug: "mjl-nourelle-residences-madinat-jumeirah-living",
    metaTitle: "MJL Nourelle Residences | Luxury Apartments for Sale in Dubai",
    metaDescription:
      "MJL Nourelle Residences presents a range of studio, 1-bedroom, and 2-bedroom apartments for sale in the heart of Dubai. Start your journey to ownership today.",
  },
  {
    slug: "ivy-at-parkfive-dubai-production-city",
    metaTitle:
      "Ivy at ParkFive by Deyaar | Modern Living in Dubai Production City",
    metaDescription:
      "Experience premium living with Ivy at ParkFive by Deyaar Developments. This off-plan project features Studio, 1-Bedroom, 2-Bedroom, 2-Bedroom Duplex, and 3-Bedroom Duplex units in Dubai Production City.",
  },
  {
    slug: "terra-gardens-at-expo-living-dubai",
    metaTitle: "Terra Gardens At Expo Living, Dubai By Emaar",
    metaDescription:
      "Luxury smart homes by Emaar at Expo Living, Dubai. Off-plan apartments & townhouses near Burj Khalifa, Dubai Marina & Sheikh Zayed Road.",
  },
  {
    slug: "portside-square-ellington-mina-rashid",
    metaTitle: "Portside Square By Ellington At Mina Rashid - Dubai",
    metaDescription:
      "Discover luxury living at Portside Square by Ellington at Mina Rashid, Dubai. Explore our stunning apartment options, including studio units and spacious 1, 2, 3, and 4-bedroom layouts..",
  },
  {
    slug: "palm-jebel-ali-by-nakheel",
    metaTitle: "Palm Jebel Ali Villas by Nakheel - Dubai",
    metaDescription:
      "Palm Jebel Ali Villas by Nakheel redefine luxury living in Dubai with exclusive beachfront homes, panoramic sea views, sustainable design, and smart community amenities.",
  },
  {
    slug: "damac-riverside-views",
    metaTitle: "Damac Riverside Views at Dubai Investment Park by DAMAC",
    metaDescription:
      "Experience Damac Riverside Views at Dubai Investment Park by DAMAC, luxury waterfront living with modern homes, scenic views, and premium amenities.",
  },
  {
    slug: "aurea-at-rashid-yachts-and-marina",
    metaTitle:
      "Aurea by Emaar | Luxury Waterfront Living at Rashid Yachts & Marina",
    metaDescription:
      "Explore Aurea at Rashid Yachts & Marina by Emaar, premium waterfront homes with modern design, sea views, smart features, and Dubai’s vibrant marina lifestyle.",
  },
  // ++++++++++++++++++++++++++++++++++++++++
  {
    slug: "d-villas-by-dar-global",
    metaTitle: "D-Villas at Jumeirah Golf Estates – DarGlobal Dubai",
    metaDescription:
      "Buy D-Villas at Jumeirah Golf Estates by DarGlobal. Luxury villas in a gated community with golf course views and post-handover payment plan in Dubai, UAE.",
  },
  {
    slug: "eltiera-views-jumeirah-islands",
    metaTitle:
      "Eltiera Views Ellington | Jumeirah Islands Apartments & Penthouses",
    metaDescription:
      "Eltiera Views by Ellington in Jumeirah Islands: 1–3 BR + penthouses, onsen & 40m pool, from ~AED 2.1M, 70/30 plan. Handover Q4 2028–2029. Enquire with H&S.",
  },
  {
    slug: "montiva-by-vida",
    metaTitle: "Montiva by Vida at Dubai Creek Harbour – Branded Apartments",
    metaDescription:
      "Emaar + Vida off-plan in Green Gate, Dubai Creek Harbour. From ~AED 1.91M, 1–3 BR (+ maid options), 755–1,911 sq ft, 10/70/20 plan, handover ~Q3 2029.",
  },
  {
    slug: "baystar-by-vida",
    metaTitle: "Baystar by Vida Dubai – Rashid Yachts & Marina Apartments",
    metaDescription:
      "Buy Vida Baystar apartments at Rashid Yachts & Marina. Waterfront branded residences with marina views, infinity pool and yoga deck; starting prices from AED 2.1M.",
  },
  {
    slug: "selvara-phase-3-by-emaar",
    metaTitle:
      "Selvara Phase 3 by Emaar – 4-BR Villas at Grand Polo Club & Resort",
    metaDescription:
      "Buy Selvara Phase 3 by Emaar in DIP. 4-bed villas from AED 6.49M, equestrian lifestyle, parks, yoga pavilion and kids play areas; 80/20 plan, Q2-2029 handover.",
  },
  {
    slug: "selvara-phase-4-by-emaar",
    metaTitle: "Selvara Phase 4 by Emaar – Villas in Dubai Investment Park",
    metaDescription:
      "Selvara Phase 4 by Emaar in DIP: 4-bedroom stand-alone villas with private gardens, polo-inspired lifestyle, yoga pavilion and gym, near Expo Road; off-plan release.",
  },
  {
    slug: "nad-al-sheba-gardens-phase-8-by-meraas",
    metaTitle: "Nad Al Sheba Gardens Phase 8 by Meraas – Townhouses & Villas",
    metaDescription:
      "Phase 8 Nad Al Sheba Gardens by Meraas: 3–7 BR townhouses & villas with lagoon, wave pool and yoga lawns near Downtown & DXB.",
  },
  {
    slug: "asora-bay-villas-by-meraas",
    metaTitle:
      "Asora Bay Villas by Meraas - Jumeirah Residences & Ocean Mansions",
    metaDescription:
      "Asora Bay luxury residences by Meraas at La Mer: Ocean Mansions, 4 BR hillside homes and penthouses with infinity pools, private spas and a flexible plan.",
  },
  {
    slug: "selvara-grand-polo-club-and-resort",
    metaTitle: "Selvara Grand Polo Club - Luxury Villas in Dubailand Dubai",
    metaDescription:
      "Buy Selvara Grand Villas in Dubailand. Luxury homes with private stables, clubhouse, polo fields & family-friendly amenities. Investment villas available now.",
  },
  {
    slug: "bay-grove-residences-phase-4",
    metaTitle:
      "Bay Grove Residences Dubai Islands - Beachfront Apartments by Nakheel",
    metaDescription:
      "Buy 1-4 bedroom apartments at Bay Grove Residences Phase 4 by Nakheel. Enjoy beachfront living at Dubai Islands with world-class amenities and sea views.",
  },
  {
    slug: "avana-residences",
    metaTitle: "Buy Avana Residences Dubai - Off-plan by Deca Developments",
    metaDescription:
      "Avana Residences by Deca offers 1 & 2-bed smart apartments in JVC. Invest in boutique living near Circle Mall with flexible plans and modern design.",
  },
  {
    slug: "rosehill",
    metaTitle: "Buy Off-Plan Rosehill Villas at Dubai Hills Estate by Emaar",
    metaDescription:
      "Luxury 4 & 5BR Emaar villas in Rosehill Dubai Hills Estate. Gated community, smart homes & private gardens. Invest in park-facing off-plan homes today.",
  },
  {
    slug: "nad-al-sheba-gardens-phase-10",
    metaTitle: "Nad Al Sheba Phase 10 Villas for Sale by Meraas in Dubai",
    metaDescription:
      "Explore Nad Al Sheba Phase 10 by Meraas - luxury 3 to 7-bedroom villas near Downtown with private gardens, Central Park, lagoons, and flexible payment plans.",
  },
  {
    slug: "vida-residences-hillside",
    metaTitle: "Vida Residences Hillside: Luxury Apartments Dubai Hills",
    metaDescription:
      "Buy Vida Residences Hillside at Dubai Hills Estate. Off-plan 1-3 BR park view apartments with infinity pool, gym, and fast access to Downtown Dubai living.",
  },
  {
    slug: "address-villas-tierra",
    metaTitle: "Address Villas Tierra: Branded Villas in Dubai Hills",
    metaDescription:
      "Address Villas Tierra at Dubai Hills Estate. Branded 4-6 BR villas by Address Hotels with lagoon, clubhouse, gardens, flexible payment plan, handover 2029.",
  },
  {
    slug: "park-gate-2",
    metaTitle: "Park Gate 2 Dubai Hills: Off-Plan Villas & Townhouses",
    metaDescription:
      "Own Park Gate 2 in Dubai Hills Estate. Off-plan villas and townhouses beside Central Park, clubhouse, pool, retail promenade, payment plan. Handover 2028!!",
  },
  {
    slug: "south-square",
    metaTitle: "South Square Dubai South: Contemporary Apartments",
    metaDescription:
      "South Square by Dubai South offers smart studios to 3bed apartments near Expo City and Al Maktoum Airport, with pool, gym, retail plaza and café boulevard.",
  },
  {
    slug: "the-chedi-private-residences",
    metaTitle: "The Chedi Private Residences: Luxury Sky Villas SZR",
    metaDescription:
      "The Chedi Private Residences on Sheikh Zayed Road, branded luxury 2-8 BR villas with elevators, gardens, pools, concierge, and Golden Visa eligibility UAE.",
  },
  {
    slug: "binghatti-aquarise",
    metaTitle:
      "Binghatti Aquarise Business Bay, Worldclass Waterfront Apartments",
    metaDescription:
      "Binghatti Aquarise, Business Bay: studios to 4-BR Royal Suites with canal views, infinity pool, beach, garden and flex payment.",
  },
  {
    slug: "grand-polo-club-and-resort",
    metaTitle: "Grand Polo Club & Resort Dubai – Luxury Equestrian Villas",
    metaDescription:
      "Discover Grand Polo Club & Resort Dubai. Off-plan luxury 3-5 BR villas, championship polo fields, modern amenities, and equestrian facilities. Invest today!",
  },
  {
    slug: "shoaq",
    metaTitle: "Shoaq Dubai Islands – Boutique Beachfront Residences",
    metaDescription:
      "Experience Shoaq Dubai Islands beachfront living. Choose 1-3 BR apartments, duplex townhouses, rooftop pool and private beach access. Handover Q3 2027.",
  },
  {
    slug: "albero-at-dubai-creek-harbour",
    metaTitle: "Albero at Dubai Creek Harbour by Emaar Properties",
    metaDescription:
      "Explore Albero by Emaar, luxury waterfront residences in Dubai Creek Harbour offering skyline-view apartments and townhouses. Flexible payment plans and handover in Q3 2029.",
  },
  {
    slug: "rivera-at-the-valley-by-emaar-properties",
    metaTitle:
      "Rivera at The Valley by Emaar Properties Dubai | H&S Real Estate",
    metaDescription:
      "Explore Rivera at The Valley by Emaar in Dubai featuring twin villas with contemporary design, scenic views, premium amenities, and flexible payment plans. Handover Q3 2029.",
  },
  {
    slug: "atelis-by-meraas-in-dubai",
    metaTitle: "Atelis by Meraas in Dubai Design District | H&S Real Estate",
    metaDescription:
      "Discover Atelis by Meraas, luxury apartments in Dubai Design District offering 1–4 bedroom units, sky villas, and penthouses. Premium amenities, skyline views, and handover in July 2029.",
  },
  {
    slug: "address-residences-zabeel-by-emaar",
    metaTitle: "Address Residences Zabeel Dubai by Emaar | H&S Real Estate",
    metaDescription:
      "Explore Address Residences Zabeel by Emaar, luxury apartments in Zabeel Dubai with iconic views, premium amenities, and flexible payment plans. Handover Q3 2029.",
  },
  {
    slug: "laya-courtyard-at-dubai-studio-city",
    metaTitle: "Laya Courtyard at Dubai Studio City Luxury Apartments for Sale",
    metaDescription:
      "Discover Laya Courtyard at Dubai Studio City with luxury studio and 1-bedroom apartments featuring smart home technology, top-tier amenities, and flexible payment plans.",
  },
  {
    slug: "one-b-tower-by-wasl-properties",
    metaTitle: "One B Tower by Wasl Properties at Sheikh Zayed Road",
    metaDescription:
      "One B Tower by Wasl Properties offers luxury apartments on Sheikh Zayed Road with Dubai Water Canal views. 1 to 4-bedroom units with flexible payment plans. Handover in Q3 2028.",
  },
  {
    slug: "jumeirah-asora-bay-by-meraas",
    metaTitle: "Jumeirah Asora Bay by Meraas at La Mer, Dubai",
    metaDescription:
      "Discover Jumeirah Asora Bay by Meraas, an exclusive beachfront development in La Mer, Dubai. Explore luxury apartments,amenities, and prime investment opportunities.",
  },
  {
    slug: "address-grand-downtown",
    metaTitle: "Address Grand Downtown by Emaar Properties in Dubai",
    metaDescription:
      "Address Grand Downtown by Emaar offers luxury residences with premium amenities and stunning views in Dubai. Handover in October 2028.",
  },
  {
    slug: "golf-verge-at-emaar-south",
    metaTitle:
      "Golf Verge at Emaar South by Emaar Properties | H&S Real Estate",
    metaDescription:
      "Discover Golf Verge at Emaar South by Emaar Properties, offering luxury 1, 2 & 3-bedroom apartments with golf course views and world-class amenities in Dubai.",
  },
  {
    slug: "ghaf-woods-by-majid-al-futtaim",
    metaTitle: "Ghaf Woods By Majid Al Futtaim At Dubailand",
    metaDescription:
      "Discover Ghaf Woods, Dubai’s first forest-living community by Majid Al Futtaim. Experience luxury eco-friendly homes with world-class amenities and nature trails.",
  },
  {
    slug: "riverside-views",
    metaTitle: "Damac Riverside Views Luxury Apartments | H&S Real Estate",
    metaDescription:
      "Discover luxurious living at Damac Riverside Views in Dubai Investment Park. Enjoy modern design, family-friendly amenities, and stunning river views.",
  },
  {
    slug: "greenspoint",
    metaTitle:
      "Greenspoint at Emaar South by Emaar Properties | H&S Real Estate",
    metaDescription:
      "Discover Greenspoint at Emaar South by Emaar Properties. Enjoy 3-bedroom townhouses, family-friendly amenities & investment opportunities in Dubai South.",
  },
  {
    slug: "naya-at-district-one-by-nakheel",
    metaTitle: "Naya at District One by Nakheel in MBR City, Dubai",
    metaDescription:
      "Experience upscale living at Naya at District One by Nakheel. Discover luxury apartments, villas, top amenities, and exclusive investment opportunities in Dubai.",
  },
  {
    slug: "saas-hills-at-dubai-science-park",
    metaTitle: "SAAS Hills at Dubai Science Park by SAAS Properties",
    metaDescription:
      "Discover SAAS Hills at Dubai Science Park by SAAS Properties. Enjoy luxury studio & 1-bedroom apartments, smart home features & premium amenities.",
  },
  {
    slug: "beachfront-gate",
    metaTitle: "Beachfront Gates at Expo City Dubai | H&S Real Estate",
    metaDescription:
      "Discover luxury beachfront apartments at Beachfront Gates, Expo City. Explore 1-3 bedroom residences, eco-friendly living, and prime investment opportunities.",
  },
  {
    slug: "belgravia-gardens",
    metaTitle: "Belgrave Gardens by Ellington at Dubailand | H&S Real Estate",
    metaDescription:
      "Discover Belgrave Gardens by Ellington at Dubailand, offering luxury apartments with top amenities, flexible payment plans, and high ROI investment opportunities.",
  },
  {
    slug: "the-bristol",
    metaTitle: "The Bristol Hotels at Emaar Beachfront | H&S Real Estate",
    metaDescription:
      "Discover The Bristol Luxury Hotels & Resorts at Emaar Beachfront, offering family-friendly amenities, dining options, and exclusive experiences.",
  },
  {
    slug: "solaya-la-mer",
    metaTitle: "Solaya La Mer at Jumeirah by Meraas | H&S Real Estate",
    metaDescription:
      "Explore Solaya La Mer at Jumeirah by Meraas a luxury beachfront living with private beach access, stunning sea views, and world-class amenities.",
  },
  {
    slug: "park-beach-residences-II",
    metaTitle: "Park Beach Residence 2 at Al Marjan Island",
    metaDescription:
      "Explore Park Beach Residence 2 at Al Marjan Island, offering luxury 1- and 2-bedroom beachfront apartments with modern designs, premium amenities, and sea views.",
  },
  {
    slug: "binghatti-royale",
    metaTitle: "Binghatti Royale Apartments at Jumeirah Village Circle Dubai",
    metaDescription:
      "Explore Binghatti Royale at JVC Dubai. Luxury 1-2 bedroom apartments with modern designs, family-friendly amenities, prime location, and flexible payment plans.",
  },
  {
    slug: "palm-jebel-ali",
    metaTitle: "Palm Jebel Ali Villas and Waterfront Plots by Nakheel Dubai",
    metaDescription:
      "Discover Palm Jebel Ali by Nakheel in Dubai. Explore luxury villas, waterfront plots, and spacious beach-facing mansions in a world-class gated community.",
  },
  {
    slug: "velora-II",
    metaTitle: "Velora 2 Townhouses by Emaar at The Valley Dubai",
    metaDescription:
      "Discover Velora 2 by Emaar at The Valley Dubai. Luxury 3- and 4-bedroom townhouses with modern designs, green spaces, and family-friendly amenities",
  },
  {
    slug: "takaya",
    metaTitle: "Takaya Apartments by Union Properties at Motor City Dubai",
    metaDescription:
      "Discover Takaya at Motor City Dubai. Luxury and affordable studio to 2-bedroom apartments with green living, family-friendly amenities, and direct metro access.",
  },
  {
    slug: "sobha-elwood",
    metaTitle: "Sobha Elwood Villas at Dubailand by Sobha Realty",
    metaDescription:
      "Discover Sobha Elwood Villas at Dubai by Sobha Realty. Offering luxury 4-6 bedroom villas with private pools, family-friendly amenities, and payment plans.",
  },
  {
    slug: "seapoint-emaar",
    metaTitle: "Seapoint at Emaar Beachfront by Emaar Properties Dubai",
    metaDescription:
      "Discover Seapoint at Emaar Beachfront Dubai with luxury 1-4 bedroom apartments, private beach access, family-friendly amenities, and investment potential.",
  },
  {
    slug: "palmiera",
    metaTitle: "Palmiera at the Oasis Villas by Emaar Properties in Dubai",
    metaDescription:
      "Discover Palmiera at the Oasis by Emaar in Dubailand. Luxury 4-bedroom villas with private pools, family-friendly amenities, green spaces, and premium investment opportunities.",
  },
  {
    slug: "emaar-marina-cove",
    metaTitle: "Marina Cove Luxury Apartments by Emaar at Dubai Marina",
    metaDescription:
      "Discover Marina Cove by Emaar at Dubai Marina. Luxury 1-4 bedroom waterfront apartments with modern amenities, panoramic views, and investment opportunities.",
  },
  {
    slug: "greenville",
    metaTitle: "Greenville at Emaar South Luxury Townhouses for Sale in Dubai",
    metaDescription:
      "Discover Greenville at Emaar South Dubai, offering luxury 3- and 4-bedroom townhouses, family-friendly amenities, lush green spaces, and investment potential.",
  },
  {
    slug: "golf-green",
    metaTitle: "Golf Greens at Damac Hills by Damac Properties Dubai",
    metaDescription:
      "Explore Golf Greens by Damac Properties at Damac Hills. Luxury 1-2 bedroom apartments and townhouses with golf course views, and flexible payment plans.",
  },
  {
    slug: "damac-Islands",
    metaTitle: "Damac Islands Villas & Townhouses in Dubai by Damac Properties",
    metaDescription:
      "Explore Damac Islands in Dubai, offering luxury 4-7 bedroom villas and townhouses with waterfront living, private beaches, modern amenities, and investment potential.",
  },
  {
    slug: "damac-shoreline",
    metaTitle: "Shoreline Apartments by Damac Properties at Al Marjan Island",
    metaDescription:
      "Discover Shoreline by Damac at Al Marjan Island. Luxury beachfront apartments and townhouses with modern design, and investment opportunities.",
  },
  {
    slug: "address-residence",
    metaTitle: "Address Residences at Al Marjan Island by Emaar Properties",
    metaDescription:
      "Explore Address Residences Al Marjan Island by Emaar. Luxury sea-view apartments, beachfront living, modern amenities, and prime investment opportunities.",
  },
  {
    slug: "trinity-residence",
    metaTitle: "Trinity Apartments by Deca Properties in Arjan Dubai",
    metaDescription:
      "Discover Trinity Arjan Dubai, offering 1, 2, and 3-bedroom luxury apartments with modern designs, family-friendly amenities, and prime investment opportunities.",
  },
  {
    slug: "damac-sun-city",
    metaTitle: "Damac Sun City Townhouses at Cherrywoods Dubailand",
    metaDescription:
      "Discover Damac Sun City at Cherrywoods Dubailand. Luxury 4-5 bedroom townhouses with modern designs, family-friendly amenities and investment potential.",
  },
  {
    slug: "the-acres-estates",
    metaTitle: "The Acres Estates Luxury Villas by Meraas at Dubailand",
    metaDescription:
      "Discover The Acres Estates by Meraas at Dubailand. Premium 5-7 bedroom villas with private pools, eco-friendly designs, family-friendly amenities, and payment plans.",
  },
  {
    slug: "greenridge",
    metaTitle: "Greenridge Townhouses by Emaar at Emaar South Dubai",
    metaDescription:
      "Explore Greenridge by Emaar at Emaar South Dubai. Luxury 3-4 bedroom townhouses with private gardens, family-friendly amenities and investment potential.",
  },
  {
    slug: "saria",
    metaTitle: "Saria Waterfront Apartments by Beyond at Dubai Maritime City",
    metaDescription:
      "Discover Saria by Beyond at Dubai Maritime City. Luxury 1-4 bedroom waterfront apartments with marina views, family-friendly amenities, and flexible payment plans.",
  },
  {
    slug: "franck-muller-vanguard",
    metaTitle: "Franck Muller Vanguard by London Gate at Dubai Marina",
    metaDescription:
      "Explore Franck Muller Vanguard by London Gate at Dubai Marina. Luxury fully furnished 1-3 bedroom apartments with waterfront views and flexible payment plans.",
  },
  {
    slug: "south-garden",
    metaTitle: "South Garden at Wasl Gate Dubai by Wasl Properties",
    metaDescription:
      "Explore South Garden at Wasl Gate Dubai by Wasl Properties. Affordable studios to 3-bedroom apartments, family-friendly amenities, and investment potential.",
  },
  {
    slug: "violet-4",
    metaTitle: "Violet 4 DAMAC hills 2 Townhouses for sale in Dubai",
    metaDescription:
      "Discover Violet 4 at DAMAC Hills 2 Dubai. Affordable 4-bedroom townhouses with modern design, family-friendly amenities, and flexible payment plans",
  },
  {
    slug: "bay-grove-residences",
    metaTitle: "Bay Grove Residences by Nakheel at Dubai Islands",
    metaDescription:
      "Explore Bay Grove Residences by Nakheel at Dubai Islands. Luxury 1-4 bedroom beachfront apartments and penthouses with sea views and modern amenities.",
  },
  {
    slug: "binghatti-skyrise",
    metaTitle: "Binghatti Skyrise Apartments at Business Bay Dubai",
    metaDescription:
      "Explore Binghatti Skyrise at Business Bay Dubai. Luxury studio to 2-bedroom apartments with Burj Khalifa views, family-friendly amenities, and payment plans.",
  },
  {
    slug: "avena",
    metaTitle: "Avena by Emaar Properties at The Valley Dubai",
    metaDescription:
      "Explore Avena by Emaar at The Valley Dubai. Luxury 3-4 bedroom townhouses with private gardens, family-friendly amenities, green spaces, and payment plans.",
  },
  {
    slug: "violet-3",
    metaTitle: "Violet Phase 3 Townhouses at Damac Hills 2",
    metaDescription:
      "Discover Violet Phase 3 at Damac Hills 2 Dubai. Spacious 4-bedroom townhouses with eco-friendly designs, family-friendly amenities and investment potential.",
  },
  {
    slug: "velora",
    metaTitle: "Velora Townhouses by Emaar at The Valley Phase 2 Dubai",
    metaDescription:
      "Discover Velora by Emaar at The Valley Phase 2 Dubai. Affordable 3-4 bedroom townhouses with private gardens, family-friendly amenities, and payment plans.",
  },
  {
    slug: "arabian-hills-estate",
    metaTitle: "Arabian Hills Estate by Deca Properties in Dubai",
    metaDescription:
      "Explore Arabian Hills Estate Dubai by Deca Properties. Luxury villas, spacious plots, and sustainable living in a premium, family-friendly gated community.",
  },
];
// Dynamic metadata function
export async function generateMetadata({ params }) {
  const { propertyId, purpose } = params;

  if (purpose === "off-plan" && isOffPlanTypeListSlug(propertyId)) {
    const m = getOffPlanTypeListingMetadata(propertyId);
    return {
      title: m.title,
      description: m.description,
      alternates: {
        canonical: `https://hsproperty.ae/properties/off-plan/${propertyId}`,
      },
      openGraph: {
        title: m.title,
        description: m.description,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: m.title,
        description: m.description,
      },
    };
  }

  let title = "";
  let description = "";

  if (purpose === "off-plan") {
    // First check your static meta data array
    const metaData = offPlanMetaData.find(
      (property) => property.slug === propertyId
    );

    if (metaData) {
      title = metaData.metaTitle;
      description = metaData.metaDescription;
    } else {
      // Fallback to offPlanListings if not found in metaData
      const propertyData = offPlanListings.find(
        (property) => property.slug === propertyId
      );
      if (propertyData) {
        title =
          propertyData.fullTitle ||
          propertyData.title ||
          "Property Details - H&S Real Estate";
        description = propertyData.description
          ? propertyData.description.replace(/<[^>]*>/g, "").substring(0, 160) +
          "..."
          : "Discover premium properties in Dubai with H&S Real Estate";
      }
    }
  } else {
    // for-sale / for-rent: try to fetch title/description from CMS
    try {
      const cmsData = await getPropertyBySlug(propertyId);
      const property = cmsData?.data || cmsData;
      if (property && (property.meta_title || property.title)) {
        title =
          property.meta_title ||
          property.title ||
          "Property Details - H&S Real Estate";
        description =
          property.meta_description ||
          (property.description
            ? property.description.replace(/<[^>]*>/g, "").substring(0, 160) + "..."
            : "Discover premium properties in Dubai with H&S Real Estate");
      } else {
        title = "Property Details - H&S Real Estate";
        description = "Discover premium properties in Dubai with H&S Real Estate";
      }
    } catch {
      title = "Property Details - H&S Real Estate";
      description = "Discover premium properties in Dubai with H&S Real Estate";
    }
  }

  return {
    title: title || "Property Details - H&S Real Estate",
    description:
      description ||
      "Discover premium properties in Dubai with H&S Real Estate",
    openGraph: {
      title: title || "Property Details - H&S Real Estate",
      description:
        description ||
        "Discover premium properties in Dubai with H&S Real Estate",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title || "Property Details - H&S Real Estate",
      description:
        description ||
        "Discover premium properties in Dubai with H&S Real Estate",
    },
  };
}

export default async function Page({ params }) {
  const { purpose, propertyId } = params;

  // Validate purpose - must be one of the allowed values
  const allowedPurposes = ['for-sale', 'for-rent', 'off-plan'];
  if (!allowedPurposes.includes(purpose)) {
    notFound();
  }

  // Validate propertyId - must not contain @ or email patterns
  if (propertyId.includes('@') || propertyId.includes('/')) {
    notFound();
  }

  // Validate propertyId format - alphanumeric, hyphens, underscores; numeric IDs for Bayut API
  const validPropertyIdPattern = /^[a-z0-9\-_]+$/i;
  if (!validPropertyIdPattern.test(propertyId)) {
    notFound();
  }

  if (purpose === "off-plan" && isOffPlanTypeListSlug(propertyId)) {
    return (
      <PropertiesListingPage purpose="off-plan" offPlanCategorySlug={propertyId} />
    );
  }

  // Off-plan: static data + Bayut — unchanged
  if (purpose === "off-plan") {
    const { data, error } = await getBayutPropertyDataForPage(purpose, propertyId);
    if (!data || error) {
      notFound();
    }
    return (
      <PropertiesDetailsPage
        params={params}
        serverData={data}
        serverError={error}
      />
    );
  }

  // for-sale / for-rent: fetch from CMS by slug
  const cmsResponse = await getPropertyBySlug(propertyId);
  const cmsProperty =
    cmsResponse?.data ||
    (cmsResponse?.success === false ? null : cmsResponse);

  if (!cmsProperty) {
    notFound();
  }

  return (
    <PropertiesDetailsPage
      params={params}
      serverData={null}
      serverError={null}
      cmsPropertyData={cmsProperty}
    />
  );
}
