"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import HomeHeroHeading from "@/components/HomeHeroHeading";
import FAQSectionAll from "@/components/FAQSectionAll";
import Link from "next/link";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  FaDownload,
  FaInstagram,
  FaLink,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { RiFacebookFill } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AreaGuideNewDetailPage({ areaSlug, areaData }) {
  const [loading, setLoading] = useState(!areaData);
  const [error, setError] = useState(null);
  const [area, setArea] = useState(areaData || null);
  const contentRef = useRef(null);

  useEffect(() => {
    // If data is not provided as props, fetch it
    if (!areaData) {
      const fetchAreaData = async () => {
        try {
          console.log(`ðŸ”„ Fetching area data for: ${areaSlug}`);
          const response = await fetch(`/api/area-guides/${areaSlug}`);
          console.log(`ðŸ“Š Response status: ${response.status}`);
          
          if (!response.ok) throw new Error(`Failed to fetch area guide: ${response.status}`);
          
          const data = await response.json();
          console.log("âœ… Received area data:", data);
          
          if (!data.success) {
            setError(data.error || "Area Guide not found");
            return;
          }

          setArea(data.data || data);
          console.log("âœ… Area data set successfully");

          // Update page meta tags
          if (typeof document !== "undefined") {
            document.title = data.data?.meta_title || "Area Guide";
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
              metaDesc.setAttribute("content", data.data?.meta_description || "");
            }
          }
        } catch (err) {
          console.error("âŒ Error fetching area guide:", err);
          setError(err.message || "Failed to load area guide");
        } finally {
          setLoading(false);
        }
      };

      fetchAreaData();
    }
  }, [areaSlug, areaData]);

  const copyLinkToClipboard = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.href : "";
    navigator.clipboard.writeText(baseUrl);
    toast.success("Link copied to clipboard!");
  };

  const downloadPDF = async () => {
    const originalContent = contentRef.current;

    if (!originalContent) return;

    // Clone the content to avoid affecting the original DOM
    const clonedContent = originalContent.cloneNode(true);

    // Remove or hide specific elements in the cloned version
    const elementsToRemove = clonedContent.querySelectorAll(".remove");
    elementsToRemove.forEach((el) => el.remove());

    // Create a temporary container to render the cloned content
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px"; // Hide it offscreen
    tempContainer.appendChild(clonedContent);
    document.body.appendChild(tempContainer);

    try {
      // Capture the cloned content
      const canvas = await html2canvas(clonedContent);
      const imageData = canvas.toDataURL("image/png");

      // Generate the PDF
      const pdf = new jsPDF({
        orientation: "portrait", // or 'landscape'
        unit: "px", // units for dimensions
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(
        imageData,
        "PNG",
        0,
        0,
        pdf.internal.pageSize.width,
        pdf.internal.pageSize.height
      );
      pdf.save(`${area?.title.toLowerCase().replace(/\s+/g, "-")}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // Clean up the temporary container
      document.body.removeChild(tempContainer);
    }
  };

  if (loading) return <div className="text-center py-12">Loading area guide...</div>;
  if (error) return <div className="text-center py-12 text-red-600">Error: {error}</div>;
  if (!area) return <div className="text-center py-12">Area guide not found</div>;

  return (
    <div ref={contentRef}>
      <HomeHeroHeading image={area.featured_image || area.image} />
      <div className="max-w-screen-2xl mx-auto  px-4 md:px-6 font-custom2 pb-8 ">
        <div className=" w-full flex flex-col md:flex-row items-center justify-between my-4">
          <div className=" md:w-[900px] w-full py-8 md:py-14 font-custom text-black">
            <h1 className="text-3xl md:text-6xl font-light">
              {area.h1_title}
            </h1>
          </div>

          <div className="bg-[#F8F8F8] p-2 lg:p-4  shadow-md w-full lg:w-max h-max rounded-lg remove">
            <div className="flex flex-col justify-between ">
              <p className="text-sm  py-[2px] px-2  border border-black rounded-xl w-max">
                Share this
              </p>
              <div className="mt-6 grid grid-cols-4 lg:grid-cols-7 social-icons gap-4">
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== "undefined" ? window.location.href : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="facebook"
                >
                  <RiFacebookFill size="2em" fill="white" />
                </Link>
                <Link
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram"
                >
                  <FaInstagram size="2em" fill="white" />
                </Link>
                <Link
                  href={`https://api.whatsapp.com/send?text=Check this out: ${typeof window !== "undefined" ? window.location.href : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp"
                >
                  <FaWhatsapp size="2em" fill="white" />
                </Link>
                <Link
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin"
                >
                  <FaLinkedinIn size="2em" fill="white" />
                </Link>
                <Link
                  href={`https://twitter.com/intent/tweet?url=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="twitter"
                >
                  <FaXTwitter size="2em" fill="white" />
                </Link>
                <button onClick={copyLinkToClipboard} className="link">
                  <FaLink size="2em" fill="white" />
                </button>
                <button onClick={downloadPDF} className="link">
                  <FaDownload size="1.7em" fill="white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* </Fade> */}
        <ToastContainer autoClose={2000} />
        {/* <Fade right duration={1500}> */}
        <div
          className="w-full  text-base md:text-lg tracking-wider flex flex-col gap-6 text-black"
          dangerouslySetInnerHTML={{ __html: area.detailed_content || area.description || "" }}
        />
        {/* </Fade> */}
      </div>
      <FAQSectionAll faqItems={area?.faqs} />
      <div className="remove">
        <Footer />
      </div>
    </div>
  );
}

export default AreaGuideNewDetailPage;

