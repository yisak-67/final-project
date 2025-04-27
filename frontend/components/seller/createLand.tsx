"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/lib/appstate";
import { setFilePath, setShowFileUpload, setShowMapbox } from "@/lib/appstate/features/land/actions";
import { LandSelector } from "@/lib/appstate/features/land/selectors";
import { LandModel } from "@/lib/models/land";
import { getCurrentAccount } from "@/lib/services/blockchainService/providers/localHostProvider";
import { createLandWithContract } from "@/lib/services/blockchainService/landcontractServices";

import CustomButton from "../common/customButton";
import CustomFormField from "../common/customFormField";
import FileUpload from "../common/fileUpload";
import LocateMap from "./locateMap";
import { DisplayLand, Loader } from "../common";

const CreateLand: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isFileUploadShowing, isLocateLandShowing, locationAddress, filePath, landArea } = useAppSelector(LandSelector);

  const [isLoading, setIsLoading] = useState(false);
  const [landForm, setLandForm] = useState<LandModel>({
    title: "",
    documentHash: "",
    price: "",
    locationAddress: "",
    landAddress: "",
    detail: "",
    postedBy: "",
    postedDate: new Date(),
    area: "",
  });

  useEffect(() => {
    dispatch(setFilePath(""));
  }, [dispatch]);

  const handleFormFieldChange = (field: keyof LandModel, value: string) => {
    setLandForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userAddress = await getCurrentAccount();

      const landData: LandModel = {
        ...landForm,
        documentHash: filePath || "",
        locationAddress: locationAddress || "",
        postedBy: userAddress || "",
        area: landArea ? String(landArea) : "",
      };

      const result = await createLandWithContract({ ...landData, isVerified: false });

      console.log("Created Land:", result);
      router.push("/p_seller/ManageLand");
    } catch (error) {
      console.error("Error creating land:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start mt-5 px-4 sm:px-6 lg:px-8 min-h-screen">
      {isFileUploadShowing && <FileUpload />}
      {isLocateLandShowing && <LocateMap />}
      {isLoading && <Loader />}
      <ToastContainer />

      <div className="p-4 sm:p-6 lg:p-8 mb-10 border border-gray-200 shadow-lg w-full max-w-5xl rounded-xl bg-white mx-2 sm:mx-4">
        <h1 className="font-epilogue text-2xl sm:text-3xl font-semibold text-black mb-4 sm:mb-6">Create Land</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-1">
              <CustomFormField
                LableName="Land Title *"
                placeholder="Apartment"
                inputType="text"
                isTextArea={false}
                value={landForm.title || ""}
                handleChange={(e) => handleFormFieldChange("title", e.target.value)}
              />
            </div>
            <div className="flex-1">
              <CustomFormField
                LableName="Price *"
                placeholder="1000000"
                inputType="text"
                isTextArea={false}
                value={landForm.price}
                handleChange={(e) => handleFormFieldChange("price", e.target.value)}
              />
            </div>
          </div>

          <div>
            <CustomFormField
              LableName="Detail *"
              placeholder="Land Detail"
              inputType="text"
              isTextArea
              value={landForm.detail}
              handleChange={(e) => handleFormFieldChange("detail", e.target.value)}
            />
          </div>

          <div>
            <CustomFormField
              LableName="Land Address *"
              placeholder="5 Kilo"
              inputType="text"
              isTextArea={false}
              value={landForm.landAddress}
              handleChange={(e) => handleFormFieldChange("landAddress", e.target.value)}
            />
          </div>

          <div className="text-[#4eac6f] font-epilogue text-base sm:text-lg">
            Land Area: {landArea} m²
          </div>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mt-4 mb-14 sm:mt-6">
            {filePath ? (
              <div className="flex-1 flex justify-center lg:justify-start">
                <img
                  src={filePath || "/images/placeholderImage.jpg"}
                  alt="Land Document"
                  className="rounded-lg object-cover w-full max-w-xs h-auto"
                />
              </div>
            ) : (
              <div className="flex-1 flex justify-center lg:justify-start">
                <CustomButton
                  title="Upload Karta"
                  buttonType="button"
                  styles="w-full sm:w-48 h-12 bg-gray-100 text-[#4eac6f] border-gray-200 ring-2 ring-gray-100 shadow-md"
                  handleClick={() => dispatch(setShowFileUpload(true))}
                />
              </div>
            )}

            {locationAddress ? (
              <div className="flex-1 flex justify-center">
                <div className="w-full h-40 sm:h-72">
                  <DisplayLand latandlongs={locationAddress} index={Math.floor(Math.random() * 1_000_000)} />
                </div>
              </div>
            ) : (
              <div className="flex-1 flex justify-center lg:justify-start">
                <CustomButton
                  title="Draw Land"
                  buttonType="button"
                  styles="w-full sm:w-48 h-12 bg-gray-100 text-[#4eac6f] border-gray-200 ring-2 ring-gray-100 shadow-md"
                  handleClick={() => dispatch(setShowMapbox(true))}
                />
              </div>
            )}
          </div>

          <div className="flex justify-center mt-12">
            <CustomButton
              buttonType="submit"
              title="Create Land"
              styles="w-full sm:w-60 h-12 bg-[#4eac6f] text-white font-semibold rounded-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLand;