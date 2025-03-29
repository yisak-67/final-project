import CustomButton from "@/components/common/customButton";
import CustomFormField from "@/components/common/customFormField";
import FileUpload from "@/components/common/fileUpload";
import Loader from "@/components/common/Loader";
import { useAppDispatch, useAppSelector } from "@/lib/appstate";
import { registerCompleted } from "@/lib/appstate/features/auth/actions";
import { setShowFileUpload } from "@/lib/appstate/features/land/actions";
import { LandSelector } from "@/lib/appstate/features/land/selectors";
import { User, UserType } from "@/lib/models/auth";
import { ContractWriteResponse } from "@/lib/models/responseMessage";
import {
  getUserAddress_s,
  registerUserWithContract,
} from "@/lib/services/blockchainService/authcontractServices";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Register: NextPage = () => {
  const dispatch = useAppDispatch();
  const { filePath, isFileUploadShowing } = useAppSelector(LandSelector);

  const [userType, setUserType] = useState(UserType.Admin);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [userForm, setUserForm] = useState<User>({
    Role: userType,
    fullName: "",
    email: "",
    password: "",
    profileHash: "",
    phoneNumber: "",
    addressLocation: "",
    isLoggedIn: false,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    userForm.profileHash = filePath as string;
    registerCompleted(userForm);

    setIsLoading(true);
    console.log(userForm);

    const response: ContractWriteResponse = await registerUserWithContract(
      userForm
    );

    if (response.status) {
      setIsLoading(false);
      router.push("/p_auth/login");
    } else {
      setIsLoading(false);
      router.push("/p_auth/register");
    }
  };

  const handleFormFieldChange = (
    fieldName: any,
    e: { target: { value: any } }
  ) => {
    setUserForm({ ...userForm, [fieldName]: e.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      {isLoading && <Loader />}
      <div className="p-10 mb-4  border border-solid border-gray-100 shadow ring-1 ring-gray-50 w-[754px] mt-5 ">
        <div className="flex flex-1 items-start justify-start">
          <h1 className="font-epilogue sm:text-[20px] text-[25px] leading-[60px] text-black">
            Create Your Account
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full mt-6 flex flex-col gap-[30px]"
        >
          <div className="flex flex-row gap-6">
            <CustomFormField
              LableName="Full Name *"
              placeholder="yisak zemedu"
              inputType="text"
              isTextArea={false}
              value={userForm.fullName as string}
              handleChange={(e: { target: { value: any } }) =>
                handleFormFieldChange("fullName", e)
              }
            />
            <CustomFormField
              LableName="Address *"
              placeholder="Arbamunchi, Ethiopia."
              inputType="text"
              isTextArea={false}
              value={userForm.addressLocation}
              handleChange={(e: { target: { value: any } }) =>
                handleFormFieldChange("addressLocation", e)
              }
            />
          </div>

          <CustomFormField
            LableName="PhoneNumber *"
            placeholder="+251970368242"
            inputType="text"
            isTextArea={false}
            value={userForm.phoneNumber}
            handleChange={(e: { target: { value: any } }) =>
              handleFormFieldChange("phoneNumber", e)
            }
          />

          <div className="flex flex-row gap-6">
            <CustomFormField
              LableName="Email *"
              placeholder="harry@gmail.com"
              inputType="email"
              isTextArea={false}
              value={userForm.email}
              handleChange={(e: { target: { value: any } }) =>
                handleFormFieldChange("email", e)
              }
            />

            <label className="flex-1 w-full flex flex-col">
              <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#02131E] mb-[10px]">
                Password
              </span>

              <div className="relative w-full container mx-auto ">
                <input
                  value={userForm.password}
                  onChange={(e: { target: { value: any } }) =>
                    handleFormFieldChange("password", e)
                  }
                  type={showPassword ? "text" : "password"}
                  placeholder="************"
                  className="w-full
       py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#cacad5] bg-transparent font-epilogue text-[#02131E]
          text-[14px]  rounded-[10px]  placeholder:text-[#4b5264] sm:min-w-[300px] focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center justify-center px-4 text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </label>
          </div>

          <div className="flex flex-row flex-wrap gap-5 ml-10 justify-start items-center">
            <div
              className="flex flex-row gap-2"
              onClick={() => {
                setUserForm({ ...userForm, ["Role"]: UserType.Seller });
                setUserType(UserType.Seller);
              }}
            >
              <input
                type="radio"
                value={userType.toString()}
                name={userType.toString()}
                checked={userType == UserType.Seller}
                onChange={() => {}}
              />
              <p>Seller</p>
            </div>
            <div
              className="flex flex-row gap-2"
              onClick={() => {
                setUserForm({ ...userForm, ["Role"]: UserType.Buyer });
                setUserType(UserType.Buyer);
              }}
            >
              <input
                type="radio"
                value={userType.toString()}
                name={userType.toString()}
                onChange={() => {}}
                checked={userType == UserType.Buyer}
              />
              Buyer
            </div>
          </div>

          <div className="w-[#200px] flex flex-row flex-wrap justify-end">
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
                title="Upload Profile"
                buttonType="button"
                styles="w-48 border-gray-100 shadow ring-2 ring-gray-100 bg-gray-100 text-[#4eac6f] flex-shrink-0 h-[20px]"
                handleClick={() => dispatch(setShowFileUpload(true))}
              />
            )}
          </div>

          <CustomButton
            buttonType="submit"
            title=" register user"
            styles="bg-[#4eac6f] text-white"
          />
        </form>

        <div className="flex items-center justify-center mt-10 text-black flex-row gap-2 ">
          <p className="text-[#02131E]">Already have an account?</p>
          <Link href="/p_auth/login" className="text-[#4eac6f]">
            Login
          </Link>
        </div>
        {isFileUploadShowing && <FileUpload />}
      </div>
    </div>
  );
};
export default Register;
