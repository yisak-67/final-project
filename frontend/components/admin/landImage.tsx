import { LandHistory, LandModel } from "@/lib/models/land";
import { getLandHistory } from "@/lib/services/blockchainService/landcontractServices";
import React, { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";

const LandImage = ({
  land,
  onclose,
  isShowImage = true,
}: {
  land: LandModel;
  isShowImage?: boolean;
  onclose: () => void;
}) => {
  const [landHistory, setLandHistory] = useState<LandHistory[]>([]);
  const fetchLandHistory = async (id: string) => {
    try {
      const landHistory = await getLandHistory(id);
      console.log("land history in land image");
      console.log(landHistory);
      setLandHistory(landHistory);
    } catch (error) {
      console.log(
        "Error occured while fetching land history in landImage com."
      );
      console.log({ error });
    }
  };
  useEffect(() => {
    console.log("UseEffect is called");
    if (!isShowImage) {
      fetchLandHistory(land.id?.toString() || "");
    }
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
          {isShowImage ? (
            <img
              src={land.documentHash || ""}
              alt={land.title}
              className="rounded-[#35px]"
              height={400}
              width={400}
            />
          ) : (
            <div className="flex flex-col w-full py-2">
              <div className="flex flex-wrap -m-4">
                {landHistory.map((history, index) => (
                  <div
                    key={index}
                    className="w-full p-4 border border-gray-300"
                  >
                    <div className="flex flex-row px-2 justify-between">
                      <div className="flex flex-row">
                        <img
                          className="rounded-lg"
                          src={history.user.profileHash}
                          alt={""}
                          width={60}
                          height={60}
                        />{" "}
                        <div className="flex flex-col   ml-5">
                          <p className="text-slate-500 font-normal text-[15px]">
                            Owner
                          </p>
                          <p className="font-mono font-semibold sm:text-[15px] text-[8px] text-[#4eac6f] leading-[24px] ">
                            {history.user.fullName}
                          </p>
                          <p className="font-extralight text-[15px]">
                            <span>{history.date.toLocaleDateString()}</span> -{" "}
                            <span>present</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center"></div>
    </div>
  );
};

export default LandImage;
