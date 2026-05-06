import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const BelowHiddenTextNew = ({ textSection, faqItems }) => {
  const [openIndexFaq, setOpenIndexFaq] = useState(null);

  const toggleSubFAQ = (index) => {
    setOpenIndexFaq(openIndexFaq === index ? null : index);
  };

  return (
    <div className="w-full mx-auto font-custom2 bg-white border-t mt-6 px-4">
      <div className="max-w-screen-2xl mx-auto bg-white tracking-wide">
        <div className="space-y-4">
          {/* {Object.entries(textSection).map(([key, item]) => ( */}
          <div className="border-b property-description">
            {textSection?.question && (
              <div
                // onClick={() => toggleQuestion(key)}
                className="w-full flex justify-between items-center p-4 text-left text-black font-bold duration-500"
              >
                <h2 className="text-xl">{textSection.question}</h2>
              </div>
            )}
            {textSection?.answer && (
              <div
                className="p-4 text-gray-700 below-hidden-text"
                dangerouslySetInnerHTML={{ __html: textSection.answer }}
              ></div>
            )}
            {textSection?.faqItems && (
              <div className="max-w-screen-2xl mx-auto p-4 tracking-wide">
                <p className="text-xl font-custom font-semibold text-black py-6 text-center">
                  {textSection.faqSectionTitle || "Frequently Asked Questions"}
                </p>

                <div className="space-y-4">
                  {textSection?.faqItems.map((item, index) => (
                    <div key={index} className="border rounded-lg">
                      <button
                        onClick={() => toggleSubFAQ(index)}
                        className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-900"
                      >
                        <h3>{item.question}</h3>
                        <span>
                          {openIndexFaq === index ? (
                            <IoIosArrowUp />
                          ) : (
                            <IoIosArrowDown />
                          )}
                        </span>
                        {/* <span>{openIndexFaq === index ? "-" : "+"}</span> */}
                      </button>
                      <div
                        style={{
                          display: openIndexFaq === index ? "block" : "none",
                        }}
                        className=""
                      >
                        <div className="p-4 text-gray-700 font-custom3 leading-relaxed">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BelowHiddenTextNew;
