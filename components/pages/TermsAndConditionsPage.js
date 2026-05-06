import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import Link from "next/link";
import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <div>
      <Navbar isHomeNavbar={true} />
      <div className="max-w-screen-2xl mx-auto text-black p-4 md:p-6 space-y-6 mb-12  md:mb-16 mt-24 md:mt-28 font-custom2 tracking-wider">
        <h1 className="text-3xl font-bold text-center text-black font-custom">
          Terms and Conditions
        </h1>
        <div className="space-y-4">
          <section>
            <h2 className="text-xl font-semibold mb-2">
              1. Governing Law and Jurisdiction
            </h2>
            <p>
              By accessing and using this website, you agree that all matters
              relating to your access and use are governed by the laws of the
              United Arab Emirates (UAE). Any disputes arising from your use of
              this website will be subject to the exclusive jurisdiction of the
              UAE courts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. Intellectual Property Rights
            </h2>
            <p>
              All content, design elements, and materials on this website are
              the property of H&S Real Estate or are used under license from
              third-party copyright holders. These materials are protected by
              UAE copyright laws and international intellectual property
              agreements.
            </p>
            <p>
              You may download or print content for personal, non-commercial
              use, provided no alterations are made, and all copyright notices
              remain intact. Unauthorized reproduction, distribution, or
              commercial use of any content is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              3. Accuracy of Information
            </h2>
            <p>
              While H&S Real Estate strives to ensure the accuracy of the
              information on this website, we do not warrant or guarantee its
              completeness, reliability, or suitability for any purpose.
            </p>
            <p>
              All information, including property listings, pricing, and
              availability, is subject to change without notice. Users are
              encouraged to verify details independently before making decisions
              based on the content provided.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              4. Limitation of Liability
            </h2>
            <p>
              This website and its content are provided as is without any
              warranties, express or implied. H&S Real Estate disclaims all
              liability for any direct, indirect, incidental, or consequential
              damages arising from the use or inability to use this website,
              including but not limited to errors, omissions, or technical
              issues.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              5. User Responsibilities
            </h2>
            <p>
              Users agree to use this website responsibly and in compliance with
              all applicable laws and regulations.You are prohibited from
              introducing harmful material, attempting unauthorized access, or
              engaging in any activity that disrupts the website&apos;s
              functionality. H&S Real Estate reserves the right to restrict or
              terminate access to users who violate these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              6. Online Payment Terms
            </h2>
            <p>
              When utilizing our online payment services, you agree to provide
              accurate payment information and authorize H&S Real Estate to
              process transactions accordingly.
            </p>
            <p>
              Refund requests for erroneous payments must be submitted within 30
              days of the transaction date and will be processed in accordance
              with our refund policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              7. Data Privacy and Protection
            </h2>
            <p>
              H&S Real Estate is committed to protecting your personal
              information in accordance with UAE data protection laws.For
              detailed information, please refer to our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              8. Compliance with UAE Regulations
            </h2>
            <p>
              As a licensed real estate company, H&S Real Estate adheres to all
              UAE regulations, including anti-money laundering (AML) and
              counter-terrorism financing (CFT) requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              9. Amendments to Terms
            </h2>
            <p>
              H&S Real Estate reserves the right to amend these Terms and
              Conditions at any time without prior notice. Users are encouraged
              to review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              10. Contact Information
            </h2>
            <p>
              For any questions or concerns regarding these Terms and
              Conditions, please contact us at H&S Real Estate:
            </p>
            <br />
            <div className="flex flex-col justify-center gap-4 text-black font-bold ">
              <Link
                target="_blank"
                href="https://maps.app.goo.gl/dQ6Tv5dBQQKkq1dP6"
                className="tracking-wider"
              >
                Grey Square, Showroom 2, Umm Suqeim Road, Al Barsha 2
              </Link>
              <Link
                href="tel:+971526902884"
                className="footer-contact-office-address tracking-wider"
              >
                +971 (0) 4 345 4888
              </Link>
              <Link
                href="mailto:info@hsproperty.ae"
                className="footer-contact-office-address tracking-wider"
              >
                info@hsproperty.ae
              </Link>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditionsPage;
