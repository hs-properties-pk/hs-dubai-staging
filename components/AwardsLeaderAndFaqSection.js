"use client";

import { motion } from "framer-motion";
import LandingFaqs from "@/components/LandingFaqs";

export const awardsLeaderIntro = {
  titleLine1: "What Makes H&S Real Estate the Leader in",
  titleAccent: "Gulf Real Estate Awards?",
  paragraphs: [
    "In Dubai's competitive property market, broker awards are earned through verified transaction volumes — not nominations. H&S Real Estate has maintained award-winning status in every year from 2016 through 2025, a 10-year consecutive streak unmatched by any other independent brokerage in the UAE.",
    "The Emaar Annual Broker Awards — held at the Armani Hotel Dubai — recognizes only the Top 20 brokerages from hundreds of registered agencies across the UAE. H&S has appeared in this ranking consistently, earning multiple quarterly Emaar broker awards alongside the annual recognition every year since 2017.",
    "The Dubai Land Department's recognition of H&S as No.1 Sales Company in UAE (2025) and Best Sales Service in Dubai (2025) are government-verified credentials — the highest trust signal available in UAE real estate. Combined with the Meraas Black Onyx Platinum Award and Nakheel's No.1 Company designation, H&S holds the most comprehensive gulf real estate award portfolio of any brokerage in Dubai today.",
    "With $1 billion+ in record-setting sales and a presence across the UAE, Pakistan, Japan and Angola, H&S Real Estate's awards reflect real performance across every market cycle since 2016.",
  ],
};

export const awardsPageFaqs = [
  {
    q: "How many awards does H&S Real Estate have?",
    a: "H&S Real Estate has received 150+ verified industry awards between 2016 and 2025, making it the most awarded real estate brokerage in UAE history. These include awards from Emaar, Dubai Land Department, Nakheel, Meraas, DAMAC, Tilal Al Ghaf, Aldar, Binghatti, OCTA and Dubai Properties.",
  },
  {
    q: "Has H&S Real Estate won the Emaar Annual Broker Award?",
    a: "Yes. H&S Real Estate has won the Emaar Annual Broker Award multiple times — in 2020, 2022, 2023, 2024 and 2025. In addition, H&S has earned 20+ quarterly Emaar broker awards, placing consistently within Emaar's Top 20 brokerages every year since 2017.",
  },
  {
    q: "What gulf real estate awards has H&S Real Estate received?",
    a: "H&S Real Estate has won major gulf real estate awards from 15+ recognized bodies including the Dubai Land Department, Emaar Properties, Nakheel, Meraas, DAMAC, Tilal Al Ghaf, Aldar, Binghatti, OCTA and Bayut — spanning annual, quarterly and special performance categories.",
  },
  {
    q: "Is H&S Real Estate the No.1 broker in UAE?",
    a: "H&S Real Estate was officially named No.1 Sales Company in UAE by the Dubai Land Department in 2025 and No.1 Company in UAE by Nakheel in 2025. With 150+ awards from 15+ major developers, H&S holds the strongest verified track record of any brokerage operating in Dubai.",
  },
  {
    q: "What is the Meraas Black Onyx Award?",
    a: "The Meraas Black Onyx Award is the highest performance recognition given by Meraas — one of Dubai's most prestigious luxury developers. H&S Real Estate has won this award for three consecutive years (2023, 2024 and 2025), with the Black Onyx Platinum tier achieved in 2025.",
  },
  {
    q: "Which real estate agency has won the most broker awards in Dubai?",
    a: "H&S Real Estate has won the most broker awards in Dubai with 150+ verified recognitions from 2016 to 2025. The company has maintained award-winning status for 10 consecutive years — a record unmatched by any other independent brokerage in the UAE market.",
  },
];


export default function AwardsLeaderAndFaqSection() {
  return (
    <section className="border-t border-neutral-200/80 bg-black font-custom2">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-10 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[2.65rem] font-bold leading-[1.15] font-custom tracking-tight text-white">
            <span className="block">{awardsLeaderIntro.titleLine1}</span>
            <span className="block mt-1">{awardsLeaderIntro.titleAccent}</span>
          </h2>
        </motion.div>

        <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-x-10 md:gap-x-14 gap-y-6 text-neutral-200 font-custom3 text-base md:text-[1.05rem] leading-relaxed">
          {awardsLeaderIntro.paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      </div>

      <LandingFaqs
        tag="div"
        variant="light"
        sectionLabel="Frequently asked"
        heading="Award FAQs"
        faqs={awardsPageFaqs}
        className="!bg-white !border-neutral-200/80 !pt-16 md:!pt-20 !pb-24 md:!pb-28"
      />
    </section>
  );
}
