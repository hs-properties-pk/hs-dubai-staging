import { useEffect } from "react";
import Script from "next/script";

const GoogleTranslate = () => {
  useEffect(() => {
    const googleTranslateElementInit = () => {
      new google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "es,fr,de,zh",
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false, // Prevents popup on first load
        },
        "google_translate_element"
      );

      // Auto-select German ('de')
      const selectElement = document.querySelector(".goog-te-combo");
      if (selectElement) {
        selectElement.value = "de";
        selectElement.dispatchEvent(new Event("change"));
      }
    };

    if (typeof window !== "undefined" && window.google) {
      googleTranslateElementInit();
    } else {
      window.googleTranslateElementInit = googleTranslateElementInit;
    }
  }, []);

  return (
    <>
      <Script
        className="google_translate"
        strategy="afterInteractive"
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      />
      <div id="google_translate_element"></div>
    </>
  );
};

export default GoogleTranslate;
