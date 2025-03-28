import React from "react";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <div className="bg-white-300 pt-44 pb-24">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
        {/* Logo and Description Section */}
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start">
          <img
            height={25}
            width={100}
            src="/Icons/newlogo.png"
            alt="Land Registration Logo"
          />
          <p className="mb-4">
            <strong className="font-medium">Land Registration</strong> is your
            go-to site for all your land registration, selling, and buying needs.
            Simplifying the complexities of land administration, we offer a
            seamless platform to facilitate your transactions.
          </p>
          <p className="text-gray-400">
            ©{currentYear} - Land Registration
          </p>
        </div>

        {/* Important Links Section */}
        <div className="row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-9 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">
            Important Links
          </p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-green-500 cursor-pointer transition-all">
              About us
            </li>
            <li className="my-2 hover:text-green-500 cursor-pointer transition-all">
              Services
            </li>
          </ul>
        </div>

        {/* Engage Section */}
        <div className="row-span-2 sm:col-span-2 sm:col-start-9 sm:col-end-11 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">Engage</p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-green-500 cursor-pointer transition-all">
              FAQ
            </li>
            <li className="my-2 hover:text-green-500 cursor-pointer transition-all">
              Guides to add land
            </li>
            <li className="my-2 hover:text-green-500 cursor-pointer transition-all">
              Privacy Policy
            </li>
            <li className="my-2 hover:text-green-500 cursor-pointer transition-all">
              Terms of Service
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="row-span-2 sm:col-span-2 sm:col-start-11 sm:col-end-13 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">Contact us</p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-green-500 cursor-pointer transition-all">
              Affiliate
            </li>
            <li className="my-2 hover:text-green-500 cursor-pointer transition-all">
              Become Partner
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;