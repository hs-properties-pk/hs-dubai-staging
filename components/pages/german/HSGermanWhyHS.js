// import Footer from "@/components/Footer";
"use client";
import HomeHeroHeading from "@/components/HomeHeroHeading";
import HSGeramnPopUp from "@/components/HSGeramnPopUp";
import HSGermanBenifitCard from "@/components/HSGermanBenifitCard";
import HSGermanFooter from "@/components/HSGermanFooter";
import Image from "next/image";
import React, { useState } from "react";
import { Fade } from "react-reveal";

function HSGermanWhyHS() {
  const [showPopup, setShowPopup] = useState(false);

  const services = [
    {
      image: "/Benefit/benefit-1.jpg",
      title: "Krypto-Management",
      subTitle:
        "Professionelle Unterstützung bei der Verwaltung Ihrer Krypto-Assets.",
    },
    {
      image: "/Benefit/UAE_Golden_Visa_2f718c69d8.jpg",
      title: "Kostenlose Golden Visa-Dienstleistungen",
      subTitle:
        "Erhalten Sie exklusive Vorteile mit unserem kostenlosen Golden Visa-Service.",
    },
    {
      image: "/Benefit/benefit-3.jpg",
      title: "Kostenlose 5-jährige Immobilienverwaltung",
      subTitle: "Sorgenfreies Immobilienmanagement für fünf Jahre.",
    },
    {
      image: "/Benefit/benefit-4.jpg",
      title: "Gründung von Offshore-Unternehmen",
      subTitle:
        "Nutzen Sie internationale Geschäftsmöglichkeiten mit Leichtigkeit.",
    },
    {
      image: "/Benefit/benefit-5.jpg",
      title: "Zweite Staatsbürgerschaft",
      subTitle:
        "Erweitern Sie Ihre globalen Perspektiven durch Investitionsprogramme für eine zweite Staatsbürgerschaft.",
    },
    {
      image: "/Benefit/benefit-6.jpg",
      title: "Firmengründung",
      subTitle:
        "Unterstützung bei der reibungslosen Registrierung Ihres Unternehmens.",
    },
    {
      image: "/Benefit/benefit-7.jpg",
      title: "Steuerregistrierung in den VAE",
      subTitle:
        "Maximale Compliance und Effizienz für Ihre Steuerangelegenheiten.",
    },
    {
      image: "/Benefit/benefit-8.jpg",
      title: "Bankkontoeröffnung in den VAE",
      subTitle:
        "Vereinfachung Ihrer finanziellen Transaktionen durch professionelle Unterstützung.",
    },
  ];

  return (
    <div>
      <HomeHeroHeading
        isGermanNavbar
        subTitle="Warum H&S"
        setShowPopup={setShowPopup}
        image="/our-story/Image-2.jpg"
        title="Warum H&S?"
      />
      {showPopup && <HSGeramnPopUp setShow={setShowPopup} />}
      <div className="max-w-screen-2xl mx-auto text-center pt-12 md:pt-24 pb-6 md:pb-8 font-custom2 px-4">
        <h2 className="text-3xl md:text-5xl font-medium text-black font-custom">
          Warum H&S?
        </h2>
      </div>
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-6 font-custom2  px-4 pt-4 md:pt-12">
        <div className="w-full md:w-1/2">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/our-story/Image-3.jpg"
            alt="Mortgage calculator"
            className="rounded-lg h-full w-full"
            loading="lazy"
          />
        </div>
        <div className="w-full md:w-1/2 md:px-10 flex flex-col justify-center gap-5">
          <div className="flex flex-col justify-center gap-3">
            <h2 className="text-2xl font-medium  text-black  font-custom">
              Fachwissen in verschiedenen Immobilienklassen
            </h2>
            <p className="text-gray-600 tracking-wider">
              Profitieren Sie von unserer umfassenden Expertise in
              unterschiedlichsten Immobiliensegmenten, sodass wir all Ihre
              Bedürfnisse mit höchster Kompetenz erfüllen können.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <h2 className="text-2xl font-medium  text-black  font-custom">
              Multilinguales Team
            </h2>
            <p className="text-gray-600 tracking-wider">
              Unser starkes und vielseitiges mehrsprachiges Team bietet
              maßgeschneiderte Beratung für unsere internationalen Kunden und
              passt sich perfekt an Ihre individuellen Anforderungen an.
            </p>
          </div>
        </div>
      </div>

      <Fade bottom duration={1500}>
        <div className="max-w-screen-2xl mx-auto pt-8 md:pt-16 pb-6 md:pb-10 px-4">
          <h2 className="text-3xl md:text-5xl font-medium text-black font-custom text-center mt-4">
            Umfassende Dienstleistungen & Leistungen
          </h2>
        </div>
      </Fade>
      <Fade bottom duration={1500}>
        <div className="max-w-screen-2xl mx-auto px-4  font-custom2">
          <p className="text-gray-600  text-base md:text-lg max-w-screen-lg mx-auto tracking-wider text-center">
            Bei einer Partnerschaft mit uns profitieren Sie von einer Vielzahl
            exklusiver Services, darunter:
          </p>
        </div>
      </Fade>
      <div className="max-w-screen-2xl mx-auto  py-8 sm:py-16 px-4 md:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((item, index) => (
            <HSGermanBenifitCard key={index} {...item} />
          ))}
        </div>
      </div>

      <Fade bottom duration={1500}>
        <div className="max-w-screen-2xl mx-auto pt-8 pb-6 md:pb-10 px-4">
          <h2 className="text-3xl md:text-5xl font-medium text-black font-custom text-center mt-4">
            Individuelle Beratung für jede Investition
          </h2>
        </div>
      </Fade>
      <Fade bottom duration={1500}>
        <div className="max-w-screen-2xl mx-auto px-4  font-custom2">
          <p className="text-gray-600  text-base md:text-lg max-w-screen-lg mx-auto tracking-wider text-center">
            Egal, ob Sie eine Familienimmobilie, eine Investitionsimmobilie,
            Gewerberäume oder langfristige & kurzfristige Mietobjekte suchen –
            unser engagiertes Team begleitet Sie bei jedem Schritt des
            Prozesses.
          </p>
        </div>
      </Fade>
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-6 font-custom2  px-4 pt-8 md:pt-12 pb-6 md:pb-16">
        <div className="w-full md:w-1/2 md:pr-16 order-2 md:order-none flex flex-col justify-center gap-5">
          <div className="flex flex-col justify-center gap-3">
            <h2 className="text-2xl font-medium  text-black  font-custom">
              Branchenführende Auszeichnungen
            </h2>
            <p className="text-gray-600 tracking-wider">
              Als das meist ausgezeichnete Unternehmen in der Geschichte der
              VAE-Immobilienbranche steht unser Erfolg für unser unermüdliches
              Engagement für Exzellenz und Kundenzufriedenheit.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <h2 className="text-2xl font-medium  text-black  font-custom">
              Vertrauen & Glaubwürdigkeit
            </h2>
            <p className="text-gray-600 tracking-wider">
              Unsere Anerkennung durch das Dubai Land Department garantiert
              Ihnen vollständige Sicherheit und Zuverlässigkeit bei Ihren
              Immobilieninvestitionen.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/Achievements/Image-4.jpg"
            alt="Mortgage calculator"
            className="rounded-lg h-full w-full"
            loading="lazy"
          />
        </div>
      </div>
      <HSGermanFooter />
    </div>
  );
}

export default HSGermanWhyHS;
