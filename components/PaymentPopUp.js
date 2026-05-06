import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import flags from "react-phone-number-input/flags";
import en from "react-phone-number-input/locale/en";
import CountrySelect from "./CountrySelect";
import { MdLockOutline, MdOutlinePayment } from "react-icons/md";

const PaymentPopUp = ({ setShow }) => {
  // const [showPopup, setShowPopup] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("AE");
  //   const source = "Book a Viewing";
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const date = new Date();

  const timestamp = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    createdAt: timestamp,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handlePhoneNumberChange = (value) => {
    setFormData({
      ...formData,
      phoneNumber: value,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-5 backdrop-filter backdrop-blur-sm opacity-900 blur-xs font-custom2 duration-300 ">
      <div className="bg-white relative rounded-lg shadow-lg flex flex-col  mx-6 bounce-in w-[35rem]">
        <div className="bg-white p-1 absolute top-2 right-2 rounded-full">
          <svg
            className="w-5 h-5  text-black cursor-pointer hover:scale-125 duration-300"
            onClick={() => setShow(false)}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>

        {/* <div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16"> */}
        <div
          className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
          // style="max-width: 600px"
        >
          <div className="w-full pt-1 pb-5">
            <div className="bg-gray-800 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
              {/* <i className="mdi mdi-credit-card-outline text-3xl"></i> */}
              <MdOutlinePayment size="2.2em" />
            </div>
          </div>
          <div className="mb-10">
            <h1 className="text-center font-bold text-xl uppercase">
              Secure payment info
            </h1>
          </div>
          <div className="mb-3 flex -mx-2">
            <div className="px-2">
              <label for="type1" className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-gray-500"
                  name="type"
                  id="type1"
                  checked
                />
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                  className="h-8 ml-3"
                  loading="lazy"
                  alt="payments"
                />
              </label>
            </div>
            <div className="px-2">
              <label for="type2" className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-gray-500"
                  name="type"
                  id="type2"
                />
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png"
                  className="h-8 ml-3"
                  loading="lazy"
                  alt="paypal"
                />
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label className="font-bold text-sm mb-2 ml-1">Name on card</label>
            <div>
              <input
                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-500 transition-colors"
                placeholder="John Smith"
                type="text"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="font-bold text-sm mb-2 ml-1">Card number</label>
            <div>
              <input
                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-500 transition-colors"
                placeholder="0000 0000 0000 0000"
                type="text"
              />
            </div>
          </div>
          <div className="mb-3 -mx-2 flex items-end">
            <div className="px-2 w-1/2">
              <label className="font-bold text-sm mb-2 ml-1">
                Expiration date
              </label>
              <div>
                <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-500 transition-colors cursor-pointer">
                  <option value="01">01 - January</option>
                  <option value="02">02 - February</option>
                  <option value="03">03 - March</option>
                  <option value="04">04 - April</option>
                  <option value="05">05 - May</option>
                  <option value="06">06 - June</option>
                  <option value="07">07 - July</option>
                  <option value="08">08 - August</option>
                  <option value="09">09 - September</option>
                  <option value="10">10 - October</option>
                  <option value="11">11 - November</option>
                  <option value="12">12 - December</option>
                </select>
              </div>
            </div>
            <div className="px-2 w-1/2">
              <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-500 transition-colors cursor-pointer">
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
              </select>
            </div>
          </div>
          <div className="mb-10">
            <label className="font-bold text-sm mb-2 ml-1">Security code</label>
            <div>
              <input
                className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-500 transition-colors"
                placeholder="000"
                type="text"
              />
            </div>
          </div>
          <div>
            <button className=" w-full mx-auto bg-gray-800 hover:bg-gray-700 focus:bg-gray-700 text-white rounded-lg px-3 py-3 font-semibold flex justify-center items-center gap-2">
              <MdLockOutline size="1.2em" />
              <span>PAY NOW</span>
            </button>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default PaymentPopUp;
