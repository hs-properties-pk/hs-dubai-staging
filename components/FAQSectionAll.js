import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FAQSectionAll = ({ faqItems }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-screen mx-auto font-custom2 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto bg-gray-50 tracking-wide py-20">
        <p className="text-2xl font-custom font-semibold text-black py-4 md:pb-8 text-center">
          Frequently Asked Questions
        </p>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border rounded-lg">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-900"
              >
                <h3>{item.question}</h3>
                <span>
                  {openIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
              </button>
              <div style={{ display: openIndex === index ? "block" : "none" }}>
                <div
                  className="p-4 text-gray-700"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSectionAll;
