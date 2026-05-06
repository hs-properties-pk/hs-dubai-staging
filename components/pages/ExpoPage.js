"use client";

import Image from "next/image";
import { Fade } from "react-reveal";
import Contact from "../Contact";
import { FaBuilding, FaHandshake, FaUserTie, FaTags } from "react-icons/fa";
import Link from "next/link";

export default function ExpoPage() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <main className="bg-gradient-to-b from-gray-100 to-white text-secondary min-h-screen font-custom3">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center min-h-screen flex flex-col justify-center items-center text-center px-6"
          style={{ backgroundImage: "url('/expo-london.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <Fade>
            <div className="relative z-10 max-w-screen-2xl text-white">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 font-custom">
                The Annual Dubai Property{" "}
                <span className="text-primary">Sale</span>
              </h1>
              <Link href="/" className="flex justify-center items-center mb-2">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="/logos-icons/H&S-RealEstate-Logo-White.png"
                  alt="logo"
                  className="object-contain w-20 md:w-28"
                  loading="lazy"
                />
              </Link>
              <p className="text-lg md:text-xl mb-4 font-custom3">
                Coming to{" "}
                <span className="font-semibold text-primary">London</span>
              </p>
              <p className="text-md md:text-lg font-custom3">
                11<sup>th</sup> & 12<sup>th</sup> July 2025 &bull; 10am - 8pm
                <br />
                Crystal Palace Suite, Hilton Park Lane, London, UK
              </p>
              <button
                onClick={() => scrollToSection("register")}
                className="mt-6 px-6 py-3 bg-primary text-white text-lg rounded-full font-semibold shadow-md hover:bg-[#bb944b] transition font-custom2"
              >
                Register Now
              </button>
            </div>
          </Fade>
        </section>
        {/* Highlights */}
        <section className="py-16 px-4 md:px-6 bg-white text-center">
          <Fade bottom>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-custom text-black">
              Avail Exclusive Investment Opportunities
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-10 font-custom3">
              Meet with Dubai&apos;s top real estate developers and discover
              premier properties with unmatched incentives and expert guidance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 justify-items-center mt-8 md:mt-16 gap-8 items-center">
              {[
                "nashama-logo.svg",
                "meras-logo.svg",
                "nakheel-logo.svg",
                "emaar-logo.svg",
                "damac-logo.svg",
                "shoba-logo.svg",
                "Majid Al Futtaim.svg",
              ].map((logo, i) => (
                <Image
                  key={i}
                  width={0}
                  height={0}
                  sizes="100vw"
                  src={`/logos-icons/${logo}`}
                  alt={`Partner Logo ${i + 1}`}
                  className={`w-${i === 4 ? "52" : i === 5 ? "24" : "36"}`}
                  loading="lazy"
                />
              ))}
            </div>
          </Fade>
        </section>
        {/* Why Attend */}
        <section className="py-16 px-4 md:px-6 bg-gradient-to-r from-primary/10 to-white">
          <Fade bottom>
            <div className="max-w-screen-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-custom text-black">
                Why Attend?
              </h2>
              <p className="mb-6 font-custom3 text-lg">
                Explore Dubai’s most prestigious real estate offerings, enjoy
                exclusive launch deals, and network with developers directly.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white shadow-lg p-6 rounded-xl text-center hover:shadow-xl transition">
                  <FaBuilding className="text-primary text-4xl mb-4 mx-auto" />
                  <h3 className="font-bold text-lg font-custom2 mb-2">
                    Top Developers
                  </h3>
                  <p className="text-sm font-custom3">
                    Meet and network with Dubai’s most reputable real estate
                    developers.
                  </p>
                </div>
                <div className="bg-white shadow-lg p-6 rounded-xl text-center hover:shadow-xl transition">
                  <FaHandshake className="text-primary text-4xl mb-4 mx-auto" />
                  <h3 className="font-bold text-lg font-custom2 mb-2">
                    Instant Deals
                  </h3>
                  <p className="text-sm font-custom3">
                    Get access to on-the-spot investment opportunities with
                    special terms.
                  </p>
                </div>
                <div className="bg-white shadow-lg p-6 rounded-xl text-center hover:shadow-xl transition">
                  <FaUserTie className="text-primary text-4xl mb-4 mx-auto" />
                  <h3 className="font-bold text-lg font-custom2 mb-2">
                    1:1 Consultations
                  </h3>
                  <p className="text-sm font-custom3">
                    Receive personalized investment advice tailored to your
                    goals.
                  </p>
                </div>
                <div className="bg-white shadow-lg p-6 rounded-xl text-center hover:shadow-xl transition">
                  <FaTags className="text-primary text-4xl mb-4 mx-auto" />
                  <h3 className="font-bold text-lg font-custom2 mb-2">
                    Exclusive Offers
                  </h3>
                  <p className="text-sm font-custom3">
                    Take advantage of limited-time offers available only to
                    attendees.
                  </p>
                </div>
              </div>
            </div>
          </Fade>
        </section>
        {/* Registration */}
        <section id="register" className="py-10 md:py-16  bg-white">
          <Fade bottom>
            <div className="max-w-screen-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 md:mb-4 text-center font-custom text-black">
                Register Now
              </h2>
              <Contact />
            </div>
          </Fade>
        </section>
        {/* Footer */}
        <footer className="py-6 bg-gray-800 text-white text-center text-sm font-custom3">
          &copy; 2025 H&S Real Estate. All Rights Reserved.
        </footer>
      </main>
    </>
  );
}
