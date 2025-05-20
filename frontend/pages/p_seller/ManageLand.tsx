import { CustomButton, DisplayLand } from "@/components/common";
import { SellerLayout } from "@/layout/SellerLayout";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/lib/appstate";
import { LandSelector } from "@/lib/appstate/features/land/selectors";
import { getSellerLands } from "@/lib/appstate/features/land/actions";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getAllLandsListWithContract } from "@/lib/services/blockchainService/landcontractServices";

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
    setIsLoading(false);
  }, []);

  return (
<SellerLayout>
  <div className="p-4 w-full max-w-7xl mx-auto ml-0 lg:ml-[270px">
    {/* Header Section */}
    <div className="flex flex-col gap-4 mb-6">
      <h1 className="font-epilogue font-bold text-2xl text-green-600">
        Manage Land
      </h1>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-auto" />
        <div className="w-full sm:w-auto">
          <CustomButton
            title="Add New Land +"
            styles="bg-green-600 text-white w-full sm:w-48 h-12 text-sm sm:text-base hover:bg-green-700 transition-colors"
            buttonType="button"
            handleClick={() => router.push("/p_seller/CreateLandPage")}
          />
        </div>
      </div>
    </div>

    {/* My Lands Section */}
    <div className="mb-6">
      <h2 className="font-epilogue font-semibold text-xl text-gray-800">
        My Lands
      </h2>
    </div>

    {/* Lands Grid */}
    {isLoading ? (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading lands...</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sellerLands && sellerLands.length > 0 ? (
          sellerLands.map((land, i) => (
            <div
              key={land.id || i}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {land.locationAddress && (
                <div className="h-48 overflow-hidden">
                  <DisplayLand
                    key={`id-${land.locationAddress}`}
                    latandlongs={`${land.locationAddress}`}
                    index={i}
                  />
                </div>
              )}
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-base font-semibold text-green-700 truncate">
                    {land.title}
                  </h3>
                  <p className="text-gray-700 text-sm">
                    <span className="font-semibold">Price: </span>
                    <span className="text-red-500">
                      {land.price}.0 birr
                    </span>
                  </p>
                </div>

                <p className="text-gray-500 text-sm mb-4 truncate">
                  {land.landAddress}, Ethiopia
                </p>

                <div className="flex justify-between text-xs text-gray-400 mb-4">
                  <p>Posted by: {land.postedBy || "Unknown"}</p>
                  <p>{land.postedDate ? new Date(land.postedDate).toLocaleDateString("en-US") : "N/A"}</p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-blue-600 font-medium text-xs">
                    {land.isVerified ? (
                      <>
                        <img
                          src="/Icons/Verify.svg"
                          width={16}
                          height={16}
                          alt="Verified"
                          className="mr-1"
                        />
                        Verified
                      </>
                    ) : (
                      <>
                        <AiFillQuestionCircle size={16} className="mr-1" />
                        Unverified
                      </>
                    )}
                  </div>

                  <CustomButton
                    title="View Detail"
                    buttonType="button"
                    styles="border border-green-600 text-green-600 rounded-md py-1 px-3 text-xs hover:bg-green-600 hover:text-white transition"
                    handleClick={() => router.push(`/p_seller/${land.id}`)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">
              You don't have any land registered yet!
            </p>
            <CustomButton
              title="Register Your First Land"
              styles="mt-4 bg-green-600 text-white hover:bg-green-700"
              buttonType="button"
              handleClick={() => router.push("/p_seller/CreateLandPage")}
            />
          </div>
        )}
      </div>
    )}
  </div>
</SellerLayout>

  );
};

export default Manage_land;