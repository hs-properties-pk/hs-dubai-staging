"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { isOffPlanTypeListSlug } from "@/lib/offPlanTypeRoutes";

/**
 * True for /properties/{for-rent|for-sale|off-plan}/… with a project slug (detail), not a listing index.
 * Off-plan type routes /properties/off-plan/villa|apartment|townhouse use the same hero as the main listing
 * and must keep the light-on-image chrome (white links + white logo) at the top.
 */
function isPropertyPurposeDetailPathname(pathname) {
  if (!pathname) return false;
  const p = pathname.replace(/\/+$/, "") || "/";
  if (!/^\/properties\/(for-rent|for-sale|off-plan)\/.+/.test(p)) return false;
  const parts = p.split("/").filter(Boolean);
  if (
    parts[0] === "properties" &&
    parts[1] === "off-plan" &&
    parts[2] &&
    isOffPlanTypeListSlug(parts[2])
  ) {
    return false;
  }
  return true;
}

const Navbar = ({ isHomeNavbar }) => {
  const pathname = usePathname() || "";
  const isPurposeDetailPage = isPropertyPurposeDetailPathname(pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [subAbout, setSubAbout] = useState(false);
  const [subResources, setSubResources] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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

  const scrolled = scrollPosition > 0;
  /* Listing: /properties/for-rent, /for-sale, /off-plan — white nav at top (like hero). Detail pages under those: black at top on light content. Scrolled: dark bar + white everywhere. */
  const useWhiteChrome = scrolled || !isPurposeDetailPage;
  const linkTone = useWhiteChrome ? "text-white" : "text-neutral-900";
  const iconTone = useWhiteChrome ? "text-white" : "text-neutral-900";
  const whatsappBorder = useWhiteChrome ? "border-white" : "border-neutral-900";
  const logoSrc = useWhiteChrome
    ? "/logos-icons/H&S-Dubai-Logo-White.png"
    : "/logos-icons/H&S-Dubai-Logo-Black.png";

  const transparentPlaceholder =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+";

  return (
    <header
      className={`w-full fixed top-0 z-50 font-custom ${scrollPosition > 0
        ? "bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg"
        : "bg-transparent"
        }`}
    >
      <nav className=" w-full mx-auto flex justify-between items-center  px-4 md:px-6 py-6 font-custom2 tracking-widest">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src={logoSrc}
            alt="H&S Dubai Logo"
            width={112}
            height={40}
            loading="lazy"
            quality={90}
            sizes="(max-width: 768px) 80px, 112px"
            className="object-contain w-20 md:w-28"
            placeholder="blur"
            blurDataURL={transparentPlaceholder}
          />
        </Link>
        <div className={`flex items-center gap-4 ${linkTone}`}>
          <div className="hidden lg:flex justify-center items-center">
            <Link
              href="/properties/for-sale"
              className="hidden lg:block rounded py-2 px-3 md:bg-transparent lg:p-0 underline-animation"
            >
              Buy
            </Link>
          </div>
          <div className="hidden lg:flex justify-center items-center">
            <Link
              href="/properties/for-rent"
              className="hidden lg:block rounded py-2 px-3 md:bg-transparent lg:p-0 underline-animation"
            >
              Rent
            </Link>
          </div>
          <div className="hidden lg:flex justify-center items-center">
            <Link
              href="/properties/off-plan"
              className="hidden lg:block rounded py-2 px-3 md:bg-transparent lg:p-0 underline-animation"
            >
              Off Plan
            </Link>
          </div>
          <div className="hidden lg:flex justify-center items-center">
            <Link
              href="/brands"
              className="hidden lg:block rounded py-2 px-3 md:bg-transparent lg:p-0 underline-animation"
            >
              Brands
            </Link>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <Link
              href="/communities"
              className="hidden lg:block rounded py-2 px-3 md:bg-transparent lg:p-0 underline-animation"
            >
              Communities
            </Link>
          </div>
          <div className="hidden lg:flex justify-center items-center">
            <Link
              href="/mortgages"
              className="hidden lg:block rounded py-2 px-3 md:bg-transparent lg:p-0 underline-animation"
            >
              Mortgages
            </Link>
          </div>
          <div
            className="hidden lg:flex justify-center items-center"
            onMouseEnter={() => setIsDropdownVisible(false)}
          >
            {/* =================================== */}
            <Link
              href="/real-estate-brokers-in-dubai"
              className="hidden lg:block rounded py-2 px-3 md:bg-transparent lg:p-0 underline-animation"
            >
              {/* main navbar */}
              {/* Careers */}
              Our Approach
            </Link>
            {/* =================================== */}
          </div>
          <div className="hidden lg:flex justify-center items-center">
            <Link
              href="/contact"
              className="hidden lg:block rounded py-2 px-3 md:bg-transparent lg:p-0 underline-animation"
            >
              Contact
            </Link>
          </div>
          <div
            className="relative hidden lg:flex justify-center items-center gap-1 cursor-pointer"
            onMouseEnter={() => setIsDropdownVisible(true)}
          >
            <div className="hidden lg:block rounded py-2 px-3 md:bg-transparent lg:p-0 underline-animation">
              More
            </div>
            <IoIosArrowDown size="1.2em" className={iconTone} />
            {isDropdownVisible && (
              <div
                className="absolute top-8 right-0 mt-2 bg-white shadow-lg p-4 rounded-lg w-[30vw] text-black"
                onMouseEnter={() => setIsDropdownVisible(true)}
                onMouseLeave={() => setIsDropdownVisible(false)}
              >
                <div className="grid grid-cols-2 gap-4 text-gray-800">
                  <div className="text-sm">
                    <p className="text-sm font-semibold text-black uppercase mb-4 font-custom">
                      About
                    </p>
                    <ul className="space-y-2">
                      <Link href="/our-story" className="block border-b py-2">
                        <p className="text-gray-600 hover:text-black">
                          Our Story
                        </p>
                      </Link>
                      <Link
                        href="/why-choose-hs-real-estate"
                        className="block border-b py-2"
                      >
                        <p className="text-gray-600 hover:text-black">
                          Why H&S Real Estate?
                        </p>
                      </Link>
                      <Link
                        href="/client-reviews"
                        className="block border-b py-2"
                      >
                        <p className="text-gray-600 hover:text-black">
                          Client Reviews
                        </p>
                      </Link>
                      <Link href="/awards" className="block border-b py-2">
                        <p className="text-gray-600 hover:text-black">Awards</p>
                      </Link>
                      <Link href="/services" className="block border-b py-2">
                        <p className="text-gray-600 hover:text-black">
                          Services
                        </p>
                      </Link>
                      <Link href="/careers" className="block border-b py-2">
                        <p className="text-gray-600 hover:text-black">
                          Careers
                        </p>
                      </Link>
                    </ul>
                  </div>
                  <div className="text-sm">
                    <p className="text-sm font-semibold text-black uppercase mb-4 font-custom">
                      Resources
                    </p>
                    <ul className="space-y-2">
                      <Link href="/news" className="block border-b py-2">
                        <p className="text-gray-600 hover:text-black">News</p>
                      </Link>
                      <Link href="/blogs" className="block border-b py-2">
                        <p className="text-gray-600 hover:text-black">Blogs</p>
                      </Link>

                      <Link
                        href="/market-insights"
                        className="block border-b py-2"
                      >
                        <p className="text-gray-600 hover:text-black">
                          Market Insights
                        </p>
                      </Link>
                      <Link href="/area-guides" className="block border-b py-2">
                        <p className="text-gray-600 hover:text-black">
                          Area Guides
                        </p>
                      </Link>
                      <Link
                        href="/property-valuation"
                        className="block border-b py-2"
                      >
                        <p className="text-gray-600 hover:text-black">
                          Property Valuation
                        </p>
                      </Link>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link
            target="_blank"
            href="https://wa.me/971526902884?text=Hello!"
            onMouseEnter={() => setIsDropdownVisible(false)}
            type="submit"
            className={`hidden items-center gap-2 rounded-full border p-4 text-sm font-medium duration-300 hover:bg-[#25d366] lg:flex ${whatsappBorder} ${linkTone}`}
          >
            <FaWhatsapp size="1.3em" />
            Whatsapp
          </Link>
        </div>

        <button
          className={`ml-auto inline-flex items-center rounded-lg p-2 text-sm lg:hidden focus:outline-none ${linkTone}`}
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
        <div
          className={`fixed top-0 right-0 h-full w-full  transition-transform transform lg:hidden ${isOpen
            ? "translate-x-0 bg-gray-800"
            : "translate-x-full bg-transparent"
            } lg:relative lg:transform-none lg:items-center lg:w-auto`}
          id="navbar-default"
        >
          <ul className=" font-medium uppercase tracking-wider text-sm flex flex-col gap-2 lg:gap-0 p-4 lg:p-0 mt-12 lg:mt-0 lg:flex-row rtl:space-x-reverse bg-gray-800 md:bg-transparent h-screen md:h-full font-custom2 ">
            <li className="lg:border-r-2 lg:border-gray-300 lg:pr-4">
              <Link
                onClick={() => setIsOpen(!isOpen)}
                href="/properties/for-sale"
                className="block py-2 px-3 text-white rounded md:bg-transparent lg:p-0 dark:text-white underline-animation"
              >
                Buy
              </Link>
            </li>
            <li className="lg:border-r-2 lg:border-gray-300 lg:pr-4">
              <Link
                onClick={() => setIsOpen(!isOpen)}
                href="/properties/for-rent"
                className="block py-2 px-3 text-white rounded md:bg-transparent lg:p-0 dark:text-white underline-animation"
              >
                Rent
              </Link>
            </li>
            <li className="lg:border-r-2 lg:border-gray-300 lg:pr-4">
              <Link
                onClick={() => setIsOpen(!isOpen)}
                href="/properties/off-plan"
                className="block py-2 px-3 text-white rounded md:bg-transparent lg:p-0 dark:text-white underline-animation"
              >
                Off Plan
              </Link>
            </li>
            <li className="lg:border-r-2 lg:border-gray-300 lg:pr-4">
              <Link
                onClick={() => setIsOpen(!isOpen)}
                href="/brands"
                className="block py-2 px-3 text-white rounded md:bg-transparent lg:p-0 dark:text-white underline-animation"
              >
                Brands
              </Link>
            </li>

            <li className="lg:pl-4">
              <Link
                onClick={() => setIsOpen(!isOpen)}
                href="/mortgages"
                className="block py-2 px-3 text-white rounded md:bg-transparent lg:p-0 dark:text-white underline-animation"
              >
                Mortgages
              </Link>
            </li>
            <li className="lg:pl-4">
              {/* =================================== */}
              <Link
                onClick={() => setIsOpen(!isOpen)}
                href="/real-estate-brokers-in-dubai"
                className="block py-2 px-3 text-white rounded md:bg-transparent lg:p-0 dark:text-white underline-animation"
              >
                {/* main navbar */}
                {/* Careers */}
                Our Approach
              </Link>
              {/* =================================== */}
            </li>
            <li className="lg:pl-4">
              <Link
                onClick={() => setIsOpen(!isOpen)}
                href="/communities"
                className="block py-2 px-3 text-white rounded md:bg-transparent lg:p-0 dark:text-white underline-animation"
              >
                Communities
              </Link>
            </li>
            <li className="lg:pl-4">
              <Link
                onClick={() => setIsOpen(!isOpen)}
                href="/contact"
                className="block py-2 px-3 text-white rounded md:bg-transparent lg:p-0 dark:text-white underline-animation"
              >
                CONTACT
              </Link>
            </li>
            <li className="lg:pl-4">
              <button
                onClick={() => setSubAbout(!subAbout)}
                className="w-full flex justify-between text-white items-center py-2 px-3 text-left  tracking-wider uppercase"
              >
                About
                <span className="text-xl">{subAbout ? "−" : "+"}</span>
              </button>
              {subAbout && (
                <div className="flex flex-col gap-2 px-3 capitalize">
                  <Link
                    onClick={() => setIsOpen(!isOpen)}
                    href="/our-story"
                    className="block py-2"
                  >
                    <p className="text-white hover:text-gray-400">Our Story</p>
                  </Link>
                  <Link
                    onClick={() => setIsOpen(!isOpen)}
                    href="/why-choose-hs-real-estate"
                    className="block  py-2"
                  >
                    <p className="text-white hover:text-gray-400">
                      Why H&S Real Estate?
                    </p>
                  </Link>
                  <Link
                    onClick={() => setIsOpen(!isOpen)}
                    href="/client-reviews"
                    className="block  py-2"
                  >
                    <p className="text-white hover:text-gray-400">
                      Client Reviews
                    </p>
                  </Link>
                  <Link
                    onClick={() => setIsOpen(!isOpen)}
                    href="/awards"
                    className="block  py-2"
                  >
                    <p className="text-white hover:text-gray-400">Awards</p>
                  </Link>
                  <Link
                    onClick={() => setIsOpen(!isOpen)}
                    href="/services"
                    className="block  py-2"
                  >
                    <p className="text-white hover:text-gray-400">Services</p>
                  </Link>
                  <Link
                    onClick={() => setIsOpen(!isOpen)}
                    href="/careers"
                    className="block  py-2"
                  >
                    <p className="text-white hover:text-gray-400">Careers</p>
                  </Link>
                </div>
              )}
            </li>
            <li className="lg:pl-4">
              <button
                onClick={() => setSubResources(!subResources)}
                className="w-full flex justify-between text-white items-center py-2 px-3 text-left  tracking-wider uppercase"
              >
                Resources
                <span className="text-xl">{subResources ? "−" : "+"}</span>
              </button>
              {subResources && (
                <div className="flex flex-col gap-2 px-3 capitalize">
                  <Link
                    onClick={() => setIsOpen(!isOpen)}
                    href="/news"
                    className="block  py-2"
                  >
                    <p className="text-white hover:text-gray-400">
                      News & Videos
                    </p>
                  </Link>
                  <Link
                    onClick={() => setIsOpen(!isOpen)}
                    href="/blogs"
                    className="block  py-2"
                  >
                    <p className="text-white hover:text-gray-400">Blogs</p>
                  </Link>

                  <Link
                    onClick={() => setIsOpen(!isOpen)}
                    href="/market-insights"
                    className="block  py-2"
                  >
                    <p className="text-white hover:text-gray-400">
                      Market Insights
                    </p>
                  </Link>
                  <Link
                    onClick={() => setIsOpen(!isOpen)}
                    href="/area-guides"
                    className="block  py-2"
                  >
                    <p className="text-white hover:text-gray-400">
                      Area Guides
                    </p>
                  </Link>
                  <Link
                    onClick={() => setIsOpen(!isOpen)}
                    href="/property-valuation"
                    className="block  py-2"
                  >
                    <p className="text-white hover:text-gray-400">
                      Property Valuation
                    </p>
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
