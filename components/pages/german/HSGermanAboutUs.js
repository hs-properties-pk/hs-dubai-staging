"use client";

import SectionSubHeading from "@/components/SectionSubHeading";
import Visionaries from "@/components/Visionaries";
import Image from "next/image";
import React, { useState } from "react";
import { Fade } from "react-reveal";
import HomeHeroHeading from "@/components/HomeHeroHeading";
import HSGermanFooter from "@/components/HSGermanFooter";
import HSGeramnPopUp from "@/components/HSGeramnPopUp";

function HSGermanAboutUs() {
  //   const achievements = [
  //     {
  //       image: "/awards/OCTA.png",
  //       year: "2022",
  //       details: "No. 1 Sales Award 2022",
  //       name: "OCTA",
  //     },
  //     {
  //       image: "/awards/emaar-1.png",
  //       year: "2022",
  //       details: "Outstanding Performance",
  //       name: "Emaar",
  //     },
  //     {
  //       image: "/awards/emaar-2.png",
  //       year: "2022",
  //       details: "Q1 Top Alliance Award",
  //       name: "Emaar",
  //     },
  //   ];
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className=" overflow-hidden">
      <HomeHeroHeading
        isGermanNavbar
        image="/Bg-Imgs/story-bg.jpeg"
        title="Über uns"
        subTitle="Über uns"
        setShowPopup={setShowPopup}
      />
      {showPopup && <HSGeramnPopUp setShow={setShowPopup} />}
      <div className="px-4 pb-8">
        <Fade bottom duration={1500}>
          <h2 className="text-3xl md:text-6xl  max-w-screen-2xl mx-auto font-custom pt-16 md:pt-24 pb-8">
            Über Uns
          </h2>
        </Fade>
        <div className="bg-white  font-custom2 pb-8">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Fade left duration={1500}>
              <div className="flex flex-col gap-4 justify-center">
                <p className="text-base md:text-lg leading-relaxed text-gray-600  tracking-widest">
                  H&S Real Estate, eine Tochtergesellschaft der Haqsons Group,
                  hat seinen Hauptsitz in Dubai, VAE. Als führendes
                  Investmentunternehmen beschäftigt H&S über 300 Fachkräfte und
                  ist in fünf Ländern vertreten, darunter die VAE, Pakistan,
                  USA, Russland, Japan und Angola.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-gray-600   tracking-widest">
                  Mit einer herausragenden Erfolgsbilanz hat sich H&S als
                  renommierter Name in Dubais Immobilienentwicklung etabliert.
                  Das Unternehmen arbeitet eng mit Entwicklern wie Emaar,
                  Nakheel, Meraas und Damac zusammen und genießt hohes Vertrauen
                  in der Branche.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-gray-600   tracking-widest">
                  Gegründet 2006 unter der Haq-Familie, verdankt H&S seinen
                  Erfolg visionärer Führung und starkem Engagement.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-gray-600   tracking-widest">
                  Als Nr. 1 Immobilienfirma der VAE ist H&S die meist
                  ausgezeichnete der Branche. Anerkannt von Institutionen wie
                  Emaar und dem Dubai Land Department, führt H&S die
                  Verkaufsrankings an. Durch innovative Projekte wurde
                  Luxuswohnen neu definiert, um Kunden unvergleichlichen
                  Mehrwert zu bieten.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-gray-600  tracking-widest">
                  H&S setzt kontinuierlich neue Maßstäbe und treibt die
                  Transformation der Immobilienbranche voran. Unsere
                  Leidenschaft für Innovation und Exzellenz macht uns zu einem
                  vertrauenswürdigen Partner für Ihre Immobilieninvestitionen.
                </p>
              </div>
            </Fade>
            <Fade right duration={1500}>
              <div className="flex justify-center lg:justify-end">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="/Achievements/hs-german-about-2.jpg"
                  alt="H&S Team"
                  className="w-full about-img-shadow rounded-lg object-cover"
                  loading="lazy"
                />
              </div>
            </Fade>
          </div>
        </div>
        <Fade bottom duration={1500}>
          <SectionSubHeading title="Mission & Vision" />
        </Fade>
        <div className="bg-white relative pt-3 md:pt-8 pb-8 md:pb-32 font-custom2">
          <div className="absolute inset-0 flex justify-between items-center z-0">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src="/logos-icons/1.png"
              alt="Floral Left"
              className="w-80 h-auto opacity-90 z-0 "
              loading="lazy"
            />
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src="/logos-icons/2.png"
              alt="Floral Right"
              className="w-80 h-auto opacity-90 z-0"
              loading="lazy"
            />
          </div>

          <div className="relative max-w-screen-2xl mx-auto px-1 sm:px-6 lg:px-8 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-4 md:gap-10 relative z-10">
              <Fade left duration={1500}>
                <div className="bg-[#E0E0E03D] p-4 rounded-lg  col-span-1 row-span-1 border border-[#0000004D]">
                  <p className="text-secondary text-base md:text-lg text-center tracking-wider leading-relaxed">
                    Unsere Mission ist es, uns kontinuierlich
                    weiterzuentwickeln, denn wir erkennen, dass Innovation und
                    gesteigerte Effizienz entscheidend für unser Überleben und
                    unsere Spitzenposition in der Immobilienbranche sind. Mit
                    der Entschlossenheit, Konventionen zu hinterfragen und
                    Veränderungen zu begrüßen, setzen wir neue Branchenstandards
                    und bieten unseren geschätzten Kunden unvergleichlichen
                    Mehrwert. Unser Ziel ist es, ihre Immobilienerfahrungen auf
                    ein außergewöhnliches Niveau zu heben.
                  </p>
                </div>
              </Fade>
              <div></div>
              <div></div>
              <Fade right duration={1500}>
                <div className="bg-[#E0E0E03D] p-4 rounded-lg   col-span-1 row-span-1 border border-[#0000004D]">
                  <p className="text-secondary text-base md:text-lg text-center tracking-wider leading-relaxed">
                    Unsere Vision ist es, die unübertroffene Verkörperung von
                    Exzellenz und Kundenzufriedenheit im Immobiliensektor zu
                    werden. Angetrieben von leidenschaftlicher Innovation und
                    unerschütterlicher Loyalität zu unseren Kernprinzipien wird
                    unser kundenorientierter Ansatz, unser engagiertes Team und
                    unser unermüdliches Streben nach Perfektion das Leben
                    verbessern, sich an verändernde Anforderungen anpassen und
                    nachhaltigen Erfolg vorantreiben.
                  </p>
                </div>
              </Fade>
            </div>
          </div>
        </div>
        <Fade bottom duration={1500}>
          <SectionSubHeading title="Führungsteam" />
        </Fade>
        <Visionaries
          orderLast={false}
          imgSource="/Visionaries/emad.jpeg"
          name="Emad Haq"
          designation="Geschäftsführer (Managing Director), H&S Real Estate"
          details="Mit über 28 Jahren Erfahrung in der Geschäftswelt Dubais hat Emad Haq intensiv die Kultur der Stadt studiert, um die Vision von H&S mit der der Herrscher der VAE in Einklang zu bringen."
          minorDetails=" “Ich verkaufe nur Immobilien an meine Kunden, die ich auch selbst kaufen würde.”"
        />
        <Visionaries
          orderLast={true}
          imgSource="/Visionaries/saad.jpeg"
          name="Saad Haq"
          designation="Konzern-CEO (Group CEO), H&S Real Estate"
          details="Mit langjähriger Erfahrung im internationalen Immobilieninvestment spielt Saad Haq eine entscheidende Rolle beim Wachstum der Gruppe. Sein entwicklungsorientierter Ansatz hat H&S zu neuen Geschäftsmöglichkeiten, Projekten und erfolgreichen Investitionen geführt."
          minorDetails=" “Wir verkaufen nicht nur Immobilien, wir verkaufen Träume.”"
        />
        <Visionaries
          orderLast={false}
          imgSource="/Visionaries/fahad.jpeg"
          name="Fahad Haq"
          designation="CEO, H&S Real Estate"
          details="Als treibende Kraft hinter dem Wachstum von H&S Real Estate in der Region hat Fahad Haq das Unternehmen zur führenden Immobilieninvestmentfirma in den VAE gemacht. Seine Philosophie der Zusammenarbeit statt Konkurrenz prägt alle Ebenen des Unternehmens."
          minorDetails="“H&S stellt die Zufriedenheit der Kunden, Vertraulichkeit und Investitionsschutz über alles.”"
        />
      </div>
      <HSGermanFooter />
    </div>
  );
}

export default HSGermanAboutUs;
