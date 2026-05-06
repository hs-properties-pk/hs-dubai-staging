// import Footer from "@/components/Footer";
"use client";
import HomeHeroHeading from "@/components/HomeHeroHeading";
import Image from "next/image";
import React, { useState } from "react";
import HSGermanFooter from "@/components/HSGermanFooter";
import HSGeramnPopUp from "@/components/HSGeramnPopUp";

export const metadata = {
  title: "Contact H&S Properties - Top Real Estate Developers  in Karachi",
  description:
    "Get in touch with H&S Properties, one of the biggest real estate developers. Our expert agents are ready to assist with all your property investment needs. Contact us today!",
};

function HSGermanWhyDubai() {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div>
      <HomeHeroHeading
        isGermanNavbar
        image="/hs-german-why-dubai.jpg"
        title="Warum Dubai?"
        subTitle="Warum Dubai"
        setShowPopup={setShowPopup}
      />
      {showPopup && <HSGeramnPopUp setShow={setShowPopup} />}
      <div className="max-w-screen-2xl mx-auto md:text-center pt-12 md:pt-24 pb-6 md:pb-8 font-custom2 px-4">
        <h2 className="text-3xl md:text-5xl font-medium text-black font-custom">
          Warum Dubai? Weil Immobilien hier die zukünftige Infrastruktur sind!
        </h2>
        <p className="text-gray-600 mt-8 text-base md:text-lg  tracking-wider">
          Dubai ist eine Stadt der Zukunft – aber keine kurzfristige
          Erscheinung. Der beeindruckende Immobilienboom, den wir derzeit
          erleben, ist kein Zufall oder eine Spekulationsblase, sondern das
          Ergebnis einer langfristigen, strategischen Planung. Immobilien in
          Dubai sind nicht nur Wohnraum, sondern ein fundamentaler Bestandteil
          der städtischen Infrastruktur. Die rasante wirtschaftliche
          Entwicklung, der massive Zuzug internationaler Fachkräfte und
          Unternehmer sowie visionäre Regierungspläne machen deutlich, dass das
          Wachstum Dubais gezielt gesteuert und nachhaltig untermauert wird.
          Zwei der wichtigsten Initiativen, die diese Entwicklung prägen, sind
          der Dubai Economic Agenda D33 und der Dubai Urban Master Plan 2040.
        </p>
      </div>
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-6 font-custom2  px-4  md:pt-12">
        <div className="w-full md:w-1/2">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/hs-german-d33.jpg"
            alt="Mortgage calculator"
            className="rounded-lg h-full w-full"
            loading="lazy"
          />
        </div>
        <div className="w-full md:w-1/2 md:px-4">
          <h2 className="text-2xl font-medium  text-black mb-4 font-custom">
            Dubai Economic Agenda D33 – Der Plan für nachhaltiges
            Wirtschaftswachstum
          </h2>
          <p className="text-gray-600 text-base md:text-lg tracking-wider mb-4 ">
            Mit dem ambitionierten D33-Plan verfolgt Dubai das Ziel, seine
            Wirtschaft bis 2033 zu verdoppeln und sich als eine der drei global
            führenden Städte zu etablieren. Die Agenda sieht vor, dass das BIP
            Dubais auf 32 Billionen AED anwächst und jährlich Zehntausende
            hochqualifizierte Talente nach Dubai kommen. Dieser wirtschaftliche
            Erfolg kann nur durch eine gezielte Expansion der Infrastruktur
            erreicht werden – dazu gehören Geschäftsviertel, Logistikzentren,
            Bildungs- und Gesundheitseinrichtungen sowie Wohnraum für die stetig
            wachsende Bevölkerung.
          </p>
          <p className="text-gray-600 text-base md:text-lg tracking-wider">
            Die steigende Nachfrage nach Immobilien wird durch diese gezielte
            Wirtschaftsstrategie untermauert. Neue Unternehmen siedeln sich an,
            internationale Konzerne verlegen ihre Hauptsitze nach Dubai, und
            hochqualifizierte Fachkräfte aus aller Welt suchen langfristigen
            Wohnraum. Das bedeutet, dass Immobilien nicht nur gebaut, sondern
            aktiv von den neuen Einwohnern und Unternehmen benötigt werden. Der
            D33-Plan ist bereits in vollem Gange – und mit ihm wächst auch der
            Immobiliensektor nachhaltig.
          </p>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-6 font-custom2  px-4 pt-6 md:pt-12 ">
        <div className="w-full md:w-1/2 md:pr-6 order-2 md:order-none">
          <h2 className="text-2xl font-custom font-medium text-black mb-4">
            Dubai Urban Master Plan 2040 – Die Stadtentwicklung der Zukunft
          </h2>
          <p className="text-gray-600 text-base md:text-lg tracking-wider mb-4">
            Während der D33-Plan die wirtschaftliche Expansion vorantreibt,
            stellt der Dubai Urban Master Plan 2040 sicher, dass dieses Wachstum
            strukturiert und nachhaltig geschieht. Dieser langfristige
            Entwicklungsplan ist darauf ausgelegt, Dubai in eine der
            lebenswertesten Städte der Welt zu verwandeln. Bis 2040 wird sich
            die Bevölkerung auf rund 7,8 Millionen Menschen erhöhen, und die
            Stadt bereitet sich aktiv auf diesen Zustrom vor.
          </p>
          <p className="text-gray-600 text-base md:text-lg tracking-wider mb-4">
            Der Plan sieht eine optimale Verteilung von Wohn-, Geschäfts-,
            Freizeit- und Naturflächen vor, wobei 60 % der Gesamtfläche Dubais
            für Grün- und Naturflächen reserviert sind. Neue Stadtviertel
            entstehen, bestehende Gebiete werden weiterentwickelt, und die
            Infrastruktur wird kontinuierlich ausgebaut. Mit dem Ausbau neuer
            Verkehrsverbindungen, nachhaltiger Energieprojekte und modernster
            Wohnanlagen wird sichergestellt, dass das rapide Wachstum der Stadt
            gut organisiert bleibt.
          </p>
          <p className="text-gray-600 text-base md:text-lg tracking-wider">
            Die fortlaufenden Bauprojekte sind somit keine Überproduktion oder
            Spekulationsobjekte, sondern ein essenzieller Bestandteil der
            Stadtentwicklung. Immobilien sind in Dubai nicht nur ein Investment,
            sondern ein fundamentaler Baustein des urbanen Wandels – Real Estate
            ist Infrastruktur.
          </p>
        </div>
        <div className="w-full md:w-1/2 ">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/Dubai-2040-Urban-Master-Plan.jpg"
            alt="Mortgage calculator"
            className="rounded-lg h-full w-full"
            loading="lazy"
          />
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto  pt-12 md:pt-24 pb-6 md:pb-8 font-custom2 px-4">
        <h2 className="text-3xl md:text-5xl font-medium text-black font-custom">
          Fazit
        </h2>
        <p className="text-gray-600 mt-8 text-base md:text-lg  tracking-wider">
          Die Entwicklung Dubais folgt einem klaren Plan, der bereits seit
          Jahren umgesetzt wird und auf Jahrzehnte hinaus ausgerichtet ist. Das
          Wachstum ist kein Zufallsprodukt, sondern das Ergebnis intelligenter
          Planung und strategischer Weitsicht. Wer heute in Dubai investiert,
          setzt nicht auf eine kurzfristige Marktbewegung, sondern auf eine
          Stadt, die sich gezielt zur globalen Metropole der Zukunft entwickelt.
          Der Immobilienmarkt ist dabei nicht nur ein Teil des Fortschritts – er
          ist dessen Grundlage.
        </p>
      </div>
      <HSGermanFooter />
    </div>
  );
}

export default HSGermanWhyDubai;
