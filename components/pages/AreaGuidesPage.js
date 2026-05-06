"use client";
import React from "react";
import SectionHeading from "@/components/SectionHeading";
import Footer from "@/components/Footer";
import AreaGuideCard from "@/components/AreaGuideCard";
import Fade from "react-reveal/Fade";
import PremiumPageHero from "../PremiumPageHero";

// export const metadata = {
//   title: "Real Estate Blogs by H&S Properties - Expert Insights",
//   description:
//     "Stay updated with the latest real estate news and insights from H&S Properties. Our blogs cover market trends, investment tips, and more. Visit us for expert advice.",
// };

function AreaGuidesPage() {
  const AreaGuide = [
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

  return (
    <div className="overflow-hidden">
      <PremiumPageHero
        image="/Bg-Imgs/area-guides-bg.jpg"
        imageAlt="Dubai, Abu Dhabi, Ajman, Ras Al Khaimah area guides"
        eyebrow="Emirates & districts"
        titleBefore="Area Guides"
        description="Explore where to buy or invest—Dubai, Abu Dhabi, Ajman, and Ras Al Khaimah with local context from H&S advisors."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Area guides", href: null },
        ]}
        stats={[
          { value: "10+", label: "Areas Covered" },
          { value: "100+", label: "Properties Listed" },
          { value: "100k+", label: "Happy Clients" },
          { value: "30+", label: "Years Experience" },
        ]}
      />

      <SectionHeading
        title="Find Your Area Guide"
        subTitle="Stay updated through our latest area guides "
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 md:px-6 max-w-screen-2xl mx-auto pt-6 pb-20 md:pb-28">
        {AreaGuide.map((property, index) =>
          index === 1 || index === 3 ? (
            <Fade right duration={1500} key={index}>
              <AreaGuideCard
                image={property.image}
                title={property.title}
                id={property.id}
              />
            </Fade>
          ) : (
            <Fade left duration={1500} key={index}>
              <AreaGuideCard
                image={property.image}
                title={property.title}
                id={property.id}
              />
            </Fade>
          )
        )}
      </div>
      <Footer />
    </div>
  );
}

export default AreaGuidesPage;
