"use client";
import Footer from "@/components/Footer";
import PageLinks from "@/components/PageLinks";
import ServiceCard from "@/components/ServiceCard";
import React from "react";
import { Fade } from "react-reveal";
import BelowHiddenText from "../BelowHiddenText";
import PremiumPageHero from "../PremiumPageHero";
import Link from "next/link";

function ServicesPage() {
  const services = [
    {
      image: "/services/services-1.png",
      title: "Registration Of A Company In The UAE",
    },
    {
      image: "/services/services-2.png",
      title: "Open A Bank Account In The UAE",
    },
    {
      image: "/services/services-3.png",
      title: "Open An Offshore Company In The UAE",
    },
    {
      image: "/services/services-4.png",
      title: "Visa Support In The UAE",
    },
    {
      image: "/services/services-5.png",
      title: "Tax Residency In The UAE",
    },
    {
      image: "/services/services-6.png",
      title: "The Second Citizenship",
    },
    {
      image: "/services/services-7.png",
      title: "Additional Services Long-Term Rent Short-Term Rent",
    },
    {
      image: "/services/services-8.jpg",
      title: "Golden Visa Services",
    },
  ];
  const ServicesPageTextSection = [
    {
      question:
        "Comprehensive Real Estate and Business Services by H&S Real Estate",
      answer: `
    <p>At H&S Real Estate, we are dedicated to offering seamless and professional services to individuals and businesses in the UAE. Whether you’re looking to establish your company, secure a residency, or invest in prime properties, our expertise ensures a smooth journey from start to finish. Below is a breakdown of our key services tailored to meet your needs.</p>
    
    <h2>1. Registration of a Company in the UAE</h2>
    <p>Starting a business in the UAE has never been easier with H&S Real Estate. We assist entrepreneurs and organizations in registering their companies efficiently.</p>
    <h3>Why Choose H&S for Company Registration?</h3>
    <ul>
      <li>Expert guidance through every step of the process.</li>
      <li>Assistance in choosing the best jurisdiction (mainland, free zone, or offshore).</li>
      <li>Documentation, approvals, and licensing support.</li>
    </ul>
    <h3>Benefits of Setting Up in the UAE:</h3>
    <ul>
      <li>Tax-free income and profit repatriation.</li>
      <li>A thriving economy ideal for startups and large businesses.</li>
      <li>Access to global markets and a favorable business climate.</li>
    </ul>
    
    <h2>2. Open a Bank Account in the UAE</h2>
    <p>Opening a bank account in the UAE is essential for smooth financial operations. Our team ensures hassle-free account setup for both individuals and corporations.</p>
    <h3>What We Provide:</h3>
    <ul>
      <li>Assistance in documentation and application.</li>
      <li>Recommendations for choosing the best banking services in Dubai.</li>
      <li>Swift processing with minimal delays.</li>
    </ul>
    <p>With our support, you’ll have access to the leading banks in the UAE, known for their excellent customer service and financial benefits.</p>
    
    <h2>3. Offshore Company Setup in the UAE</h2>
    <p>The UAE is a global hub for offshore company formation, offering tax exemptions and secure banking. H&S Real Estate simplifies the process so you can focus on growing your business.</p>
    <h3>Benefits of Offshore Companies in the UAE:</h3>
    <ul>
      <li>Zero corporate tax.</li>
      <li>100% foreign ownership.</li>
      <li>Confidentiality of shareholder details.</li>
    </ul>
    <p>Our team will guide you in selecting the ideal offshore location, such as JAFZA or Ras Al Khaimah, to maximize your business potential.</p>
    
    <h2>4. Visa Support in the UAE</h2>
    <p>Navigating the UAE’s visa process can be challenging, but H&S Real Estate has you covered. Whether it’s a work visa, residency visa, or dependent visa, we ensure a smooth and stress-free experience.</p>
    <h3>Our Visa Services Include:</h3>
    <ul>
      <li>Assistance in visa applications and renewals.</li>
      <li>Document preparation and government liaison.</li>
      <li>Specialized support for Golden Visa applications.</li>
    </ul>
    <h3>Golden Visa Program:</h3>
    <p>We also assist high-net-worth individuals and professionals in securing the prestigious UAE Golden Visa, offering long-term residency benefits.</p>
    
    <h2>5. Tax Residency in the UAE</h2>
    <p>Obtain a UAE Tax Residency Certificate with the help of H&S Real Estate. This certificate is essential for individuals and businesses looking to benefit from the UAE’s tax-free environment.</p>
    <h3>Why Apply for a UAE Tax Residency Certificate?</h3>
    <ul>
      <li>Access to tax treaties with over 100 countries.</li>
      <li>Avoidance of double taxation.</li>
      <li>Enhanced financial freedom and global business opportunities.</li>
    </ul>
    <p>Our team ensures you meet all eligibility requirements and prepares the necessary documentation for a smooth application process.</p>
    
    <h2>6. Second Citizenship Assistance</h2>
    <p>Looking for a second passport? H&S Real Estate provides tailored solutions for obtaining dual citizenship through investment.</p>
    <h3>Key Benefits of Second Citizenship:</h3>
    <ul>
      <li>Visa-free travel to multiple countries.</li>
      <li>Secure your family’s future.</li>
      <li>Access to better education and healthcare facilities.</li>
    </ul>
    <p>We partner with trusted programs globally, such as the Caribbean Citizenship by Investment, to provide you with the best opportunities.</p>
    
    <h2>7. Additional Property Services: Long-Term and Short-Term Rentals</h2>
    <p>As part of our real estate expertise, H&S Real Estate offers premium rental solutions tailored to your lifestyle.</p>
    <h3>Property Rental Options:</h3>
    <ul>
      <li>Long-Term Rentals: Ideal for residents and expatriates settling in Dubai.</li>
      <li>Short-Term Rentals: Perfect for tourists and business travelers seeking luxury stays.</li>
    </ul>
    <p>We connect you with premium properties, ensuring access to top-tier locations in Dubai with competitive rental rates.</p>
    
    <h2>8. Golden Visa Services</h2>
    <p>The UAE Golden Visa offers a long-term residency solution for investors, professionals, and entrepreneurs. H&S Real Estate ensures your application process is straightforward and efficient.</p>
    <h3>Benefits of the UAE Golden Visa:</h3>
    <ul>
      <li>10-year renewable residency.</li>
      <li>The ability to sponsor family members.</li>
      <li>Freedom to live, work, or study in the UAE.</li>
    </ul>
    <p>With our team’s expertise, securing a Golden Visa has never been easier.</p>
    
    <h2>Why Choose H&S Real Estate for Your Needs?</h2>
    <p>H&S Real Estate is a trusted partner for all your real estate and business needs in the UAE. We combine years of experience, industry knowledge, and a client-centric approach to deliver unmatched services.</p>
    <h3>Key Reasons to Work With Us:</h3>
    <ul>
      <li>Expertise: Decades of experience in the UAE’s real estate and business landscape.</li>
      <li>Comprehensive Services: From property investments to legal formalities, we cover it all.</li>
      <li>Client Satisfaction: A proven track record of delivering results for our clients.</li>
    </ul>
    
    <h2>Experience Luxury Living and Seamless Business Operations</h2>
    <p>Whether you're looking to invest in Dubai's thriving real estate market, start a business, or secure long-term residency, H&S Real Estate is your trusted partner.</p>
    <h3>Contact Us Today!</h3>
    <p>Reach out to us for personalized solutions that cater to your unique requirements. Let’s work together to achieve your goals in the UAE.</p>
  `,
    },
  ];

  return (
    <div className=" overflow-hidden">
      <PremiumPageHero
        image="/Bg-Imgs/services-bg.jpg"
        imageAlt="Real estate and business services — H&S"
        eyebrow="Dubai & UAE support"
        titleBefore="Real Estate and Business Services"
        description="From company setup and Golden Visa to banking and long-term rent—seamless services for people and businesses in the UAE."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: null },
        ]}
        stats={[
          { value: "100%", label: "Accuracy Guaranteed" },
          { value: "500+", label: "Projects" },
          { value: "100k+", label: "Happy Clients" },
          { value: "30+", label: "Years Experience" },
        ]}
      />
      <Fade bottom duration={1500}>
        <div className="max-w-screen-2xl mx-auto pt-8 md:pt-16 pb-6 md:pb-10 px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-medium text-black font-custom text-center mt-4">
            How can we help?
          </h2>
        </div>
      </Fade>
      <Fade bottom duration={1500}>
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 font-custom2">
          <div className=" flex flex-col gap-4">
            <p className="text-gray-600 text-lg tracking-wider">
              Get Accurate Services with H&S Real Estate.In Dubai’s fast-moving
              real estate market, knowing the true value of your property is
              essential. At H&S Real Estate, we specialize in delivering precise
              and reliable{" "}
              <Link
                className="font-semibold"
                href="https://hsproperty.ae/property-valuation"
              >
                property valuation Dubai
              </Link>{" "}
              services backed by in-depth market analysis and expert insight.
              Whether you require an apartment valuation, villa valuation, or an
              assessment for an off plan property, our certified valuers provide
              accurate data to help you make informed selling, renting, or
              investment decisions.
            </p>
            <p className="text-gray-600  text-lg tracking-wider">
              Our advanced tools and proven methodologies have made us one of
              the leading property valuation companies in the UAE, trusted by
              homeowners and investors who demand clarity, accuracy, and
              results.
            </p>
          </div>
        </div>
      </Fade>
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6  py-8 sm:py-12 md:py-16">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((item, index) => (
            <ServiceCard key={index} {...item} />
          ))}
        </div>
      </div>
      <PageLinks />
      <BelowHiddenText textSection={ServicesPageTextSection} />
      <Footer />
    </div>
  );
}

export default ServicesPage;
