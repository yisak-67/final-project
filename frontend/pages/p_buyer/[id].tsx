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
      <div className="flex flex-col lg:flex-row p-4 md:p-6">
        {/* Left Column - Map and History */}
        <div className="w-full lg:w-1/2 xl:w-[540px] mb-6 lg:mb-0 lg:pr-6">
          {/* Map Display */}
          <div className="w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-md">
            <DisplayLand
              latandlongs={land?.locationAddress as string}
              index={
                Math.floor(Math.random() * (324924234234 - +3453463 + 1)) +
                3453463
              }
            />
          </div>
          
          {/* Verification Badge */}
          <div className="flex justify-center items-center mt-3">
            <span className="text-blue-600 font-semibold flex items-center">
              <img src="/Icons/Verify.svg" width={20} height={20} alt="Verified" />
              <span className="ml-2">
                {land?.isVerified ? "Map verified" : "Map unverified"}
              </span>
            </span>
          </div>
          
          {/* Ownership History */}
          <div className="mt-5">
            <h1 className="font-mono font-semibold text-sm md:text-base text-gray-700 mb-3">
              Ownership History
            </h1>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              {!historyFetched ? (
                <div className="flex justify-center items-center h-32">
                  <img
                    src="/images/svg/loadersvg.svg"
                    alt="loader"
                    className="w-20 h-20 object-contain"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  {landHistory.map((history, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="flex items-start">
                          <img
                            className="rounded-full w-12 h-12 md:w-14 md:h-14 object-cover"
                            src={history.user.profileHash}
                            alt="Owner"
                          />
                          <div className="ml-3 md:ml-4">
                            <p className="text-gray-500 text-xs md:text-sm">Current Owner</p>
                            <p className="font-mono font-semibold text-sm md:text-base text-green-600">
                              {history.user.fullName}
                            </p>
                            <p className="text-gray-400 text-xs md:text-sm">
                              <span>{history.date.toLocaleDateString()}</span> - <span>present</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Land Details */}
        <div className="w-full lg:w-1/2 lg:pl-6">
          {/* Title */}
          <h1 className="font-mono font-semibold text-lg md:text-xl lg:text-2xl text-green-600 mb-4">
            {land?.title}
          </h1>
          
          {/* Details Section */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              {/* Description */}
              <div className="flex-1">
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {land?.detail}
                </p>
              </div>
              
              {/* Verification and Document */}
              <div className="flex flex-col items-center lg:items-end space-y-4">
                <span className="text-blue-600 font-semibold flex items-center">
                  <img src="/Icons/Verify.svg" width={20} height={20} alt="Verified" />
                  <span className="ml-2">
                    {land?.isVerified ? "Land verified" : "Land unverified"}
                  </span>
                </span>
                
                <div className="w-full max-w-xs">
                  <img
                    src={land?.documentHash ?? "/images/placeholderImage.jpg"}
                    alt="Land document"
                    className="w-full h-auto rounded-lg border border-gray-200"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="text-center sm:text-left mb-3 sm:mb-0">
              <p className="text-sm md:text-base text-gray-600">Land Area</p>
              <p className="font-semibold text-green-600">{land?.area} m²</p>
            </div>
            
            <div className="text-center sm:text-left mb-3 sm:mb-0">
              <p className="text-sm md:text-base text-gray-600">Price</p>
              <p className="font-semibold text-green-600">
                {land?.price} Matic
              </p>
            </div>
            
            <div className="text-center sm:text-left">
              <p className="text-sm md:text-base text-gray-600">Posted</p>
              <p className="font-semibold text-green-600">
                {moment(land?.postedDate).fromNow()}
              </p>
            </div>
          </div>
          
          {/* Buy Request Section */}
          <div className="mt-8">
            {sentSucess ? (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Result
                  status="success"
                  title="Successfully sent Request to buy this Land!"
                />
              </div>
            ) : (
              <>
                {isBuyRequest ? (
                  <div className="flex flex-col items-center justify-center py-6 bg-white rounded-lg shadow-sm">
                    <Spin size="large" />
                    <p className="mt-3 text-gray-600">Sending request...</p>
                  </div>
                ) : (
                  <button
                    onClick={handleBuyRequest}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Buy Request
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
};

export default LandDetail;