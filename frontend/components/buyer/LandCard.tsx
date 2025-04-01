import { LandModel } from "@/lib/models/land";
import React, { useEffect } from "react";
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
    <div className="px-2   flex flex-col gap-4 border-b-2 pb-2">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-mono font-semibold sm:text-[18px] text-[10x] text-[#091d10] leading-[24px]  mt-5">
          {landItem.title}
        </h1>
        <div
          onClick={() => router.push(`/p_buyer/${landItem["id"]}`)}
          className="bg-[#4acd8d] text-white p-2 rounded-lg shadow-lg flex items-center justify-between hover:cursor-pointer "
        >
          <p className="font-bold">View detail</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mx-2"
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
        </div>
      </div>
      <p className="flex-1 font-mono font-normal text-[12px] text-[#808191] truncate px">
        Owned by{" "}
        <span className="text-[#b2b3bd] text-[15px]">{landItem.postedBy}</span>
      </p>

      <div className="flex flex-row justify-between">
        <p className="text-justify  w-[700px] ">{landItem.detail}</p>
        <div className=" ">
          <img
            src={`${landItem?.documentHash ?? "/images/placeholderImage.jpg"}`}
            alt={""}
            className=""
            width={300}
            height={300}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-row">
          <span className=" text-blue-600 font-semibold flex flex-row">
            <img src="/Icons/Verify.svg" width={20} height={20} />
            <span className="ml-2 ">
              {" "}
              {landItem.isVerified ? "Land verified" : "Land unverified"}{" "}
            </span>
          </span>

          <span className="flex flex-row  ml-4">
            <img
              className=""
              src="/Icons/location.svg"
              width={18}
              height={18}
            />
            <span className="ml-1">{landItem.landAddress} , Ethiopia</span>
          </span>
        </div>

        <p className="text-gray-500 px-4 my-1">
          posted <span> {moment(landItem.postedDate).fromNow()} </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default LandCard;
