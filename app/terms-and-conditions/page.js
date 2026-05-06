import TermsAndConditionsPage from "@/components/pages/TermsAndConditionsPage";
import React from "react";

export const metadata = {
  title: "Terms and Conditions | H&S Real Estate",
  description:
    "Review the terms and conditions of using H&S Real Estate's website and services. Understand your rights, obligations, and our policies for a seamless experience.",
};

function page() {
  return (
    <div>
      <TermsAndConditionsPage />
    </div>
  );
}

export default page;
