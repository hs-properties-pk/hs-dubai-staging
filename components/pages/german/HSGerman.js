"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Fade } from "react-reveal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BlogCardOriginal from "../../BlogCardOriginal";
import { offPlanListings } from "@/data/german-off-plan-data";
import PropertyCard from "../../PropertyCard";
import HSGeramnPopUp from "../../HSGeramnPopUp";
import HSAchievementCard from "../../HSAchievementCard";
import HSGermanContact from "../../HSGermanContact";
import HSGermanFooter from "../../HSGermanFooter";
import { FaChevronLeft, FaChevronRight, FaWhatsapp } from "react-icons/fa6";
import HSGermanNavbar from "@/components/HSGermanNavbar";
import { awardsData } from "@/data/awards-data";
import Banner from "@/components/Banner";
import BannerGerman from "@/components/BannerGerman";
const slides = [
  {
    id: 1,
    image: "/Achievements/no-1.jpg",
    headline: "Die meisten Awards in der gesamten Geschichte der Emirate",
  },
  {
    id: 2,
    image: "/Bg-Imgs/story-bg.jpeg",
    headline:
      "Historischen Meilenstein 2024: Über 1 Mrd. $ Umsatz bei Dubai Holding",
  },
  {
    id: 3,
    image: "/Achievements/emaar-awards.jpg",
    headline: "Die meisten Nr. 1 Platzierungen bei Emaar in der Geschichte",
  },
  // { id: 4, image: "/off-plan/solaya-la-mer.png", headline: "Headline 4" },
];

// const reviews = [
//   {
//     name: "Alaa Albghdadi",
//     date: "15 March 2021",
//     rating: 5,
//     comment:
//       "Their knowledge of the market was impressive, and they provided invaluable insights that helped me make informed decisions. Whether it was scheduling viewings at convenient times, negotiating terms, or handling paperwork, H&S made everything seamless and stress-free.",
//   },
//   {
//     name: "Asad Nazim",
//     date: "12 February 2022",
//     rating: 4,
//     comment:
//       "I recently had the pleasure of working with this agency to purchase a property in Dubai, and I couldn’t be more satisfied with the experience. Vikas, in particular, was very knowledgeable and on top of the entire process. Highly recommend this agency.",
//   },
// ];

const HSGerman = () => {
  const [showPopup, setShowPopup] = useState(false);
  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute -bottom-16 left-1/2 translate-x-6 w-10 h-10 md:w-14 md:h-14 text-black hover:text-white border-2 border-black rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-black transition duration-300"
        onClick={onClick}
      >
        <FaChevronRight className="text-sm md:text-2xl" />
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute -bottom-16 left-1/2 -translate-x-12 w-10 h-10 md:w-14 md:h-14 text-black hover:text-white border-2 border-black rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-black transition duration-300"
        onClick={onClick}
      >
        <FaChevronLeft className="text-sm md:text-2xl" />
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // arrows: false,
          // dots: false,
        },
      },
    ],
  };

  const blogs = [
    {
      id: "hs-real-rstate-achieves-historic-1-billion-sales-milestone",
      imageSrc: "/Blog/1a.jpg",
      title: "H&S Real Estate achieves historic $1 billion sales milestone",
      date: "October 01, 2024",
      type: "news",
    },
    {
      id: "hs-real-estate-awarded-for-business-excellence-at-uae-event",
      imageSrc: "/Blog/blog-6.jpg",
      title: "H&S Real Estate Awarded for Business Excellence at UAE Event",
      date: "August, 11 2024",
      type: "news",
    },

    {
      id: "hs-real-estate-sales-success-award",
      imageSrc: "/Blog/3.jpg",
      title: "H&S Real Estate sales success award",
      date: "January, 09 2019",
      type: "news",
    },
    {
      id: "hs-real-estate-bags-top-seller-award",
      imageSrc: "/Blog/4.jpg",
      title: "H&S Real Estate bags 'top seller' award",
      date: "March, 22 2022",
      type: "news",
    },
    {
      id: "hs-real-estate-wins-award-for-sales-success",
      imageSrc: "/Blog/5.jpg",
      title: "H&S Real Estate wins award for sales success",
      date: "March, 18 2022",
      type: "news",
    },
    {
      id: "hs-real-estate-builds-on-a-foundation-of-excellence",
      imageSrc: "/Blog/6.jpg",
      title: "H&S Real Estate builds on a foundation of excellence",
      date: "September 30, 2024",
      type: "news",
    },
  ];

  const heroSliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000, // Smooth transition speed
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true, // Enable fade effect
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    waitForAnimate: false,

    pauseOnHover: false,
    // arrows: true,
    // cssEase: "ease-in-out",
  };

  return (
    <div className=" overflow-hidden">
      <div className="bg-gray-200 h-[33rem] md:h-[52rem]">
        <HSGermanNavbar setShowPopup={setShowPopup} isHomeNavbar={true} />
        <div className="pt-24 md:pt-32">
          <div className="h-full font-custom2 flex justify-center">
            <Slider {...heroSliderSettings} className="w-full h-full">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="flex flex-col xl:flex-row h-full hs-german-home  xl:gap-6"
                >
                  {/* Text Section */}
                  <div className="flex flex-col justify-center xl:w-1/2 bg-gray-200 p-6">
                    <Fade bottom duration={1500}>
                      <p className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-black mb-4 md:mb-8 font-custom uppercase ">
                        {slide.headline}
                      </p>
                    </Fade>
                  </div>

                  {/* Image Section */}
                  <div className="relative xl:w-1/2 h-52 sm:h-96 xl:h-full overflow-hidden rounded-xl xl:rounded-r-none xl:rounded-3xl px-6 xl:px-0">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-full object-cover rounded-xl xl:rounded-r-none xl:rounded-3xl"
                      src={slide.image}
                      priority
                      alt="Slide Image"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      {/* {showPaymentPopup && <PaymentPopUp setShow={setShowPaymentPopup} />} */}
      {showPopup && <HSGeramnPopUp setShow={setShowPopup} />}
      <a
        href="https://wa.me/971566890515?text=Hello!"
        className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 z-50"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size="2em" />
      </a>
      <Fade bottom duration={1500}>
        <h2
          className="text-2xl sm:text-3xl md:text-5xl xl:text-6xl max-w-screen-2xl mx-auto font-custom py-10 lg:pt-24 px-4 "
          id="about"
        >
          {/* Wer ist H&S? */}
          Ein Urgestein des jungen Welterfolgs Dubai
        </h2>
      </Fade>
      <div className="bg-white  font-custom2 pb-8 px-4">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          <Fade left duration={1500}>
            <div className="flex flex-col gap-8 justify-center">
              <p className="text-base md:text-lg leading-relaxed text-gray-600 tracking-widest">
                Als Teil der großen Unternehmensgruppe Haqsons Group ist H&S
                Real Estate seit 1998 aktiv und zählt zu den ersten
                Immobilienunternehmen, die eine Genehmigungsvereinbarung
                (&quot;NOC&quot;-Vertrag) mit Emaar unterzeichnet haben.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-gray-600  tracking-widest">
                H&S hat das Wachstum des Marktes entscheidend mitgeprägt und
                maßgeblich dazu beigetragen, Dubai zu einer der weltweit
                führenden Metropolen zu machen – als vielfach preisgekröntes
                Unternehmen wird dies eindrucksvoll bestätigt.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-gray-600  tracking-widest">
                Mit DECA, unserer eigenen Bauträger Marke und Teil der
                Unternehmensgruppe, haben wir uns in den letzten Jahren
                ebenfalls erfolgreich als Entwickler exklusiver Projekte auf dem
                Markt etabliert.
              </p>
              <Link
                href="/german/about-us/"
                // href={{
                //   pathname: '/any', query: { source: '/german' }
                // }}
                className="  px-6 py-3 bg-black text-white  hover:bg-gray-800 duration-300 rounded-lg tracking-wider w-fit text-sm sm:text-base"
              >
                Mehr zur H&S Story
              </Link>
            </div>
          </Fade>

          <Fade right duration={1500}>
            <div className="flex justify-center lg:justify-end">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                src="/Achievements/hs-german-about.jpg"
                alt="H&S Team"
                className="w-full about-img-shadow rounded-lg object-cover"
                loading="lazy"
              />
            </div>
          </Fade>
        </div>
      </div>
      <div id="awards" className=" py-8 md:py-20 font-custom2 px-4">
        <div className="max-w-screen-2xl mx-auto  ">
          <h2 className="text-2xl sm:text-3xl md:text-5xl xl:text-6xl   md:mb-10 font-custom">
            Allzeitrekord: Die meisten Auszeichnungen in der Geschichte der
            Emirate!
          </h2>
          <div className="max-w-screen-2xl mx-auto text-center">
            <Slider {...settings}>
              {awardsData.map((achievement, index) => (
                <HSAchievementCard
                  key={index}
                  {...achievement}
                  moreDetails={false}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <div className="pt-16 md:pt-8 font-custom2">
        <div className="max-w-screen-2xl mx-auto  px-4 md:px-6">
          <h2 className="text-black text-3xl md:text-5xl font-medium capitalize mb-2 md:mb-10 font-custom ">
            Der Puls von H&S Real Estate - direkt von Instagram!
          </h2>
        </div>
      </div>
      <BannerGerman />
      <div
        id="media"
        className="max-w-screen-2xl mx-auto px-4  overflow-hidden mt-0 md:mt-8"
      >
        <Fade bottom duration={1500}>
          <h2 className="text-2xl sm:text-3xl md:text-5xl xl:text-6xl font-custom pt-2 md:pt-6 pb-12  capitalize">
            H&S in der Presse: Top-Artikel & Berichte
          </h2>
        </Fade>
        <div className="grid md:grid-cols-3 gap-4">
          {blogs.slice(0, 3).map((blog, index) => (
            <Fade bottom duration={1000 + index * 200} key={index}>
              <BlogCardOriginal
                imageSrc={blog.imageSrc}
                date={blog.date}
                title={blog.title}
                id={blog.id}
                type={blog.type}
              />
            </Fade>
          ))}
        </div>
        <Fade bottom duration={1500}>
          <div className="flex justify-start md:justify-end items-center  font-custom2 mt-4">
            <Link
              href="/news"
              //   onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 bg-black text-white  hover:bg-gray-800 duration-300 rounded-lg tracking-wider text-sm sm:text-base capitalize"
            >
              Mehr erfahren
            </Link>
          </div>
        </Fade>
      </div>
      <Fade bottom duration={1500}>
        <h2
          className="text-2xl sm:text-3xl md:text-5xl xl:text-6xl max-w-screen-2xl mx-auto font-custom pt-12 md:pt-24 pb-10 px-4 capitalize"
          id="why-hs"
        >
          {/* Wer ist H&S? */}
          Exklusiver Zugang, der anderen verborgen bleibt
        </h2>
      </Fade>
      <div className="bg-white  font-custom2 pb-0 md:pb-8 px-4 max-w-screen-2xl mx-auto">
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          <Fade left duration={1500}>
            <div className="flex flex-col gap-8 justify-center">
              <p className="text-base md:text-lg leading-relaxed text-gray-600  tracking-widest">
                Nur unsere Kunden erhalten exklusiven Zugang zu nicht
                veröffentlichten Einheiten, einschließlich Pre-Launches,
                stornierter Objekte und limitierten Einheiten, die nur einer
                handvoll Top-Unternehmen vorbehalten sind. Über 99 % der
                Mitbewerber in Dubai können Ihnen diesen Zugang nicht bieten
              </p>
              <p className="text-base md:text-lg leading-relaxed text-gray-600  tracking-widest">
                H&S Real Estate – Ihr Zugang zu exklusiven Immobilien, die
                anderen verborgen bleiben.
              </p>
              <Link
                href="/german/why-hs/"
                className="  px-6 py-3 bg-black text-white  hover:bg-gray-800 duration-300 rounded-lg tracking-wider w-fit text-sm sm:text-base"
              >
                Mehr erfahren
              </Link>
            </div>
          </Fade>

          <Fade right duration={1500}>
            <div className="flex justify-center lg:justify-end">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                src="/off-plan/the-bristol.jpg"
                alt="H&S Team"
                className="w-full about-img-shadow rounded-lg object-cover"
                loading="lazy"
              />
            </div>
          </Fade>
        </div>
        <Fade left duration={1500}>
          <h2 className="text-black text-2xl md:text-5xl font-medium  capitalize mb-4 mt-10 md:mt-24 md:mb-16 font-custom">
            Premiumpartner von
          </h2>
        </Fade>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center my-8 md:my-20 gap-16 items-center">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/logos-icons/emaar-logo.svg"
            alt="Partner Logo 1"
            className="w-52"
            loading="lazy"
          />
          {/* <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/logos-icons/damac-logo.svg"
            alt="Partner Logo 2"
            className="w-56"
          /> */}
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/logos-icons/nakheel-logo.svg"
            alt="Partner Logo 3"
            loading="lazy"
            className="w-52"
          />
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/logos-icons/meras-logo.svg"
            alt="Partner Logo 4"
            className="w-52"
            loading="lazy"
          />
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/logos-icons/dp-logo.svg"
            alt="Partner Logo 5"
            className="w-32 -mt-8"
            loading="lazy"
          />
          {/* <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/logos-icons/binghatti-logo.svg"
            alt="Partner Logo 5"
            className="w-56  text-black"
          /> */}
        </div>
        <Fade left duration={1500}>
          <h2
            id="partner"
            className="text-black text-2xl sm:text-3xl md:text-5xl xl:text-6xl font-medium  capitalize mb-4 mt-10 md:mt-24 md:mb-4 font-custom"
          >
            Off-Plan Projekte
          </h2>
        </Fade>
      </div>
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 md:pb-24">
        <Slider {...settings} className="custom-slider">
          {offPlanListings.map((property, index) => (
            <PropertyCard
              key={index}
              image={property.coverPhoto?.url}
              title={property.title}
              id={property.slug}
              price={property.price}
              location={property.location}
              purpose="off-plan"
            />
          ))}
        </Slider>
      </div>
      <div
        id="why-dubai"
        className="max-w-screen-2xl mx-auto px-4 mt-16 md:mt-0"
      >
        <Fade bottom duration={1500}>
          <p className="text-2xl sm:text-3xl md:text-5xl xl:text-6xl font-custom pt-10 md:pt-16 pb-12  capitalize">
            Warum in Dubai investieren?
          </p>
        </Fade>
      </div>
      <div className="flex flex-col md:flex-row bg-gray-200 md:mt-5 mb-4 md:mb-20 overflow-hidden  py-10 gap-10">
        <div className="w-full flex flex-col justify-center pl-4 md:pl-6">
          <div className="w-full text-left font-custom2 ">
            <Fade left duration={1500}>
              <div className="flex flex-col gap-5 justify-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-black font-custom">
                  Real Estate ist Infrastruktur!
                </h2>
                <p className="text-base md:text-lg text-gray-600 tracking-wider">
                  Dubais Immobilienboom ist kein Zufall, sondern das Ergebnis
                  durchdachter Wirtschafts- und Stadtentwicklungspläne. Die
                  Stadt wächst rasant – nicht nur mit neuen Gebäuden, sondern
                  mit gezielter Infrastruktur für eine nachhaltige Zukunft.
                </p>
                <p className="text-black font-bold tracking-wider text-lg">
                  Dubai Economic Agenda D33
                </p>
                <p className="text-base md:text-lg text-gray-600 tracking-wider">
                  Ein ambitionierter Plan, der Dubai bis 2033 zu den
                  Top-3-Wirtschaftszentren der Welt machen soll – mit
                  Milliardeninvestitionen in Innovation, Handel und
                  Lebensqualität.
                </p>
                <p className="text-black font-bold tracking-wider text-lg">
                  Urban Master Plan 2040
                </p>
                <p className="text-base md:text-lg text-gray-600 tracking-wider">
                  Ein zukunftsweisendes Konzept, das Dubais Wachstum intelligent
                  steuert: Mehr Grünflächen, optimierte Verkehrsanbindungen und
                  nachhaltige Stadtviertel für eine stetig wachsende
                  Bevölkerung.
                </p>
                <Fade bottom duration={1500}>
                  <div className="flex justify-start font-custom2">
                    <Link
                      href="/german/why-dubai/"
                      className="px-6 py-3 bg-black text-white hover:bg-gray-800 duration-300 rounded-lg tracking-wider capitalize text-sm sm:text-base"
                    >
                      Mehr erfahren
                    </Link>
                  </div>
                </Fade>
              </div>
            </Fade>
          </div>
        </div>

        <div className="w-full flex flex-col justify-center ">
          <Fade right duration={1500}>
            <div className="relative overflow-hidden md:rounded-l-xl rounded-none">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                src="/home-image-1.jpg"
                alt="Dubai Skyline"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black opacity-25"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="/logos-icons/H&S-Dubai-Logo-White.png"
                  alt="logo"
                  className="object-contain w-28 md:w-64"
                  loading="lazy"
                />
              </div>
            </div>
          </Fade>
        </div>
      </div>
      <div
        id="contact"
        className="max-w-screen-2xl mx-auto font-custom text-center pt-8 md:pt-0 pb-6 md:pb-8 flex justify-between items-center px-4 overflow-hidden"
      >
        <Fade bottom duration={1500}>
          <p className="text-black text-2xl sm:text-3xl md:text-5xl xl:text-6xl mb-4">
            Fordern Sie eine Beratung an
          </p>
        </Fade>
      </div>
      <HSGermanContact />
      <HSGermanFooter />
    </div>
  );
};

export default HSGerman;
