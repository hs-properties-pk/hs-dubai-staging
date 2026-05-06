import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const BelowHiddenText = ({ textSection, faqItems, home }) => {
  const [show, setShow] = useState(true);
  const [openIndexFaq, setOpenIndexFaq] = useState(null);

  const toggleSubFAQ = (index) => {
    setOpenIndexFaq(openIndexFaq === index ? null : index);
  };

  return (
    <div className="w-full mx-auto font-custom2 bg-white border-t mt-6">
      <div className="max-w-screen-2xl mx-auto bg-white tracking-wide">
        <div className="space-y-4">
          {textSection.map((item, index) => (
            <div key={index} className="property-description">
              <button
                // onClick={() => setShow(!show)}
                className="w-full flex justify-between items-center p-4 md:px-6 text-left text-black font-bold duration-500"
                // className="w-full flex justify-between items-center p-4 text-left text-black font-bold duration-500 cursor-default"
              >
                {home ? (
                  <h2 className="text-xl">{item.question}</h2>
                ) : (
                  <h2 className="text-xl">{item.question}</h2>
                )}

                {/* <span>{show ? <IoIosArrowUp /> : <IoIosArrowDown />}</span> */}
              </button>
              <div style={{ display: show ? "block" : "none" }}>
                {/* <div> */}
                <div
                  className="p-4 text-gray-700 below-text"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                ></div>
                {faqItems && (
                  <div className="max-w-screen-2xl mx-auto p-4 py-20 tracking-wide">
                    <p className="text-xl font-custom font-semibold text-black py-6 text-center">
                      Frequently Asked Questions
                    </p>

                    <div className="space-y-4">
                      {faqItems.map((item, index) => (
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
                              display:
                                openIndexFaq === index ? "block" : "none",
                            }}
                            className=""
                          >
                            <div
                              className="p-4 text-gray-700 "
                              dangerouslySetInnerHTML={{ __html: item.answer }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BelowHiddenText;
