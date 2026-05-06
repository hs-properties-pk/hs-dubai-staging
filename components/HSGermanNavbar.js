"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HSGermanNavbar = ({ setShowPopup, isHomeNavbar, isGermanNavbar }) => {
  // const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id, offset = 130) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <header
      className={`w-screen fixed top-0 z-50 font-custom ${
        scrollPosition > 0
          ? "bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <nav className=" w-full mx-auto flex justify-between items-center  px-4 md:px-6 py-6 font-custom2 tracking-widest">
        <Link href="/german" className="flex justify-center items-center">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src={
              scrollPosition > 0
                ? "/logos-icons/H&S-Dubai-Logo-White.png"
                : isHomeNavbar
                ? "/logos-icons/H&S-Dubai-Logo-Black.png"
                : "/logos-icons/H&S-Dubai-Logo-White.png"
            }
            alt="logo"
            className="object-contain w-20 md:w-32"
          />
        </Link>

        {!isGermanNavbar ? (
          <div
            className={`flex items-center gap-4 ${
              scrollPosition > 0
                ? "text-white"
                : isHomeNavbar
                ? "text-black"
                : "text-white"
            }`}
          >
            <div className="hidden xl:flex justify-center items-center">
              <button
                onClick={() => scrollToSection("about")}
                className={`hidden xl:block py-2 px-3  rounded md:bg-transparent xl:p-0  ${
                  scrollPosition > 0
                    ? "underline-animation"
                    : isHomeNavbar
                    ? "underline-animation-scroll"
                    : "underline-animation"
                }`}
              >
                Über H&S
              </button>
            </div>
            <div className="hidden xl:flex justify-center items-center">
              <button
                onClick={() => scrollToSection("awards")}
                className={`hidden xl:block py-2 px-3  rounded md:bg-transparent xl:p-0  ${
                  scrollPosition > 0
                    ? "underline-animation"
                    : isHomeNavbar
                    ? "underline-animation-scroll"
                    : "underline-animation"
                }`}
              >
                Awards
              </button>
            </div>
            <div className="hidden xl:flex justify-center items-center">
              <button
                onClick={() => scrollToSection("media")}
                className={`hidden xl:block py-2 px-3  rounded md:bg-transparent xl:p-0  ${
                  scrollPosition > 0
                    ? "underline-animation"
                    : isHomeNavbar
                    ? "underline-animation-scroll"
                    : "underline-animation"
                }`}
              >
                Presse
              </button>
            </div>

            <div className="hidden xl:flex justify-center items-center">
              <button
                onClick={() => scrollToSection("why-hs")}
                className={`hidden xl:block py-2 px-3  rounded md:bg-transparent xl:p-0  ${
                  scrollPosition > 0
                    ? "underline-animation"
                    : isHomeNavbar
                    ? "underline-animation-scroll"
                    : "underline-animation"
                }`}
              >
                Warum H&S?
              </button>
            </div>
            <div className="hidden xl:flex justify-center items-center">
              <button
                onClick={() => scrollToSection("why-dubai")}
                className={`hidden xl:block py-2 px-3  rounded md:bg-transparent xl:p-0  ${
                  scrollPosition > 0
                    ? "underline-animation"
                    : isHomeNavbar
                    ? "underline-animation-scroll"
                    : "underline-animation"
                }`}
              >
                Warum Dubai?
              </button>
            </div>
            <div className="hidden xl:flex justify-center items-center">
              <button
                onClick={() => scrollToSection("partner")}
                className={`hidden xl:block py-2 px-3  rounded md:bg-transparent xl:p-0  ${
                  scrollPosition > 0
                    ? "underline-animation"
                    : isHomeNavbar
                    ? "underline-animation-scroll"
                    : "underline-animation"
                }`}
              >
                Projekte
              </button>
            </div>
            <div className="hidden xl:flex justify-center items-center">
              <button
                onClick={() => scrollToSection("contact")}
                className={`hidden xl:block py-2 px-3  rounded md:bg-transparent xl:p-0  ${
                  scrollPosition > 0
                    ? "underline-animation"
                    : isHomeNavbar
                    ? "underline-animation-scroll"
                    : "underline-animation"
                }`}
              >
                Kontakt
              </button>
            </div>

            <Link
              href="/germankontakt"
              // target="_blank"
              // onClick={() => setShowPopup(true)}
              className={`hidden xl:block  border  font-medium rounded-full text-sm p-4 hover:bg-white hover:text-black  ${
                scrollPosition > 0
                  ? "border-white"
                  : isHomeNavbar
                  ? "border-black"
                  : "border-white"
              }`}
            >
              Beratung vereinbaren
            </Link>
          </div>
        ) : (
          <div
            className={`flex items-center gap-4 ${
              scrollPosition > 0
                ? "text-white"
                : isHomeNavbar
                ? "text-black"
                : "text-white"
            }`}
          >
            <Link
              href="/germankontakt"
              // target="_blank"
              className={`block  border  font-medium rounded-full text-xs md:text-sm p-3 md:p-4 hover:bg-white hover:text-black  ${
                scrollPosition > 0
                  ? "border-white"
                  : isHomeNavbar
                  ? "border-black"
                  : "border-white"
              }`}
            >
              Beratung vereinbaren
            </Link>
          </div>
        )}
        {!isGermanNavbar && (
          <button
            className={`inline-flex ml-auto  items-center p-2 text-sm  rounded-lg  xl:hidden focus:outline-none  ${
              scrollPosition > 0
                ? "text-white"
                : isHomeNavbar
                ? isOpen
                  ? "text-white"
                  : "text-black"
                : "text-white"
            }`}
            aria-controls="navbar-default"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg
                className="w-6 h-6 z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6 z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            )}
          </button>
        )}
        <div
          className={`fixed top-0 right-0 h-full w-full  transition-transform transform xl:hidden ${
            isOpen
              ? "translate-x-0 bg-gray-800"
              : "translate-x-full bg-transparent"
          } xl:relative xl:transform-none xl:items-center xl:w-auto`}
          id="navbar-default"
        >
          <div className=" font-medium uppercase tracking-wider text-sm flex flex-col gap-4 xl:gap-0 p-4 xl:p-0 mt-12 xl:mt-0 xl:flex-row items-center rtl:space-x-reverse bg-gray-800 md:bg-transparent h-screen md:h-full font-custom2 ">
            <button
              onClick={() => scrollToSection("about")}
              className="block py-2 px-3 text-white rounded md:bg-transparent xl:p-0 dark:text-white underline-animation"
            >
              Über H&S
            </button>
            <button
              onClick={() => scrollToSection("awards")}
              className="block py-2 px-3 text-white rounded md:bg-transparent xl:p-0 dark:text-white underline-animation"
            >
              Awards
            </button>
            <button
              onClick={() => scrollToSection("media")}
              className="block py-2 px-3 text-white rounded md:bg-transparent xl:p-0 dark:text-white underline-animation"
            >
              Presse
            </button>
            <button
              onClick={() => scrollToSection("why-hs")}
              className="block py-2 px-3 text-white rounded md:bg-transparent xl:p-0 dark:text-white underline-animation"
            >
              Warum H&S?
            </button>
            <button
              onClick={() => scrollToSection("why-dubai")}
              className="block py-2 px-3 text-white rounded md:bg-transparent xl:p-0 dark:text-white underline-animation"
            >
              Warum Dubai?
            </button>
            <button
              onClick={() => scrollToSection("partner")}
              className="block py-2 px-3 text-white rounded md:bg-transparent xl:p-0 dark:text-white underline-animation"
            >
              Projekte
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block py-2 px-3 text-white rounded md:bg-transparent xl:p-0 dark:text-white underline-animation"
            >
              Kontakt
            </button>
            <Link
              href="/germankontakt"
              // target="_blank"
              // className="flex gap-2   items-center bg-gradient text-black duration-300   font-medium rounded-full text-sm p-4 capitalize"
              className={`block  duration-300 border  text-white  font-medium rounded-full text-sm p-4  ${
                scrollPosition > 0
                  ? "border-white"
                  : isOpen
                  ? "border-white"
                  : "border-black"
              }`}
            >
              Beratung vereinbaren
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HSGermanNavbar;
