import {  LandHistory, LandModel } from "@/lib/models/land";
import { getLandHistory } from "@/lib/services/blockchainService/landcontractServices";
import React, { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";

const LandHistory = ({
  land,
  onclose,
}: {
  land: LandModel;
  isShowImage?: boolean;
  onclose: () => void;
}) => {
  const [landHistory, setLandHistory] = useState<LandHistory[]>([]);
  const fetchLandHistory = async (id: string) => {
    try {
      const landHistory = await getLandHistory(id);
      setLandHistory(landHistory);
    } catch (error) {}
  };
  useEffect(() => {
    fetchLandHistory;
  }, []);
  return (
    <div className="w-[500px] h-full bg-slate-100 border-gray-100 shadow ring-1 ring-gray-50  fixed right-0 top-0 p-6 z-[1000] text-white rounded-tl-[25px]  transition duration-400 ease-in-out    ">
      <div className="flex flex-col  justify-start items-start gap-[#100px]">
        <button className="mt-1  ">
          <AiOutlineLeft className="text-black" size={30} onClick={onclose} />
        </button>
      </div>
      <div>
        <div className=" mt-10 flex justify-center items-center">
          <div>{landHistory.toString()}</div>
        </div>
      </div>

      <div className="flex justify-center items-center"></div>
    </div>
  );
};

export default LandHistory;
