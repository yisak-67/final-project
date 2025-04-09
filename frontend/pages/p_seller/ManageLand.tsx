import { CustomButton, DisplayLand } from "@/components/common";
import CreateLand from "@/components/seller/createLand";
import SellerLayout from "@/layout/SellerLayout";
import { LandModel, parseLandData } from "@/lib/models/land";
import { getAllLandsListWithContract } from "@/lib/services/blockchainService/landcontractServices";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/lib/appstate";
import { LandSelector } from "@/lib/appstate/features/land/selectors";
import { getSellerLands } from "@/lib/appstate/features/land/actions";
import { AiFillQuestionCircle } from "react-icons/ai";
const Manage_land = () => {
  const dispatch = useAppDispatch();
  const { sellerLands } = useAppSelector(LandSelector);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getLands = async () => {
      const allLandss = await getAllLandsListWithContract();
      dispatch(getSellerLands(allLandss));
    };

    getLands();
    setIsLoading(true);
  }, []);

  return (
    <SellerLayout>
      <div className="ml-[270px] h-full">
        <div className="">
          <h1 className="font-epilogue font-bold sm:text-[18px] text-[12x] text-[#4eac6f] leading-[30px] ml-4">
            Manage Land
          </h1>
          <div className="flex flex-row justify-between items-center">
            <div>
              <p className="font-epilogue font-bold sm:text-[20px] text-[14px] leading-[38px]"></p>
            </div>
            <div>
              <CustomButton
                title={"Add New Land  +"}
                styles="bg-[#4eac6f] text-white mr-5 w-48 h-[12px]"
                buttonType={undefined}
                handleClick={() => router.push("/p_seller/CreateLandPage")}
              />
            </div>
          </div>
        </div>

        <div className="px-2 ml-2 font-epilogue font-semibold sm:text-[18px] text-[12x] text-[#1c1e1c] leading-[30px] mt-3 ">
          <p>My Lands</p>
        </div>

        <div className="container mx-auto">
          <div className="flex flex-wrap justify-start gap-[15px] mt-[40px] w-full p-2 ">
            {sellerLands && (
              <>
                {sellerLands.length > 0 ? (
                  sellerLands.map((land, i: number) => (
                    <div
                      key={i}
                      className="cursor-pointer mt-5 flex flex-wrap flex-col shadow-md"
                    >
                      {land.locationAddress && (
                        <DisplayLand
                          key={`id-${land.locationAddress}`}
                          latandlongs={`${land.locationAddress}`}
                          index={i}
                        />
                      )}
                      <div className="flex items-center justify-between">
                        <p className="uppercase tracking-wide text-sm text-green-500 font-semibold mt-5 ml-2">
                          Land for sale : {land.title}
                        </p>
                        <p className="mt-2 text-gray-500 ml-2">
                          <span className="font-epilogue font-semibold">
                            {" "}
                            Price:{" "}
                          </span>
                          <span className="text-red-500">
                            {land.price}.0 birr
                          </span>
                        </p>
                      </div>

                      <p className="mt-2 text-gray-500 ml-2">
                        Address: {land.landAddress}, Ethiopia.
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="mt-2 text-gray-500 ml-2">
                          Posted by: Harry aaa
                        </p>
                        <p className="mt-2 text-gray-500 ml-2">
                          date:{land.postedDate?.toLocaleDateString("en-US")}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between ml-2">
                        <span className="ml-2 text-blue-600 font-bold flex flex-row">
                          {land.isVerified ? (
                            <img
                              src="/Icons/Verify.svg"
                              width={20}
                              height={20}
                            />
                          ) : (
                            <AiFillQuestionCircle size={20} />
                          )}
                          {land.isVerified ? "Verified" : "Unverified"}
                        </span>
                        <CustomButton
                          title={"View Detail"}
                          buttonType={undefined}
                          styles="border border-green-500 text-green-500 rounded-md py-2 px-4 transition duration-300 hover:bg-green-500 hover:text-white"
                          handleClick={() =>
                            router.push(`/p_seller/${land["id"]}`)
                          }
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center">
                    You dont have any land yet!
                  </div>
                )}{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default Manage_land;
