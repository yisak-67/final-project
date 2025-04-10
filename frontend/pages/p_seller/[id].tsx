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
    console.log(currentLand);
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

    console.log("update result");
    console.log(result);
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
      <div className="ml-[270px]">
        <div className="flex flex-col justify-center items-center w-full ">
          <div className=" flex justify-center items-center bg-[#4eac6f] w-[380px] rounded-[10px] p-[3px]">
            <p className="font-serf font-bold sm:text-[18px] text-[12x] text-white leading-[30px] ">
              Land Information with interactive map
            </p>
          </div>

          {isUpdating && <Loader />}

          {/* // detail */}
          <div className={`flex ${isDetailOn ? "flex-row" : ""} w-full`}>
            <div className="bg-white-500 rounded-md shadow-lg  sm:p-8 md:p-10 lg:p-12 xl:p-14 w-full mx-5 mt-5">
              <div className="flex justify-end items-center">
                Owner :-{" "}
                <span className="font-sans  text-green-500 mx-2">
                  {land?.postedBy}
                </span>
              </div>
              <div
                className={`flex justify-around ${
                  isDetailOn ? "flex-col" : "flex-row"
                } items-center`}
              >
                <div className="mt-5 flex justify-center gap-2 items-center flex-col h-[400px] w-[450px] ">
                  <span className="font-serf font-bold sm:text-[18px] text-[12x] text-black leading-[30px]">
                    Karta
                  </span>
                  <img
                    src={`${
                      land?.documentHash ?? "/images/placeholderImage.jpg"
                    }`}
                    alt={""}
                    className="rounded-[#35px]"
                  />
                  <span className="ml-2 text-blue-600 font-bold flex flex-row">
                    <img src="/Icons/Verify.svg" width={20} height={20} />
                    {land?.isVerified ? "Verified" : "Unverified"}
                  </span>
                </div>
                <div className="mt-10 flex justify-center items-center flex-col gap-2 ">
                  <span className="font-serf font-bold sm:text-[18px] text-[12x] text-black leading-[30px]">
                    Interactive Map
                  </span>
                  <DisplayLand
                    latandlongs={`${land?.locationAddress}`}
                    index={10000}
                  />
                  <span className="ml-2 text-blue-600 font-bold flex flex-row">
                    <img src="/Icons/Verify.svg" width={20} height={20} />
                    {land?.isVerified ? "Verified" : "Unverified"}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-[10px] p-5 mt-10 flex justify-start items-start flex-col flex-wrap">
                <p className="text-gray-600 text-lg mb-5">
                  <span className="text-black-500 font-serif font-bold mr-2">
                    Address :
                  </span>{" "}
                  {land?.landAddress}
                </p>
                <p className="text-gray-600 text-lg mb-5">
                  {" "}
                  <span className="text-black-500 font-serif font-bold mr-2">
                    Description :
                  </span>
                  {land?.detail}
                </p>
                <p className="text-green-500 text-xl font-bold">
                  {" "}
                  <span className="text-black-500 font-serif font-bold mr-2">
                    Price M :{" "}
                  </span>
                  {land?.price} <span className="text-red-500">matic</span>
                </p>
              </div>

              <div className="ml-5 mt-10">
                <CustomButton
                  title={`Update ${isDetailOn ? " > Open" : "Closed"}`}
                  buttonType={undefined}
                  styles="border border-green-500 text-green-500 rounded-md py-2 px-4 transition duration-300 hover:bg-green-500 hover:text-white"
                  handleClick={handDetailChange}
                />
              </div>
              <p className="flex justify-end items-center mt-10">
                Posted on :{" "}
                <span className=" font-sans mr-5 text-blue-500">
                  {land?.postedDate?.toString()}
                </span>{" "}
              </p>
            </div>

            {/* //update */}
            <div
              className={`${
                isDetailOn ? "flex" : "hidden"
              } w-[800px] h-[700px]`}
            >
              <div className="p-10 mb-4 mt-5 border border-solid border-gray-100 shadow ring-1 ring-gray-50">
                <div className="flex flex-1 items-start justify-start">
                  <h1 className="font-epilogue sm:text-[20px] text-[25px] leading-[60px] text-black">
                    Update Land
                  </h1>
                </div>

                <form
                  onSubmit={handleUpdateSubmit}
                  className=" mt-6 flex flex-col gap-[30px] mr-10"
                >
                  <CustomFormField
                    LableName="Price *"
                    placeholder="1000000"
                    inputType="text"
                    isTextArea={false}
                    value={updateForm.price as string}
                    handleChange={(e: { target: { value: any } }) =>
                      handleFormFieldChange("price", e)
                    }
                  />
                  <CustomFormField
                    LableName="Detail *"
                    placeholder="Land Detail"
                    inputType="text"
                    isTextArea={true}
                    value={updateForm.detail as string}
                    handleChange={(e: { target: { value: any } }) =>
                      handleFormFieldChange("detail", e)
                    }
                  />

                  <CustomButton
                    buttonType="submit"
                    title="Update Land"
                    styles="bg-[#4eac6f] text-white"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default LandDetail;
