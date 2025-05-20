"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";


import { useAppDispatch, useAppSelector } from "@/lib/appstate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  
      if (result.status === false) {
        toast.error("Invalid input or you are not authorized to create land. Please verify your account.");
        router.push("/p_seller/CreateLandPage");
        return;
      }
  
      toast.success("Land created successfully!");
      console.log("Created Land:", result);
      router.push("/p_seller/ManageLand");
  
    } catch (error: any) {
      console.error("Error creating land:", error);
  
      // Handle MetaMask RPC error with a user-friendly message
      if (error?.message?.includes("You are not verified to create land")) {
        toast.error("You are not verified to create land. Please complete your verification process before proceeding.");
      } else {
        toast.error("An error occurred while creating the land. Please check your inputs or try again later.");
      }
  
      router.push("/p_seller/CreateLandPage");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="pt-16 md:pt-0 flex justify-center items-start px-2 sm:px-4 md:px-6 min-h-screen bg-gray-50">
      {isFileUploadShowing && <FileUpload />}
      {isLocateLandShowing && <LocateMap />}
      {isLoading && <Loader />}
      <ToastContainer />

      <div className="p-4 sm:p-6 md:p-8 my-4 md:my-6 border border-gray-200 shadow-sm w-full max-w-5xl rounded-xl bg-white mx-2 sm:mx-4">
        <h1 className="font-epilogue text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">Create Land Listing</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-1">
              <CustomFormField
                LableName="Land Title *"
                placeholder="e.g. Prime Commercial Land"
                inputType="text"
                isTextArea={false}
                value={landForm.title || ""}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormFieldChange("title", e.target.value)}
              />
            </div>
            <div className="flex-1 ">
              <CustomFormField
                LableName="Price (ETH) *"
                placeholder="e.g. 1,000,000"
                inputType="text"
                isTextArea={false}
                value={landForm.price || ""}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormFieldChange("price", e.target.value)}
              />
            </div>
          </div>

          <div>
            <CustomFormField
              LableName="Description *"
              placeholder="Detailed description of the land including features, nearby amenities, etc."
              inputType="text"
              isTextArea
              value={landForm.detail || ""}
              handleChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleFormFieldChange("detail", e.target.value)}
            />
          </div>

          <div>
            <CustomFormField
              LableName="Physical Address *"
              placeholder="e.g. Bole, Near Friendship Center"
              inputType="text"
              isTextArea={false}
              value={landForm.landAddress || ""}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormFieldChange("landAddress", e.target.value)}
            />
          </div>

          <div className="text-green-600 font-epilogue text-sm sm:text-base">
            Land Area: {landArea || "0"} m²
          </div>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mt-2 mb-8 sm:mt-4 sm:mb-10">
            {filePath ? (
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full max-w-xs bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={filePath || "/images/placeholderImage.jpg"}
                    alt="Land Document"
                    className="w-full h-48 object-contain"
                  />
                </div>
                <button 
                  type="button"
                  onClick={() => dispatch(setShowFileUpload(true))}
                  className="mt-2 text-sm text-green-600 hover:text-green-700"
                >
                  Change Document
                </button>
              </div>
            ) : (
              <div className="flex-1 flex justify-center">
                <CustomButton
                  title="Upload Title Deed"
                  buttonType="button"
                  styles="w-full sm:w-48 h-12 bg-gray-50 text-green-600 border border-gray-300 hover:bg-gray-100 transition"
                  handleClick={() => dispatch(setShowFileUpload(true))}
                />
              </div>
            )}

            {locationAddress ? (
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full h-40 sm:h-48 md:h-56 bg-gray-100 rounded-lg overflow-hidden">
                  <DisplayLand latandlongs={locationAddress} index={Math.floor(Math.random() * 1_000_000)} />
                </div>
                <button 
                  type="button"
                  onClick={() => dispatch(setShowMapbox(true))}
                  className="mt-2 text-sm text-green-600 hover:text-green-700"
                >
                  Redraw Boundary
                </button>
              </div>
            ) : (
              <div className="flex-1 flex justify-center">
                <CustomButton
                  title="Draw Land Boundary"
                  buttonType="button"
                  styles="w-full sm:w-48 h-12 bg-gray-50 text-green-600 border border-gray-300 hover:bg-gray-100 transition"
                  handleClick={() => dispatch(setShowMapbox(true))}
                />
              </div>
            )}
          </div>

          <div className="flex justify-center mt-6 sm:mt-8">
            <CustomButton
              buttonType="submit"
              title={isLoading ? "Processing..." : "Create Listing"}
              styles="w-full sm:w-64 h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLand;