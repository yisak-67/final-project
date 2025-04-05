import BuyerLayout from "@/layout/BuyerLayout";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { LandHistory, LandModel } from "@/lib/models/land";
import { useAppSelector } from "@/lib/appstate";
import { LandSelector } from "@/lib/appstate/features/land/selectors";
import { CustomButton, DisplayLand } from "@/components/common";
import moment from "moment";
import { Spin } from "antd";
import { Button, Result } from "antd";
import { sendBuyRequestwithContract } from "@/lib/services/blockchainService/requestcontractServices";
import { getLandHistory } from "@/lib/services/blockchainService/landcontractServices";

const LandDetail = () => {
  const router = useRouter();
  const id = router.query.id;

  const [land, setLand] = useState<LandModel | null>(null);
  const { avaliableLands } = useAppSelector(LandSelector);
  const [isBuyRequest, setIsBuyRequest] = useState(false);
  const [sentSucess, setSentSucess] = useState(false);
  const [landHistory, setLandHistory] = useState<LandHistory[]>([]);
  const [historyFetched, setHistoryFetched] = useState(false);
  const getHistory = async () => {
    try {
      const landHistory = await getLandHistory(id?.toString() || "");
      setLandHistory(landHistory);
      setHistoryFetched(true);
    } catch (error) {}
  };
  useEffect(() => {
    const currentLand = avaliableLands?.find((land) => land.id == id);
    getHistory();
    if (currentLand) setLand(currentLand);
  }, []);

  const handleBuyRequest = async () => {
    setIsBuyRequest(true);

    const result = await sendBuyRequestwithContract(land?.id as number);
    console.log("result s");
    console.log(result);
    if (result) setSentSucess(true);

    setIsBuyRequest(false);
  };

  return (
    <BuyerLayout>
      <div className="flex  flex-col md:flex-row ">
        <div className="w-full md:w-[540px]  ">
          <DisplayLand
            latandlongs={land?.locationAddress as string}
            index={
              Math.floor(Math.random() * (324924234234 - +3453463 + 1)) +
              3453463
            }
          />
          <span className=" text-blue-600 font-semibold flex flex-row justify-center  mt-2">
            <img src="/Icons/Verify.svg" width={20} height={20} />
            <span className="ml-2 ">
              {" "}
              {land?.isVerified ? "Map verified" : "Map unverified"}{" "}
            </span>
          </span>
          <h1 className="font-mono font-semibold sm:text-[16px] text-[8px] text-gray leading-[24px] px-2 mt-5 ml-2">
            Ownership History
          </h1>
          <div className="flex flex-col p-2 gap-3">
            <div className="flex flex-row px-2 justify-between gap-2">
              {!historyFetched ? (
                <div className="flex justify-center h-full  ">
                  <img
                    src="/images/svg/loadersvg.svg"
                    alt="loader"
                    className="w-[100px] h-[100px] object-contain"
                  />{" "}
                </div>
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
                                Current Owner
                              </p>
                              <p className="font-mono font-semibold sm:text-[15px] text-[8px] text-[#4eac6f] leading-[24px] ">
                                {history.user.fullName}
                              </p>
                              <p className="font-extralight text-[15px]">
                                <span>{history.date.toLocaleDateString()}</span>{" "}
                                - <span>present</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* <div className="flex flex-row">
                <img
                  src={`${
                    "/Icons/profile.svg" ?? "/images/placeholderImage.jpg"
                  }`}
                  alt={""}
                  className=""
                  width={30}
                  height={25}
                />
                <div className="flex flex-col   ml-5">
                  <p className="text-slate-500 font-normal text-[15px]">
                    Previous Owner
                  </p>
                  <p className="font-mono font-semibold sm:text-[15px] text-[8px] text-[#4eac6f] leading-[24px] ">
                    Dawit Teklu
                  </p>
                  <p className="font-extralight text-[15px]">
                    <span>2010</span> - <span>2018</span>
                  </p>
                </div>
              </div> */}

              {/* <div className="flex justify-center items-center">
                <CustomButton
                  title={"View Profile"}
                  buttonType={undefined}
                  styles="border border-green-500 text-green-500 rounded-md  px-2 transition duration-300 hover:bg-green-500 hover:text-white"
                  handleClick={() => {}}
                />
              </div> */}
            </div>
          </div>
        </div>
        <div className="ml-10 w-full p-1">
          <p className="font-mono font-semibold sm:text-[15px] text-[8px] text-[#4eac6f] leading-[24px]">
            {land?.title}
          </p>
          <div>
            <div className="flex flex-col md:flex-row  justify-between mt-5">
              <p className="text-justify max-w-[740px] ">{land?.detail}</p>
              <div className="flex flex-col gap-1">
                <span className=" text-blue-600 font-semibold flex flex-row">
                  <img src="/Icons/Verify.svg" width={20} height={20} />
                  <span className="ml-2 ">
                    {" "}
                    {land?.isVerified
                      ? "Land verified"
                      : "Land unverified"}{" "}
                  </span>
                </span>
                <img
                  src={`${
                    land?.documentHash ?? "/images/placeholderImage.jpg"
                  }`}
                  alt={""}
                  className="object-contain"
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center ">
            <p className="font-epilogue sm:text-[15px] text-[15px] leading-[60px] text-[#4eac6f]">
              Land Area : {land?.area} m2
            </p>
            <p className="text-gray-500 px-4 my-1">
              price <span className="mx-2"> {land?.price} </span>
              {"Matic "}
            </p>
            <p className="text-gray-500 px-4 my-1">
              posted <span> {moment(land?.postedDate).fromNow()} </span>
            </p>
          </div>
          <>
            {sentSucess ? (
              <div>
                <Result
                  status="success"
                  title="Successfully sent  Request to buy this Land!"
                />
              </div>
            ) : (
              <>
                {isBuyRequest ? (
                  <div className="flex flex-col gap-2 flex-wrap items-center justify-center py-3 mt-2">
                    <Spin size="large" />
                    <p>Sending...</p>
                  </div>
                ) : (
                  <div
                    onClick={handleBuyRequest}
                    className="bg-[#4acd8d] text-white p-2 rounded-lg shadow-lg flex  justify-center items-center hover:cursor-pointer mt-10  "
                  >
                    <p className="font-bold">Buy Request</p>
                  </div>
                )}
              </>
            )}
          </>
        </div>
      </div>
    </BuyerLayout>
  );
};

export default LandDetail;
