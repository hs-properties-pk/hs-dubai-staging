import React from "react";
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaWhatsapp 
} from "react-icons/fa";

const LandingPageFooter = ({ 
  communityName = "The Valley by Emaar",
  footerLinks,
  socialLinks = [
    {
      icon: FaFacebookF,
      url: "https://www.facebook.com/hspropertyrealestate",
      label: "Facebook",
    },
    {
      icon: FaInstagram,
      url: "https://www.instagram.com/hs_property/",
      label: "Instagram",
    },
    {
      icon: FaLinkedinIn,
      url: "https://www.linkedin.com/company/h-s-properties/",
      label: "LinkedIn",
    },
    {
      icon: FaWhatsapp,
      url: "https://api.whatsapp.com/send/?phone=971526902884&text=Hello%21&type=phone_number&app_absent=0",
      label: "WhatsApp",
    },
  ],
  contactInfo = {
    email: "info@hsproperty.ae",
    phone: "+971 (0) 4 345 4888",
    phoneRaw: "+971526902884",
    address: "Grey Square, Showroom 2, Umm Suqeim Road, Al Barsha 2, Dubai",
    mapUrl: "https://maps.app.goo.gl/dQ6Tv5dBQQKkq1dP6",
  },
  // Color customization props
  bgColor = "bg-slate-900",
  textColor = "text-white",
  textMutedColor = "text-white/80",
  iconColor = "text-emerald-300",
  linkHoverColor = "hover:text-emerald-300",
  borderColor = "border-white/10",
  socialBorderColor = "border-white/15",
  socialHoverBg = "hover:bg-white",
  socialHoverText = "hover:text-slate-900",
  className = "",
  onLinkClick, // Optional function to handle link clicks (for smooth scrolling)
}) => {
  // Determine grid columns based on whether quick links exist
  const gridCols = footerLinks && footerLinks.length > 0 
    ? "sm:grid-cols-2 lg:grid-cols-3" 
    : "sm:grid-cols-2";

  // Handle link click - use custom handler if provided, otherwise use default hash navigation
  const handleLinkClick = (e, linkId) => {
    if (onLinkClick) {
      e.preventDefault();
      onLinkClick(linkId);
    }
    // Otherwise, let the default hash navigation work
  };

  return (
    <footer className={`${bgColor} ${textColor} py-12 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid ${gridCols} gap-8 mb-8`}>
          {/* Contact Info */}
          <div>
            <h3 className={`font-bold text-lg mb-4 ${textColor} font-custom`}>
              Contact Us
            </h3>
            <div className={`space-y-3 ${textMutedColor}`}>
              <a
                href={`mailto:${contactInfo?.email}`}
                className={`flex items-center gap-3 ${linkHoverColor} transition-colors group`}
              >
                <FaEnvelope className={`${iconColor} group-hover:scale-110 transition-transform`} />
                <span className="font-custom2">{contactInfo?.email}</span>
              </a>
              <a
                href={`tel:${contactInfo?.phoneRaw}`}
                className={`flex items-center gap-3 ${linkHoverColor} transition-colors group`}
              >
                <FaPhone className={`${iconColor} group-hover:scale-110 transition-transform`} />
                <span className="font-custom2">{contactInfo?.phone}</span>
              </a>
              <a
                href={contactInfo?.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-start gap-3 ${linkHoverColor} transition-colors group`}
              >
                <FaMapMarkerAlt className={`${iconColor} mt-1 group-hover:scale-110 transition-transform shrink-0`} />
                <span className="font-custom2">
                  {contactInfo?.address}
                </span>
              </a>
            </div>
          </div>

          {/* Quick Links - Conditional */}
          {footerLinks && footerLinks.length > 0 && (
            <div>
              <h3 className={`font-bold text-lg mb-4 ${textColor} font-custom`}>
                Quick Links
              </h3>
              <div className="space-y-2">
                {footerLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className={`block ${textMutedColor} ${linkHoverColor} transition-colors text-left font-custom2 cursor-pointer`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Social Media */}
          <div className={footerLinks && footerLinks.length > 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
            <h3 className={`font-bold text-lg mb-4 ${textColor} font-custom`}>
              Follow Us
            </h3>
            <div className="flex gap-3">
              {socialLinks?.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-11 h-11 border-2 ${socialBorderColor} rounded-2xl flex items-center justify-center ${socialHoverBg} ${socialHoverText} transition-all ${textColor} hover:scale-105`}
                    aria-label={social.label}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className={`border-t ${borderColor} pt-6 text-center ${textMutedColor}`}>
          <p className="font-custom2">
            &copy; {new Date().getFullYear()} H&amp;S Property. All rights reserved.
          </p>
          {communityName && (
            <p className="text-sm mt-2 font-custom2">
              Premium Real Estate Developments in Dubai | {communityName} | Off Plan Projects in UAE
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
