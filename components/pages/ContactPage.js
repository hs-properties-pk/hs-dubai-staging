import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import React from "react";
import HomeHeroHeading from "../HomeHeroHeading";
import PremiumPageHero from "../PremiumPageHero";

export const metadata = {
  title: "Contact H&S Properties - Top Real Estate Developers  in Karachi",
  description:
    "Get in touch with H&S Properties, one of the biggest real estate developers. Our expert agents are ready to assist with all your property investment needs. Contact us today!",
};

function ContactPage() {
  return (
    <div>
      {/* <HomeHeroHeading image="/Bg-Imgs/contact-bg.jpg" title="Contact Us" /> */}
      <PremiumPageHero
        image="/Bg-Imgs/contact-bg.jpg"
        imageAlt="H&S Real Estate contact"
        eyebrow="Top Real Estate Developers in Dubai"
        titleBefore="Let's Find Your Dream Property"
        tagline="Contact us today!"
        description="Our RERA-certified team is ready to guide you from your first question to the moment you hold your keys. Reach us however you prefer."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us", href: null },
        ]}
        stats={[
          { value: "150+", label: "Awards Won" },
          { value: "12k+", label: "Happy Clients" },
          { value: "AED 8B+", label: "Transactions" },
          { value: "30min", label: "Response Time" },
        ]}
      />
      <div className="bg-[#F5F5F7] pt-4 pb-20">
        <SectionHeading
          title="Let’s Get Connected"
          subTitle="Any question or remarks? Just write us a message!"
        />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}

export default ContactPage;
