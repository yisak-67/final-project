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
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register: NextPage = () => {
  const dispatch = useAppDispatch();
  const { filePath, isFileUploadShowing } = useAppSelector(LandSelector);
  const [userType, setUserType] = useState<UserType>(UserType.Buyer);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    userForm.profileHash = filePath as string;
    userForm.Role = userType;
    registerCompleted(userForm);

    setIsLoading(true);
    const response: ContractWriteResponse = await registerUserWithContract(
      userForm
    );

    if (response.status) {
      setIsLoading(false);
      router.push("/p_auth/login");
    } else {
      setIsLoading(false);
      alert("user/account  is already registered");
      router.push("/p_auth/register");
    }
  };

  const handleFormFieldChange = (fieldName: keyof User, value: string) => {
    setUserForm({ ...userForm, [fieldName]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:px-6 lg:px-8">
      {isLoading && <Loader />}
      {isFileUploadShowing && <FileUpload />}

      <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join our platform to manage your land transactions
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <CustomFormField
                LableName="Full Name"
                placeholder="Enter your full name"
                inputType="text"
                isTextArea={false}
                value={userForm.fullName as string}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormFieldChange("fullName", e.target.value)}
                required
              />

              <CustomFormField
                LableName="Address"
                placeholder="Enter your address"
                inputType="text"
                isTextArea={false}
                value={userForm.addressLocation}
                handleChange={(e) => handleFormFieldChange("addressLocation", e.target.value)}
                required
              />
            </div>

            <CustomFormField
              LableName="Phone Number"
              placeholder="Enter your phone number"
              inputType="tel"
              isTextArea={false}
              value={userForm.phoneNumber}
              handleChange={(e) => handleFormFieldChange("phoneNumber", e.target.value)}
              required
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <CustomFormField
              LableName="Email"
              placeholder="Enter your email address"
              inputType="email"
              isTextArea={false}
              value={userForm.email}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormFieldChange("email", e.target.value)}
              required
            />

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={userForm.password}
                    onChange={(e) => handleFormFieldChange("password", e.target.value)}
                    placeholder="••••••••"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                   

                 />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Type
              </label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div
                  className={`relative border rounded-md p-4 cursor-pointer ${
                    userType === UserType.Seller
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300"
                  }`}
                  onClick={() => setUserType(UserType.Seller)}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      checked={userType === UserType.Seller}
                      onChange={() => {}}
                    />
                    <label className="ml-3 block text-sm font-medium text-gray-700">
                      Seller
                    </label>
                  </div>
                  <p className="mt-1 ml-7 text-xs text-gray-500">
                    List and sell your properties
                  </p>
                </div>

                <div
                  className={`relative border rounded-md p-4 cursor-pointer ${
                    userType === UserType.Buyer
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300"
                  }`}
                  onClick={() => setUserType(UserType.Buyer)}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      checked={userType === UserType.Buyer}
                      onChange={() => {}}
                    />
                    <label className="ml-3 block text-sm font-medium text-gray-700">
                      Buyer
                    </label>
                  </div>
                  <p className="mt-1 ml-7 text-xs text-gray-500">
                    Browse and purchase properties
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Picture
              </label>
              {filePath ? (
                <div className="mt-1 flex items-center">
                  <img
                    src={filePath}
                    alt="Profile preview"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => dispatch(setShowFileUpload(true))}
                    className="ml-4 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => dispatch(setShowFileUpload(true))}
                  className="w-full flex justify-center py-2 px-4 border border-dashed border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Upload Profile Picture
                </button>
              )}
            </div>

            <div>
              <CustomButton
                buttonType="submit"
                title="Register"
                aria-label="Register"
                styles="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              />
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/p_auth/login"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;