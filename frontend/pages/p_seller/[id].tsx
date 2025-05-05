import {
  CustomButton,
  CustomFormField,
  DisplayLand,
  Loader,
} from "@/components/common";
import SellerLayout from "@/layout/SellerLayout";
import { useAppSelector } from "@/lib/appstate";
import { LandSelector } from "@/lib/appstate/features/land/selectors";
import { LandModel, LandUpdateModel } from "@/lib/models/land";
import { updateLandInfoWithContract } from "@/lib/services/blockchainService/landcontractServices";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const LandDetail = () => {
  const router = useRouter();
  const id = router.query.id;

  const { sellerLands } = useAppSelector(LandSelector);
  const [land, setLand] = useState<LandModel | null>(null);

  const [isDetailOn, setIsDetailOn] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const currentLand = sellerLands?.find((land) => land.id == id);
    if (currentLand) setLand(currentLand);
  }, []);

  const [updateForm, setUpdateForm] = useState<LandUpdateModel>({
    price: "",
    detail: "",
  });
  const handleFormFieldChange = (
    fieldName: any,
    e: { target: { value: any } }
  ) => {
    setUpdateForm({ ...updateForm, [fieldName]: e.target.value });
  };

  const handleUpdateSubmit = async (e: any) => {
    e.preventDefault();
    setIsUpdating(true);
    const result = await updateLandInfoWithContract({
      id: land?.id,
      price: updateForm.price,
      detail: updateForm.detail,
    });
    router.push("/p_seller/ManageLand");
    setIsUpdating(false);
  };

  const handDetailChange = () => {
    setIsDetailOn(!isDetailOn);
    updateForm.detail = land?.detail;
    updateForm.price = land?.price;
  };

  return (
    <SellerLayout>
      {/* Responsive Container */}
      <div className="md:ml-[270px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center w-full">
          {/* Responsive Heading */}
          <div className="flex justify-center items-center bg-[#4eac6f] w-full sm:w-[380px] rounded-[10px] p-2 mb-4 sm:mb-6">
            <p className="font-serif font-bold text-sm sm:text-lg text-white">
              Land Information with interactive map
            </p>
          </div>

          {isUpdating && <Loader />}

          {/* Responsive Flex Layout */}
          <div className={`flex ${isDetailOn ? "flex-col lg:flex-row" : "flex-col"} w-full gap-4`}>
            {/* Left Section (Land Details) */}
            <div className="bg-white rounded-md shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 w-full">
              <div className="flex justify-end items-center text-sm sm:text-base">
                Owner :-{" "}
                <span className="font-sans text-green-500 mx-2">
                  {land?.postedBy}
                </span>
              </div>

              {/* Responsive Image & Map Section */}
              <div className={`flex ${isDetailOn ? "flex-col" : "flex-col lg:flex-row"} items-center justify-around gap-4 mt-4`}>
                {/* Karta Image */}
                <div className="flex flex-col items-center gap-2 w-full sm:w-[450px]">
                  <span className="font-serif font-bold text-base sm:text-lg">
                    Karta
                  </span>
                  <img
                    src={land?.documentHash || "/images/placeholderImage.jpg"}
                    alt="Land Document"
                    className="rounded-lg w-full h-auto max-h-[300px] object-cover"
                  />
                  <span className="flex items-center text-blue-600 font-bold">
                    <img src="/Icons/Verify.svg" alt="Verification Icon" width={20} height={20} className="mr-1" />
                    {land?.isVerified ? "Verified" : "Unverified"}
                  </span>
                </div>

                {/* Interactive Map */}
                <div className="flex flex-col items-center gap-2 w-full sm:w-[450px]">
                  <span className="font-serif font-bold text-base sm:text-lg">
                    Interactive Map
                  </span>
                  <div className="w-full h-[300px]">
                    <DisplayLand
                      latandlongs={`${land?.locationAddress}`}
                      index={10000}
                    />
                  </div>
                  <span className="flex items-center text-blue-600 font-bold">
                    <img src="/Icons/Verify.svg" alt="Verification Icon" width={20} height={20} className="mr-1" />
                    {land?.isVerified ? "Verified" : "Unverified"}
                  </span>
                </div>
              </div>

              {/* Land Info Section */}
              <div className="bg-white rounded-[10px] p-4 sm:p-5 mt-6">
                <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
                  <span className="text-black font-serif font-bold mr-2">
                    Address :
                  </span>
                  {land?.landAddress}
                </p>
                <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
                  <span className="text-black font-serif font-bold mr-2">
                    Description :
                  </span>
                  {land?.detail}
                </p>
                <p className="text-green-500 text-base sm:text-lg font-bold">
                  <span className="text-black font-serif font-bold mr-2">
                    Price :
                  </span>
                  {land?.price} <span className="text-red-500">matic</span>
                </p>
              </div>

              {/* Update Button */}
              <div className="mt-6 sm:mt-8">
                <CustomButton
                  title={`Update ${isDetailOn ? " > Open" : "Closed"}`}
                  buttonType={undefined}
                  styles="border border-green-500 text-green-500 rounded-md py-2 px-4 transition duration-300 hover:bg-green-500 hover:text-white text-sm sm:text-base"
                  handleClick={handDetailChange}
                />
              </div>

              {/* Posted Date */}
              <div className="flex justify-end items-center mt-6 text-sm sm:text-base">
                Posted on :{" "}
                <span className="font-sans text-blue-500 ml-2">
                  {land?.postedDate?.toString()}
                </span>
              </div>
            </div>

            {/* Update Form (Hidden/Shown) */}
            {isDetailOn && (
              <div className="w-full lg:w-[800px] bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-md shadow-lg">
                <div className="flex items-start justify-start mb-4 sm:mb-6">
                  <h1 className="font-epilogue text-lg sm:text-xl lg:text-2xl text-black">
                    Update Land
                  </h1>
                </div>

                <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-4 sm:gap-6">
                  <CustomFormField
                    LableName="Price *"
                    placeholder="1000000"
                    inputType="text"
                    isTextArea={false}
                    value={updateForm.price as string}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormFieldChange("price", e)}
                  />
                  <CustomFormField
                    LableName="Detail *"
                    placeholder="Land Detail"
                    inputType="text"
                    isTextArea={true}
                    value={updateForm.detail as string}
                    handleChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleFormFieldChange("detail", e)}
                  />

                  <CustomButton
                    buttonType="submit"
                    title="Update Land"
                    styles="bg-[#4eac6f] text-white py-2 px-4 rounded-md hover:bg-[#3d8a5a] transition"
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default LandDetail;