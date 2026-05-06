import Footer from "@/components/Footer";
import Image from "next/image";
import React from "react";
import PremiumPageHero from "../PremiumPageHero";

function WhyChooseHSRealEstatePage() {
  return (
    <div>
      <PremiumPageHero
        image="/Bg-Imgs/why-choose-hs-real-estate-bg.jpg"
        imageAlt="H&S Real Estate — why choose us"
        eyebrow="Dubai’s trusted brokerage"
        titleBefore="Why partner with H&S Real Estate"
        description="Over 25 years in Dubai: personalized service, in-house marketing, and data-driven market insights for buyers, sellers, and investors."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Why H&S", href: null },
        ]}
        stats={[
          { value: "100%", label: "Satisfaction Guaranteed" },
          { value: "$1B+", label: "Record Sales" },
          { value: "100k+", label: "Happy Clients" },
          { value: "30min", label: "Response Time" },
        ]}
      />
      <div className="max-w-screen-2xl mx-auto text-center pt-12 md:pt-24 pb-6 md:pb-8 font-custom2 px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-medium text-black font-custom">
          Your Partner in Dubai Real Estate
        </h2>
        <p className="text-gray-600 mt-8 text-lg max-w-screen-lg mx-auto tracking-wider">
          At H&S Real Estate, we’re driven by a passion to unlock opportunities
          for our clients. With over 25 years of experience in Dubai’s real
          estate market, we’re committed to providing personalized, top-quality
          service for every client, every time.
        </p>
      </div>
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-6 font-custom2  px-4 md:px-6 pt-12">
        <div className="w-full md:w-1/2">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/why-choose-hs-real-estate/Image-1.jpg"
            alt="Mortgage calculator"
            className="rounded-lg h-full w-full"
            loading="lazy"
          />
        </div>
        <div className="w-full md:w-1/2 md:px-10">
          <h2 className="text-2xl font-medium  text-black mb-4 font-custom">
            Comprehensive Services for Every Step
          </h2>
          <p className="text-gray-600 tracking-wider">
            H&S Real Estate offers a full suite of services to cover your real
            estate journey from start to finish equipped with data driven
            insights in the Dubai Real Estate market. From property management
            to mortgage solutions and conveyancing support and beyond, we’re
            here to ensure a seamless experience, whether you&apos;re buying,
            selling, or investing.
          </p>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-6 font-custom2  px-4 md:px-6 pt-12 ">
        <div className="w-full md:w-1/2 md:pr-16 order-2 md:order-none">
          <h2 className="text-2xl font-custom font-medium text-black mb-4">
            Marketing Expertise and Market Insights
          </h2>
          <p className="text-gray-600 tracking-wider">
            With a team of in-house marketing professionals, we provide valuable
            content like area guides, market reports, and insights to help our
            clients stay informed. Our expertise in cutting edge digital
            marketing and data-driven analysis allows us to deliver impactful
            campaigns and reach a wide network of potential buyers and
            investors.
          </p>
        </div>
        <div className="w-full md:w-1/2 ">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/why-choose-hs-real-estate/Image-2.jpg"
            alt="Mortgage calculator"
            className="rounded-lg h-full w-full"
            loading="lazy"
          />
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-6 font-custom2 px-4 md:px-6 pt-12 ">
        <div className="w-full md:w-1/2">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/why-choose-hs-real-estate/Image-3.jpg"
            alt="Mortgage calculator"
            className="rounded-lg h-full w-full"
            loading="lazy"
          />
        </div>
        <div className="w-full md:w-1/2 md:px-10">
          <h2 className="text-2xl font-medium  text-black mb-4 font-custom">
            A Client-Centric Approach
          </h2>
          <p className="text-gray-600 tracking-wider">
            At H&S Real Estate, customer satisfaction is our priority. We
            understand that every journey is unique, and we go the extra mile to
            ensure a smooth and rewarding experience for each client. From
            initial consultation to closing, our dedicated customer service team
            is here to support you every step of the way.
          </p>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-6 font-custom2 px-4 md:px-6 pt-12 ">
        <div className="w-full md:w-1/2 md:pr-16 order-2 md:order-none">
          <h2 className="text-2xl font-custom font-medium text-black mb-4">
            Extensive Network and Resources
          </h2>
          <p className="text-gray-600 tracking-wider">
            Our vast network in Dubai’s real estate ecosystem allows us to offer
            additional services such as professional furnishing, currency
            exchange, and renovation partnerships. If there’s something we don’t
            provide directly, our trusted partners are on hand to meet your
            needs.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/why-choose-hs-real-estate/Image-4.jpg"
            alt="Mortgage calculator"
            className="rounded-lg h-full w-full"
            loading="lazy"
          />
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto text-center pt-12 md:pt-24 pb-6 md:pb-8 font-custom2 px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-medium text-black font-custom">
          Join the H&S Real Estate Community
        </h2>
        <p className="text-gray-600 mt-8 text-lg max-w-screen-lg mx-auto tracking-wider">
          With a reputation built on trust, expertise, and results and a
          successful track record of 25 years as an industry leader, H&S Real
          Estate is proud to have served thousands of satisfied clients. Let us
          be your partner in navigating Dubai’s real estate market and helping
          you achieve your property goals. Our trusted top developer are
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 justify-items-center my-8 md:my-16 gap-8 items-center">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/logos-icons/emaar-logo.svg"
            alt="Partner Logo 1"
            className="w-36"
          />
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/logos-icons/damac-logo.svg"
            alt="Partner Logo 2"
            className="w-52"
            loading="lazy"
          />
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/logos-icons/nakheel-logo.svg"
            alt="Partner Logo 3"
            className="w-36"
            loading="lazy"
          />
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/logos-icons/meras-logo.svg"
            alt="Partner Logo 4"
            className="w-36"
            loading="lazy"
          />
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/logos-icons/dp-logo.svg"
            alt="Partner Logo 5"
            className="w-24 mt-6"
            loading="lazy"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default WhyChooseHSRealEstatePage;
