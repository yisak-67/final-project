import { CustomButton, DisplayLand, Loader } from "@/components/common";
import { LandModel } from "@/lib/models/land";
import {
  getLandHistory,
  getUnverifiedLandsWithContract,
  verifyLand,
} from "@/lib/services/blockchainService/landcontractServices";
import { useEffect, useState } from "react";
import LandDetailDialog from "./landDetailDialog";
import LandImage from "./landImage";
const UnverifiedLands = () => {
  const [showLandDetail, setShowLandDetail] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [landsFetched, setLandsFetched] = useState(false);

  let [unVerifiedLands, setUnVerifiedLands] = useState<LandModel[]>([]);
  const [showLandImage, setShowLandImage] = useState(false);
  const getLands = async () => {
    const fetchedUnVerifiedLands = await getUnverifiedLandsWithContract();
    setUnVerifiedLands(fetchedUnVerifiedLands);
    setLandsFetched(true);
    return fetchedUnVerifiedLands;
  };

  useEffect(() => {
    console.log("UseEffect is called");
    getLands();
  }, []);

  return (
    <>
      {showLoader && <Loader />}
      {landsFetched ? (
        unVerifiedLands.length ? (
          <div className="container mx-auto h-full ">
            <div className="flex flex-wrap gap-[15px] mt-[20px] w-full p-2">
              {unVerifiedLands.map((land, i: number) => (
                <div
                  key={i}
                  className=" mt-5 flex flex-wrap flex-col shadow-md p-2 w-1/2"
                >
                  <CustomButton
                    title={"Get Land History"}
                    buttonType={undefined}
                    styles="border border-green-500 text-green-500 rounded-md py-2 px-4 transition duration-300 hover:bg-green-500 hover:text-white"
                    handleClick={() => {
                      getLandHistory(land.id?.toString() || "");
                    }}
                  />

                  {showLandImage && (
                    <LandImage
                      land={land}
                      onclose={() => setShowLandImage(false)}
                    />
                  )}
                  {showLandDetail && (
                    <LandDetailDialog
                      land={land}
                      index={i}
                      onClose={setShowLandDetail}
                    />
                  )}
                  {land.locationAddress && (
                    <DisplayLand
                      key={`id-${land.locationAddress}`}
                      latandlongs={`${land.locationAddress}`}
                      index={i}
                    />
                  )}
                  <div className="flex items-center justify-between">
                    <p className="uppercase tracking-wide text-sm text-green-500 font-semibold mt-5 ml-2">
                      Title: {land.title}
                    </p>
                    <p className="mt-2 text-gray-500 ml-2">
                      <span className="font-epilogue font-semibold">
                        Price:{" "}
                      </span>
                      <span className="text-red-500">{land.price}.0 birr</span>
                    </p>
                  </div>

                  <p className="mt-2 text-gray-500 ml-2">
                    Address: {land.landAddress}, Ethiopia.
                  </p>
                  <div className="mt-4 flex items-center justify-between ml-2">
                    <CustomButton
                      title={"View Detail"}
                      buttonType={undefined}
                      styles="border border-green-500 text-green-500 rounded-md py-2 px-4 transition duration-300 hover:bg-green-500 hover:text-white"
                      handleClick={() => setShowLandDetail(true)}
                    />
                    <CustomButton
                      title={"See land image"}
                      buttonType={undefined}
                      styles="border border-green-500 text-green-500 rounded-md py-2 px-4 transition duration-300 hover:bg-green-500 hover:text-white"
                      handleClick={() => setShowLandImage(true)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            You don't have any land to be verified!
          </div>
        )
      ) : (
        <div className="flex justify-center h-full  ">
          <img
            src="/images/svg/loadersvg.svg"
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />{" "}
        </div>
      )}
    </>
  );
};

export default UnverifiedLands;
