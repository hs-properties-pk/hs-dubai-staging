"use client";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Fade } from "react-reveal";
import AreaGuideCityCard from "@/components/AreaGuideCityCard";
import HomeHeroHeading from "../HomeHeroHeading";
const posts = [
  { id: "dubai", image: "/area-guides/dubai.jpg", title: "Dubai" },
  {
    id: "abu-dhabi",
    image: "/area-guides/abu-dhabi.jpg",
    title: "Abu Dhabi",
  },
  {
    id: "ajman",
    image: "/area-guides/ajman.jpg",
    title: "Ajman",
  },
  {
    id: "ras-al-khaimah",
    image: "/area-guides/ras-al-khaimah.jpg",
    title: "Ras Al-Khaimah",
  },
];

export default function AreaGuidesCityPage({ params }) {
  const postData = posts.find((item) => item.id === params.areaGuideId);

  const areaGuideData = {
    dubai: [
      {
        id: "the-oasis-by-emaar-area-guide",
        image: "/palmiera_the_oasis/1.webp",
        title: "The Oasis",
      },
      {
        id: "dubai-maritime-city-area-guide",
        image: "/dubai-maritime-city/2.jpg",
        title: "Dubai Maritime City",
      },
      {
        id: "grand-polo-club-resort-by-emaar-area-guide",
        image: "/grand-polo-club-emaar/4.png",
        title: "Grand Polo Club & Resort",
      },
      {
        id: "dubai-creek-harbour-by-emaar-area-guide",
        image: "/dubai-creek-harbour/12.webp",
        title: "Dubai Creek Harbour",
      },
      {
        id: "the-valley-by-emaar-area-guide",
        image: "/farm_garden_valley/1.webp",
        title: "The Valley by Emaar",
      },
      {
        id: "mina-rashid-by-emaar-area-guide",
        image: "/mina-rashid/1.webp",
        title: "Mina Rashid by Emaar",
      },
      {
        id: "dubai-hills-estate-area-guide",
        image: "/Area Guide/dubai-hills-estate-properties-sale-luxury-living.jpg",
        title: "Dubai Hills Estate",
      },
      {
        id: "jumeirah-village-circle",
        image: "/Area Guide/rayon-dzhivisi-dubay-prev.jpg",
        title: "Jumeirah Village Circle",
      },
      {
        id: "dubai-studio-city",
        image: "/Area Guide/Dubai-Studio-City-(1).jpg",
        title: "Dubai Studio City",
      },
      {
        id: "dubai-land",
        image: "/Area Guide/Dubai-Land.jpeg",
        title: "Dubai Land",
      },
      {
        id: "arjan",
        image: "/Area Guide/arjan.jpeg",
        title: "Arjan",
      },
      {
        id: "damac-lagoons",
        image: "/Area Guide/DAMAC_Lagoons.jpg",
        title: "DAMAC Lagoons",
      },
      {
        id: "dubai-creek-harbour",
        image: "/Area Guide/DUBAI_CREEK_HARBOUR.jpg",
        title: "Dubai Creek Harbour",
      },
      {
        id: "al-rashidiya",
        title: "Al Rashidiya",
        image: "/Area Guide/Al Rashidiya.jpg",
      },
    ],

    "abu-dhabi": [
      {
        id: "al-reem-island",
        title: "Al Reem Island",
        image: "/Area Guide/Al Reem Island.jpeg",
      },
      {
        id: "khalifa-city",
        title: "Khalifa City",
        image: "/Area Guide/Khalifa_City.jpg",
      },
      {
        id: "al-rehhan-abu-dhabi",
        title: "Al Rehhan",
        image: "/Area Guide/AL-REHHAN.jpg",
      },
      {
        id: "mohammed-bin-zayed-city",
        title: "Mohammed Bin Zayed City",
        image: "/Area Guide/Mohammed Bin Zayed City.jpg",
      },
      {
        id: "al-jurf-gardens",
        title: "Al Jurf Gardens",
        image: "/Area Guide/Al Jurf Gardens.jpg",
      },
      {
        id: "yas-park-gate",
        title: "Yas Park Gate",
        image: "/Area Guide/Yas_Park_Gate.jpg",
      },
    ],

    ajman: [
      {
        id: "al-bustan",
        title: "Al Bustan",
        image: "/Area Guide/Al Bustan.jpg",
      },
      {
        id: "al-nuaimiya",
        title: "Al Nuaimiya",
        image: "/Area Guide/Al Nuaimiya.jpg",
      },
      {
        id: "al-rawda",
        title: "Al Rawda",
        image: "/Area Guide/Al Rawda.jpg",
      },

      // {
      //   id: "al-zahraa",
      //   title: "Al Zahraa",
      //   image: "/Area Guide/Al Zahraa.jpg",
      // },
      {
        id: "ajman-downtown",
        title: "Ajman Downtown",
        image: "/Area Guide/Ajman Downtown.jpg",
      },
    ],
    "ras-al-khaimah": [
      {
        id: "al-marjan-island",
        title: "Al Marjan Island",
        image: "/Area Guide/Al Marjan Island.webp",
      },
      {
        id: "yasmin-village",
        title: "Yasmin Village",
        image: "/Area Guide/Yasmin Village.jpg",
      },
      {
        id: "dafan-al-nakheel",
        title: "Dafan Al Nakheel",
        image: "/Area Guide/Dafan Al Nakheel.jpg",
      },
      {
        id: "mina-al-arab",
        title: "Mina Al Arab",
        image: "/Area Guide/Mina Al Arab.webp",
      },
      {
        id: "bayti-homes",
        title: "Bayti Homes",
        image: "/Area Guide/Bayti Homes.jpg",
      },
      {
        id: "al-dhait-south",
        title: "Al Dhait South",
        image: "/Area Guide/Al Dhait South.jpg",
      },
    ],
  };

  if (!postData) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-16 text-center">
        <h1 className="text-3xl md:text-6xl font-light mb-4">Area Guide Not Found</h1>
        <p className="text-lg mb-8">The area guide you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/area-guides" className="px-6 py-3 bg-black text-white hover:bg-gray-800 duration-300 rounded-lg tracking-wider">
          Back to Area Guides
        </Link>
        <Footer />
      </div>
    );
  }

  if (!areaGuideData[params.areaGuideId]) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-16 text-center">
        <h1 className="text-3xl md:text-6xl font-light mb-4">Area Guide Not Found</h1>
        <p className="text-lg mb-8">The area guide data you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/area-guides" className="px-6 py-3 bg-black text-white hover:bg-gray-800 duration-300 rounded-lg tracking-wider">
          Back to Area Guides
        </Link>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <HomeHeroHeading image={postData.image} />

      <div className="max-w-screen-2xl mx-auto  px-4 md:px-6 font-custom2">
        <Fade bottom duration={1500}>
          <div className=" py-10 md:py-14 font-custom text-black">
            <h1 className="text-3xl md:text-6xl font-light">
              {postData.title}
            </h1>
          </div>
        </Fade>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-6 max-w-screen-2xl mx-auto  pb-20 md:pb-28">
        {areaGuideData[params.areaGuideId].map((property, index) => (
          <Fade right duration={1000 + index * 200} key={index}>
            <AreaGuideCityCard
              image={property.image}
              title={property.title}
              previousId={params.areaGuideId}
              id={property.id}
            />
          </Fade>
        ))}
      </div>
      <Footer />
    </div>
  );
}
