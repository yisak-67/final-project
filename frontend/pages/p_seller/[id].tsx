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
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div className="flex flex-col items-center">
      <div className="bg-[#4eac6f] w-full max-w-md text-center py-3 rounded-lg mb-6">
        <p className="text-white text-base sm:text-lg font-bold font-serif">
          Land Information with Interactive Map
        </p>
      </div>

      {isUpdating && <Loader />}

      <div className={`flex flex-col gap-6 lg:flex-row w-full`}>
        {/* Land Information Card */}
        <div className="w-full lg:w-1/2 bg-white shadow-xl rounded-lg p-4 sm:p-6 space-y-6">
          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="text-gray-600">Owner:</span>
            <span className="text-green-600 font-medium">{land?.postedBy}</span>
          </div>

          <div className="flex flex-col gap-6">
            {/* Karta Section */}
            <div className="flex flex-col items-center">
              <p className="text-base sm:text-lg font-semibold font-serif mb-2">Karta</p>
              <img
                src={land?.documentHash || "/images/placeholderImage.jpg"}
                alt="Land Document"
                className="rounded-md w-full max-w-sm h-auto object-cover"
              />
              <div className="flex items-center mt-2 text-sm font-semibold text-blue-600">
                <img src="/Icons/Verify.svg" alt="Verified" className="w-5 h-5 mr-1" />
                {land?.isVerified ? "Verified" : "Unverified"}
              </div>
            </div>

            {/* Map Section */}
            <div className="flex flex-col items-center">
              <p className="text-base sm:text-lg font-semibold font-serif mb-2">Interactive Map</p>
              <div className="w-full h-[250px] sm:h-[350px]">
                <DisplayLand latandlongs={land?.locationAddress ?? ""} index={10000} />
              </div>
              <div className="flex items-center mt-2 text-sm font-semibold text-blue-600">
                <img src="/Icons/Verify.svg" alt="Verified" className="w-5 h-5 mr-1" />
                {land?.isVerified ? "Verified" : "Unverified"}
              </div>
            </div>
          </div>

          {/* Address & Detail */}
          <div className="text-sm sm:text-base space-y-2 mt-4">
            <p>
              <span className="font-serif font-semibold">Address:</span> {land?.landAddress}
            </p>
            <p>
              <span className="font-serif font-semibold">Description:</span> {land?.detail}
            </p>
            <p className="text-green-600 font-bold">
              <span className="text-black">Price:</span> {land?.price}{" "}
              <span className="text-red-500">matic</span>
            </p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <CustomButton
              title={`Update ${isDetailOn ? " > Open" : "Closed"}`}
              buttonType={undefined}
              styles="border border-green-500 text-green-500 rounded-md py-2 px-4 hover:bg-green-500 hover:text-white text-sm sm:text-base transition"
              handleClick={handDetailChange}
            />
            <p className="text-sm text-blue-500">
              Posted on:{" "}
              <span className="text-sm font-medium">{land?.postedDate?.toString()}</span>
            </p>
          </div>
        </div>

        {/* Update Form */}
        {isDetailOn && (
          <div className="w-full lg:w-1/2 bg-white shadow-xl rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Update Land</h2>
            <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-4">
              <CustomFormField
                LableName="Price *"
                placeholder="1000000"
                inputType="text"
                isTextArea={false}
                value={updateForm.price || ""}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormFieldChange("price", e)}
              />
              <CustomFormField
                LableName="Detail *"
                placeholder="Land Detail"
                inputType="text"
                isTextArea={true}
                value={updateForm.detail || ""}
                handleChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleFormFieldChange("detail", e)}
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