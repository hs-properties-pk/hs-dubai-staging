import Link from "next/link";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Page Not Found | H&S Real Estate Dubai",
  description:
    "The page you are looking for does not exist or may have been moved. Explore Dubai off-plan properties and communities with H&S Real Estate.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-custom2">
      <Navbar isHomeNavbar={false} />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#606060] mb-4">
          404
        </p>
        <h1 className="font-custom text-4xl md:text-6xl lg:text-7xl font-medium text-black mb-4 leading-tight">
          Page not found
        </h1>
        <p className="text-base md:text-lg text-[#606060] max-w-lg leading-relaxed mb-10">
          We couldn&apos;t find this URL. It may have been removed or the link
          might be outdated. Head back home or explore our latest opportunities.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 w-full max-w-md sm:max-w-none">
          <Link
            href="/"
            className="w-full sm:w-auto rounded-lg bg-black px-8 py-3.5 font-custom2 text-sm font-semibold text-white tracking-wide hover:bg-gray-900 transition-colors text-center"
          >
            Back to Home
          </Link>
          <Link
            href="/properties/off-plan"
            className="w-full sm:w-auto rounded-lg border-2 border-black bg-white px-8 py-3.5 font-custom2 text-sm font-semibold text-black tracking-wide hover:bg-black hover:text-white transition-colors text-center"
          >
            Browse Off-Plan
          </Link>
          <Link
            href="/communities"
            className="w-full sm:w-auto rounded-lg border-2 border-black bg-white px-8 py-3.5 font-custom2 text-sm font-semibold text-black tracking-wide hover:bg-black hover:text-white transition-colors text-center"
          >
            Communities
          </Link>
        </div>
        <Link
          href="/contact"
          className="mt-8 font-custom2 text-sm font-medium text-[#606060] underline underline-offset-4 decoration-1 hover:text-black transition-colors"
        >
          Contact us
        </Link>
      </main>
      <Footer />
    </div>
  );
}
