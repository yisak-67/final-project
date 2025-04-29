import React from "react";
import { LandModel } from "@/lib/models/land";
import { DisplayLand } from "../common";

const LandDetailCard = ({
  land,
  index,
  button,
}: {
  land: LandModel;
  index: number;
  button?: JSX.Element;
}) => {



  
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 ">
      <div className="md:flex gap-4">
        <div className="md:w-1/2 ">
          <img
            src={land.documentHash || ""}
            alt="Land image"
            className="h-full w-full"
          />
        </div>
        <div className="md:w-1/2 ">
          <DisplayLand
            key={`id-${land.locationAddress}`}
            latandlongs={`${land.locationAddress}`}
            index={index}
          />
        </div>
      </div>
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          Owner: {land.postedBy || ""}
        </div>
        <a
          href="#"
          className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
        >
          Address: {land.landAddress}
        </a>
        <p className="mt-2 text-gray-500">Price: ${land.price}</p>
        <p className="mt-2 text-gray-500">Posted by: {land.postedBy}</p>
        <p className="mt-2 text-gray-500">
          Posted on: {land.postedDate?.toDateString()}
        </p>
      </div>
      {button && (
        <div className="flex justify-center items-center m-3 p-5">{button}</div>
      )}
    </div>
  );
};

export default LandDetailCard;