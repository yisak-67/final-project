import { useAppDispatch, useAppSelector } from "@/lib/appstate";
import {
  setFilePath,
  setShowFileUpload,
  setShowMapbox,
} from "@/lib/appstate/features/land/actions";
import { LandSelector } from "@/lib/appstate/features/land/selectors";
import { LandModel } from "@/lib/models/land";
import {
  getCurrentAccount,
  mainContractProvider,
} from "@/lib/services/blockchainService/providers/localHostProvider";
import {
  createLandWithContract,
  getLandWithContract,
  getTotalLandsCountWithContract,
} from "@/lib/services/blockchainService/landcontractServices";
import React, { useState } from "react";
import CustomButton from "../common/customButton";
import CustomFormField from "../common/customFormField";
import FileUpload from "../common/fileUpload";
import LocateMap from "./locateMap";
import { DisplayLand, Loader } from "../common";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

let window: any;

const CreateLand = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setFilePath(""));
  }, []);

  const router = useRouter();

  const {
    isFileUploadShowing,
    isLocateLandShowing,
    locationAddress,
    filePath,
    landArea,
  } = useAppSelector(LandSelector);

  const [isLoading, setIsLoading] = useState(false);

  const [landForm, setLandForm] = useState<LandModel>({
    title: "",
    documentHash: "",
    price: "",
    locationAddress: "",
    landAddress: "",
    detail: "",
    postedBy: "0x43dsfadsjkfhasdkfjasdhf",
    postedDate: new Date(),
    area: "",
  });
console.log(landForm);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const useAddress = getCurrentAccount();

    const result = await createLandWithContract({
      title: landForm.title,
      documentHash: filePath as string,
      price: landForm.price,
      locationAddress: locationAddress as string,
      landAddress: landForm.landAddress,
      detail: landForm.detail,
      postedBy: `${useAddress}`,
      postedDate: landForm.postedDate,
      isVerified: false,
      area: `${landArea}`,
    });

    console.log("land result");
    console.log(result);
    setIsLoading(false);
    router.push("/p_seller/ManageLand");
  };

  const handleFormFieldChange = (
    fieldName: any,
    e: { target: { value: any } }
  ) => {
    setLandForm({ ...landForm, [fieldName]: e.target.value });
  };

  return (
    <div className="h-full flex justify-center items-center mt-5">
      {isFileUploadShowing && <FileUpload />}
      {isLocateLandShowing && <LocateMap />}
      {isLoading && <Loader />}
      <ToastContainer />
      <div className="p-10 mb-4  border border-solid border-gray-100 shadow ring-1 w-[900px] ring-gray-50">
        <div className="flex flex-1 items-start justify-start">
          <h1 className="font-epilogue sm:text-[20px] text-[25px] leading-[60px] text-black">
            Create Land
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className=" mt-6 flex flex-col gap-[30px]"
        >
          <div className="flex flex-row gap-6">
            <CustomFormField
              LableName="Land Title *"
              placeholder="Apartment"
              inputType="text"
              isTextArea={false}
              value={landForm.title as string}
              handleChange={(e: { target: { value: any } }) =>
                handleFormFieldChange("title", e)
              }
            />
            <CustomFormField
              LableName="Price *"
              placeholder="1000000"
              inputType="text"
              isTextArea={false}
              value={landForm.price as string}
              handleChange={(e: { target: { value: any } }) =>
                handleFormFieldChange("price", e)
              }
            />
          </div>
          <CustomFormField
            LableName="Detail *"
            placeholder="Land Detail"
            inputType="text"
            isTextArea={true}
            value={landForm.detail as string}
            handleChange={(e: { target: { value: any } }) =>
              handleFormFieldChange("detail", e)
            }
          />

          <CustomFormField
            LableName="Land Address *"
            placeholder="5 Kilo"
            inputType="text"
            isTextArea={false}
            value={landForm.landAddress as string}
            handleChange={(e: { target: { value: any } }) =>
              handleFormFieldChange("landAddress", e)
            }
          />

          <div>
            <p className="font-epilogue sm:text-[15px] text-[15px] leading-[60px] text-[#4eac6f]">
              Land Area : {landArea} m2
            </p>
          </div>

          <div className="w-[#200px] flex flex-row justify-between">
            {filePath ? (
              <div className=" mt-10 flex justify-center items-center">
                <img
                  src={`${filePath ?? "/images/placeholderImage.jpg"}`}
                  alt={""}
                  className="rounded-[#35px]"
                  height={400}
                  width={400}
                />
              </div>
            ) : (
              <CustomButton
                title="Upload Karta"
                buttonType="button"
                styles="w-48 border-gray-100 shadow ring-2 ring-gray-100 bg-gray-100 text-[#4eac6f] flex-shrink-0 h-[20px]"
                handleClick={() => dispatch(setShowFileUpload(true))}
              />
            )}

            {locationAddress ? (
              <div className="mt-10 flex justify-center items-center h-[300px] w-[350px]">
                <DisplayLand
                  latandlongs={`${locationAddress}`}
                  index={
                    Math.floor(Math.random() * (324924234234 - +3453463 + 1)) +
                    3453463
                  }
                />
              </div>
            ) : (
              <CustomButton
                title="Draw Land"
                buttonType="button"
                styles="w-48 border-gray-100 shadow ring-2 ring-gray-100 bg-gray-100 text-[#4eac6f] h-[20px]"
                handleClick={() => dispatch(setShowMapbox(true))}
              />
            )}
          </div>
          <CustomButton
            buttonType="submit"
            title="Create Land"
            styles="bg-[#4eac6f] text-white"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateLand;
