import PrivacyPolicyPage from "@/components/pages/PrivacyPolicyPage";
import React from "react";

export const metadata = {
  title: "Privacy Policy | H&S Real Estate",
  description:
    "Learn how H&S Real Estate collects, uses, and protects your personal data. Your privacy is our priority. Read our detailed privacy policy for transparency.",
};

function page() {
  return (
    <div>
      <PrivacyPolicyPage />
    </div>
  );
}

export default page;
