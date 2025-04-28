import { LandModel } from "@/lib/models/land";
import React, { useEffect } from "react";
import Image from "next/image";
import { DisplayLand } from "../common";
import moment from "moment";
import { useRouter } from "next/router";

const LandCard: React.FC<{ landItem: LandModel; index: number }> = ({
  landItem,
  index,
}) => {
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <div className="w-full p-4 md:p-6 bg-white rounded-xl hover:shadow-xl transition-shadow duration-300 mb-6 border border-gray-200">
      {/* Title and View Details Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h1 className="font-mono font-semibold text-lg md:text-xl text-gray-800 truncate max-w-xs md:max-w-md lg:max-w-2xl">
          {landItem.title}
        </h1>
        <button
          onClick={() => router.push(`/p_buyer/${landItem["id"]}`)}
          className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105 whitespace-nowrap text-sm md:text-base"
        >
          <span className="mr-2">View Details</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>

      {/* Owner */}
      <p className="text-sm md:text-base text-gray-500 mb-4">
        Owned by{" "}
        <span className="text-gray-600 font-medium">{landItem.postedBy}</span>
      </p>

      {/* Main Content - Image and Details */}
      <div className="flex flex-col  md:flex-row md:mb-15 mt-4 gap-4 mb-4">
        {/* Map Display */}
        <div className="w-full md:w-2/5 h-48 md:h-56 rounded-lg overflow-hidden shadow-md">
          <DisplayLand
            latandlongs={landItem.locationAddress as string}
            index={Math.floor(Math.random() * (324924234234 - +3453463 + 1)) + 3453463}
          />
        </div>

        {/* Document Image and Description */}
        <div className="w-full md:w-3/5 md:mt-15 flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2 h-48 md:h-56 rounded-lg overflow-hidden shadow-md">
            <img
              src={`${landItem?.documentHash ?? "/images/placeholderImage.jpg"}`}
              alt={landItem.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="w-full md:w-1/2 text-gray-600 text-sm md:text-base line-clamp-3 md:line-clamp-5 lg:line-clamp-6 mb-7">
        {landItem.detail}
      </p>

      {/* Meta Information */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex flex-wrap gap-4">
          {/* Verification */}
          <div className="flex items-center text-sm md:text-base">
            <Image
              src="/Icons/Verify.svg"
              width={18}
              height={18}
              alt="Verify Icon"
              className="mr-1"
            />
            <span
              className={
                landItem.isVerified ? "text-green-600" : "text-blue-600"
              }
            >
              {landItem.isVerified ? "Verified" : "Unverified"}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center text-sm md:text-base">
            <img
              src="/Icons/price.svg"
              width={16}
              height={16}
              alt="Price"
              className="mr-1"
            />
            <span className="font-medium">{landItem.price} ETH</span>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm md:text-base">
            <img
              src="/Icons/location.svg"
              width={16}
              height={16}
              alt="Location"
              className="mr-1"
            />
            <span className="text-gray-600 truncate max-w-xs md:max-w-sm lg:max-w-md">
              {landItem.landAddress}, Ethiopia
            </span>
          </div>
        </div>

        {/* Posted Date */}
        <div className="text-sm md:text-base text-gray-500 whitespace-nowrap">
          Posted{" "}
          <span className="font-medium">
            {moment(landItem.postedDate).fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LandCard;