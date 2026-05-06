"use client";
import Footer from "../Footer";
import HomeHeroHeading from "../HomeHeroHeading";
import SectionSubHeading from "../SectionSubHeading";
import FAQSectionAll from "../FAQSectionAll";
import Image from "next/image";
import React from "react";
import { Fade } from "react-reveal";
import Link from "next/link";
import PremiumPageHero from "../PremiumPageHero";

export default function RealEstateBrokersInDubaiPage() {
  const faqItems = [
    {
      question: "What do real estate brokers in Dubai actually do?",
      answer:
        "Real estate brokers in Dubai guide clients through the entire property journey from understanding requirements and market conditions to shortlisting properties, negotiating prices, and completing legal formalities. At H&S Real Estate, the focus is on advisory and compliance, not just closing deals.",
    },
    {
      question:
        "How are real estate agents and real estate brokers different in Dubai?",
      answer:
        "In Dubai, a real estate agent usually handles property viewings and client coordination, while a broker oversees the full transaction process, compliance, and advisory. H&S Real Estate combines both roles through experienced professionals to ensure clients receive end-to-end support.",
    },
    {
      question:
        "Why should I choose H&S Real Estate over other brokers in Dubai?",
      answer:
        "Clients choose H&S Real Estate because of our transparent process, market expertise, and long-term approach. We focus on understanding client goals first, offering data-driven advice, and ensuring every transaction follows DLD and RERA regulations.",
    },
    {
      question: "Are off plan projects in UAE a good investment?",
      answer:
        "Off plan projects in the UAE can be a strong investment when selected carefully. Factors such as developer track record, payment plans, project timelines, and future demand are critical. H&S Real Estate helps investors assess these factors before making a decision.",
    },
    {
      question: "How does H&S Real Estate help first-time buyers in Dubai?",
      answer:
        "For first-time buyers, Dubai real estate can feel complex. H&S Real Estate simplifies the process by explaining pricing, communities, legal steps, and costs clearly, allowing buyers to make confident and informed decisions.",
    },
    {
      question: "Is Dubai real estate suitable for long-term investors?",
      answer:
        "Yes, Dubai real estate offers long-term potential due to strong infrastructure, population growth, and rental demand. However, success depends on choosing the right location, property type, and entry timing, which is where professional guidance adds value.",
    },
    {
      question: "Does H&S Real Estate assist after the property purchase?",
      answer:
        "Yes. Our relationship doesn't end at purchase. H&S Real Estate supports clients with handover coordination, snagging, leasing guidance, and resale advice, ensuring long-term value from their investment.",
    },
    {
      question: "How can I get started with H&S Real Estate?",
      answer:
        "You can start by speaking with one of our experts to discuss your requirements, budget, and goals. This initial consultation helps determine the right strategy before viewing or shortlisting properties.",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* <HomeHeroHeading
        image="/our-approach/banner.jpeg"
        title="Our Approach"
      /> */}

      <PremiumPageHero
        image="/our-approach/banner.jpeg"
        imageAlt="H&S Real Estate Real Estate Brokers in Dubai"
        eyebrow="All Over Dubai · Expert Guides · 100% satisfaction guaranteed"
        titleBefore="Trusted Real Estate Brokers in Dubai"
        tagline="Your dream property awaits."
        description="H&S Real Estate is your trusted partner in Dubai's property market. Our expert brokers and agents guide you through every step of buying, selling, or renting in Dubai—from initial consultation to handover and beyond."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Real Estate Brokers in Dubai", href: null },
        ]}
        stats={[
          { value: "100%", label: "Satisfaction Guaranteed" },
          { value: "100+", label: "Properties Sold" },
          { value: "12k+", label: "Happy Clients" },
          { value: "30min", label: "Response Time" },
        ]}
      />

      <div className="px-4 md:px-6">
        {/* Introduction Section */}
        <Fade bottom duration={1500}>
          <div className="max-w-screen-2xl mx-auto pt-16 md:pt-24 pb-8 md:pb-12 font-custom2">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-6 font-custom">
              H&S Real Estate – Trusted Real Estate Brokers in Dubai
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-gray-600 tracking-wider mb-6">
              Dubai&apos;s property market is fast-moving and opportunity-driven.
              Making the right decision here is not just about browsing
              listings. it requires market understanding, correct timing, and
              practical guidance. At H&S Real Estate, we guide clients with
              clarity and confidence, whether the goal is end-use or long-term
              investment.
            </p>
          </div>
        </Fade>

        {/* About H&S Real Estate Section */}
        <Fade bottom duration={1500}>
          <SectionSubHeading title="About H&S Real Estate and Our Role in Dubai Real Estate" />
        </Fade>
        <div className="bg-white font-custom2 pb-8 md:pb-16">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-28">
            <Fade left duration={1500}>
              <div className="flex flex-col gap-6 justify-center">
                <p className="text-lg leading-relaxed text-gray-600 tracking-wider">
                  H&S Real Estate&apos;s role goes beyond buying and selling
                  properties. We analyze the <a href="https://hsproperty.ae/" target="_blank" rel="noopener" className="underline font-semibold">Dubai real estate</a> market at a
                  ground level, considering pricing trends, community demand,
                  developer credibility, and legal requirements before advising
                  our clients.
                </p>
                <p className="text-lg leading-relaxed text-gray-600 tracking-wider">
                  In Dubai&apos;s property market:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg text-gray-600 tracking-wider ml-4">
                  <li>Every community behaves differently</li>
                  <li>
                    Off-plan and ready properties carry different risks
                  </li>
                  <li>DLD and RERA compliance cannot be overlooked</li>
                </ul>
                <p className="text-lg leading-relaxed text-gray-600 tracking-wider">
                  That&apos;s why clear advisory and a structured process are
                  essential.
                </p>
              </div>
            </Fade>
            <Fade right duration={1500}>
              <div className="flex justify-center lg:justify-end">
                <Image
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  src="/our-story/Image-1.jpg"
                  alt="H&S Real Estate Team"
                  className="w-full about-img-shadow rounded-lg object-cover"
                  loading="lazy"
                />
              </div>
            </Fade>
          </div>
        </div>

        {/* How H&S Real Estate Brokers Work Section */}
        <Fade bottom duration={1500}>
          <SectionSubHeading title="How H&S Real Estate Brokers Work in Dubai" />
        </Fade>
        <div className="bg-white font-custom2 pb-8 md:pb-16">
          <div className="max-w-screen-2xl mx-auto">
            <Fade bottom duration={1500}>
              <p className="text-xl md:text-2xl font-semibold text-black mb-8 text-center tracking-wider">
                Our working model at H&S is simple: understand the client
                first, then recommend the right solution.
              </p>
            </Fade>

            {/* Understanding Client Needs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-28 mb-12 md:mb-16">
              <Fade left duration={1500}>
                <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                  <Image
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    src="/our-approach/client-brief.jpg"
                    alt="Understanding Client Needs"
                    className="w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                </div>
              </Fade>
              <Fade right duration={1500}>
                <div className="flex flex-col gap-6 justify-center order-1 lg:order-2">
                  <h3 className="text-2xl md:text-3xl font-semibold text-black font-custom">
                    Understanding Client Needs at H&S Real Estate
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-600 tracking-wider">
                    Every client journey starts with clarity:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-lg text-gray-600 tracking-wider ml-4">
                    <li>Budget and payment comfort</li>
                    <li>Purpose (self-use, rental income, or appreciation)</li>
                    <li>Preferred locations and property type</li>
                  </ul>
                  <p className="text-lg leading-relaxed text-gray-600 tracking-wider">
                    Skipping this step often leads to unrealistic expectations
                    and poor decisions.
                  </p>
                </div>
              </Fade>
            </div>

            {/* Market Expertise */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-28 mb-12 md:mb-16">
              <Fade left duration={1500}>
                <div className="flex flex-col gap-6 justify-center">
                  <h3 className="text-2xl md:text-3xl font-semibold text-black font-custom">
                    Market Expertise of H&S Real Estate Agents in Dubai
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-600 tracking-wider">
                    Our advisors don&apos;t just share options. They explain the
                    market:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-lg text-gray-600 tracking-wider ml-4">
                    <li>Area-wise pricing differences</li>
                    <li>Rental yield expectations</li>
                    <li>Short-term vs long-term growth logic</li>
                  </ul>
                  <p className="text-lg leading-relaxed text-gray-600 tracking-wider">
                    This practical approach is why clients trust H&S as reliable
                    real estate agents in Dubai.
                  </p>
                </div>
              </Fade>
              <Fade right duration={1500}>
                <div className="flex justify-center lg:justify-end">
                  <Image
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    src="/our-approach/market.jpg"
                    alt="Market Expertise"
                    className="w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                </div>
              </Fade>
            </div>

            {/* Property Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-28">
              <Fade left duration={1500}>
                <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                  <Image
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    src="/our-approach/Property-Selection-Guided.jpg"
                    alt="Property Selection"
                    className="w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                </div>
              </Fade>
              <Fade right duration={1500}>
                <div className="flex flex-col gap-6 justify-center order-1 lg:order-2">
                  <h3 className="text-2xl md:text-3xl font-semibold text-black font-custom">
                    Property Selection Guided by Top Real Estate Agents in
                    Dubai
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-600 tracking-wider">
                    Dubai offers a vast number of property options. At H&S, our
                    top real estate agents in Dubai:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-lg text-gray-600 tracking-wider ml-4">
                    <li>Shortlist only verified properties</li>
                    <li>Narrow down options based on client goals</li>
                    <li>Eliminate time waste and confusion</li>
                  </ul>
                  <p className="text-lg leading-relaxed text-gray-600 tracking-wider">
                    Whether you are looking for an apartment, a villa, or a
                    townhouse, the approach remains the same: relevant options
                    only.
                  </p>
                </div>
              </Fade>
            </div>
          </div>
        </div>

        {/* Viewings, Negotiation, and Strategic Advice */}
        <Fade bottom duration={1500}>
          <SectionSubHeading title="Viewings, Negotiation, and Strategic Advice" />
        </Fade>
        <div className="bg-white font-custom2 pb-8 md:pb-16">
          <div className="max-w-screen-2xl mx-auto">
            <Fade bottom duration={1500}>
              <p className="text-lg leading-relaxed text-gray-600 tracking-wider mb-6">
                Once properties are shortlisted, the process includes:
              </p>
              <ul className="list-disc list-inside space-y-3 text-lg text-gray-600 tracking-wider ml-4 mb-6">
                <li>Physical or virtual viewings</li>
                <li>Community walkthroughs</li>
                <li>Pricing and negotiation support</li>
              </ul>
              <p className="text-lg leading-relaxed text-gray-600 tracking-wider">
                At this stage, the role of advisory is not just to close a deal,
                but to protect the client&apos;s interest.
              </p>
            </Fade>
          </div>
        </div>

        {/* Legal Process Section */}
        <Fade bottom duration={1500}>
          <SectionSubHeading title="Legal Process, Documentation & Compliance" />
        </Fade>
        <div className="bg-white font-custom2 pb-8 md:pb-16">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-28">
            <Fade left duration={1500}>
              <div className="flex flex-col gap-6 justify-center">
                <p className="text-lg leading-relaxed text-gray-600 tracking-wider">
                  Property transactions in Dubai involve multiple formalities:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg text-gray-600 tracking-wider ml-4">
                  <li>MOU / SPA coordination</li>
                  <li>Trustee office procedures</li>
                  <li>DLD registration</li>
                  <li>Liaison with developers and sellers</li>
                </ul>
                <p className="text-lg leading-relaxed text-gray-600 tracking-wider">
                  H&S ensures every step is transparent and fully compliant,
                  with no shortcuts.
                </p>
              </div>
            </Fade>
            <Fade right duration={1500}>
              <div className="flex justify-center lg:justify-end">
                <Image
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  src="/our-approach/legal.jpg"
                  alt="Legal Process and Compliance"
                  className="w-full rounded-lg object-cover"
                  loading="lazy"
                />
              </div>
            </Fade>
          </div>
        </div>

        {/* Handover, Leasing, and Ongoing Support */}
        <Fade bottom duration={1500}>
          <SectionSubHeading title="Handover, Leasing, and Ongoing Support" />
        </Fade>
        <div className="bg-white font-custom2 pb-8 md:pb-16">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-28">
            {/* Text Content */}
            <Fade left duration={1500}>
              <div className="flex flex-col gap-6 justify-center">
                <p className="text-lg leading-relaxed text-gray-600 tracking-wider">
                  Our relationship doesn&apos;t end at transaction completion:
                </p>
                <ul className="list-disc list-inside space-y-3 text-lg text-gray-600 tracking-wider ml-4 mb-2">
                  <li>Key handover coordination</li>
                  <li>Snagging assistance</li>
                  <li>Leasing or resale guidance</li>
                </ul>
                <p className="text-lg leading-relaxed text-gray-600 tracking-wider">
                  This long-term approach is why H&amp;S is recognized among the best
                  real estate brokers in Dubai.
                </p>
              </div>
            </Fade>

            {/* Image */}
            <Fade right duration={1500}>
              <div className="flex justify-center lg:justify-end">
                <Image
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  src="/our-approach/support.jpg"
                  alt="Handover and Ongoing Support"
                  className="w-full rounded-lg object-cover"
                  loading="lazy"
                />
              </div>
            </Fade>
          </div>
        </div>

        {/* Why Clients Choose H&S Section */}
        <Fade bottom duration={1500}>
          <SectionSubHeading title="Why Clients Choose H&S Real Estate" />
        </Fade>
        <div className="bg-white font-custom2 pb-8 md:pb-16">
          <div className="max-w-screen-2xl mx-auto">
            <Fade bottom duration={1500}>
              <p className="text-lg leading-relaxed text-gray-600 tracking-wider mb-8 text-center">
                Clients choose H&S because:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-[#E0E0E03D] p-6 rounded-lg border border-[#0000004D]">
                  <p className="text-secondary text-lg tracking-wider leading-relaxed">
                    Advice is based on real market conditions
                  </p>
                </div>
                <div className="bg-[#E0E0E03D] p-6 rounded-lg border border-[#0000004D]">
                  <p className="text-secondary text-lg tracking-wider leading-relaxed">
                    Fees and processes are clear and transparent
                  </p>
                </div>
                <div className="bg-[#E0E0E03D] p-6 rounded-lg border border-[#0000004D]">
                  <p className="text-secondary text-lg tracking-wider leading-relaxed">
                    Pressure-based selling is avoided
                  </p>
                </div>
                <div className="bg-[#E0E0E03D] p-6 rounded-lg border border-[#0000004D]">
                  <p className="text-secondary text-lg tracking-wider leading-relaxed">
                    Long-term value is always the priority
                  </p>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-gray-600 tracking-wider mt-8 text-center">
                In a competitive market like Dubai, trust is the strongest
                asset.
              </p>
            </Fade>
          </div>
        </div>

        {/* Experienced Real Estate Agents Section */}
        <Fade bottom duration={1500}>
          <SectionSubHeading title="Experienced Real Estate Agents at H&S Real Estate" />
        </Fade>
        <div className="bg-white font-custom2 pb-8 md:pb-16">
          <div className="max-w-screen-2xl mx-auto">
            <Fade bottom duration={1500}>
              <p className="text-lg leading-relaxed text-gray-600 tracking-wider mb-6">
                The role of a real estate agent is not just to show properties,
                but to help clients make informed decisions. At H&S, our team:
              </p>
              <ul className="list-disc list-inside space-y-3 text-lg text-gray-600 tracking-wider ml-4 mb-6">
                <li>Has strong area-specific expertise</li>
                <li>Understands both investor and end-user needs</li>
                <li>Builds long-term client relationships</li>
              </ul>
              <p className="text-lg leading-relaxed text-gray-600 tracking-wider">
                That&apos;s why working with H&S feels like a consultative
                experience, not a sales pitch.
              </p>
            </Fade>
          </div>
        </div>

        {/* Off Plan Projects Section */}
        <Fade bottom duration={1500}>
          <SectionSubHeading title="Off Plan Projects in UAE – Investment Guidance by H&S" />
        </Fade>
        <div className="bg-white font-custom2 pb-8 md:pb-16">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-28">
            <Fade left duration={1500}>
              <div className="flex justify-center lg:justify-start">
                <Image
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  src="/our-approach/off-plan.jpg"
                  alt="Off Plan Projects"
                  className="w-full rounded-lg object-cover"
                  loading="lazy"
                />
              </div>
            </Fade>
            <Fade right duration={1500}>
              <div className="flex flex-col gap-6 justify-center">
                <p className="text-lg leading-relaxed text-gray-600 tracking-wider">
                  <a href="https://hsproperty.ae/properties/off-plan" target="_blank" rel="noopener" className="underline font-semibold">Off plan projects in UAE</a> offer strong opportunities, but they
                  also carry risks without proper analysis. Our off-plan advisory
                  focuses on:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg text-gray-600 tracking-wider ml-4">
                  <li>Developer track record</li>
                  <li>Payment plan practicality</li>
                  <li>Completion risk</li>
                  <li>Future demand and exit strategy</li>
                </ul>
                <p className="text-lg leading-relaxed text-gray-600 tracking-wider">
                  Off-plan investments succeed when decisions are based on market
                  insight, not brochures.
                </p>
              </div>
            </Fade>
          </div>
        </div>

        {/* H&S Real Estate's Advisory Approach */}
        <Fade bottom duration={1500}>
          <SectionSubHeading title="H&S Real Estate's Advisory Approach" />
        </Fade>
        <div className="bg-white font-custom2 pb-8 md:pb-16">
          <div className="max-w-screen-2xl mx-auto">
            <Fade bottom duration={1500}>
              <p className="text-lg leading-relaxed text-gray-600 tracking-wider mb-6 text-center">
                Our approach is never generic. Each client is treated
                individually:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
                <div className="bg-[#E0E0E03D] p-6 rounded-lg border border-[#0000004D] text-center">
                  <p className="text-secondary text-lg tracking-wider leading-relaxed">
                    The market is assessed realistically
                  </p>
                </div>
                <div className="bg-[#E0E0E03D] p-6 rounded-lg border border-[#0000004D] text-center">
                  <p className="text-secondary text-lg tracking-wider leading-relaxed">
                    Decisions are supported with clarity
                  </p>
                </div>
                <div className="bg-[#E0E0E03D] p-6 rounded-lg border border-[#0000004D] text-center">
                  <p className="text-secondary text-lg tracking-wider leading-relaxed">
                    Clients are guided with confidence, not pressure
                  </p>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-gray-600 tracking-wider text-center">
                This mindset positions H&S not just as a brokerage, but as a
                trusted advisory partner.
              </p>
            </Fade>
          </div>
        </div>

        {/* Connect with H&S Section */}
        <Fade bottom duration={1500}>
          <div className="bg-white font-custom2 pb-16 md:pb-24">
            <div className="max-w-screen-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-semibold text-black mb-6 font-custom">
                Connect with H&S Real Estate Brokers in Dubai
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-600 tracking-wider mb-8 max-w-3xl mx-auto">
                If you are planning to buy, sell, or invest in Dubai&apos;s property
                market and want clear, pressure-free professional guidance,
                connecting with H&S Real Estate brokers in Dubai is the right
                first step.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition rounded-lg text-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </Fade>

        {/* FAQ Section */}
        <FAQSectionAll faqItems={faqItems} />
      </div>

      <Footer />
    </div>
  );
}
