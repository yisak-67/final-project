import CustomButton from "@/components/common/customButton";
import CustomFormField from "@/components/common/customFormField";
import Loader from "@/components/common/Loader";
import { useAppDispatch, useAppSelector } from "@/lib/appstate";
import { authSucess } from "@/lib/appstate/features/auth/actions";
import { AuthSelector } from "@/lib/appstate/features/auth/selectors";
import { LoginForm, User, UserType } from "@/lib/models/auth";
import { ContractWriteResponse } from "@/lib/models/responseMessage";
import {
  signInWithEmailandPasswordWithContract,
  signInWithWalletWithContract,
} from "@/lib/services/blockchainService/authcontractServices";
import { getCurrentAccount } from "@/lib/services/blockchainService/providers/localHostProvider";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Login: NextPage = () => {
  const disptach = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector(AuthSelector);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    isAuthenticated && user?.Role === UserType.Anonymous && router.push("/");
    isAuthenticated &&
      user?.Role === UserType.Admin &&
      router.push("/p_admin/admin_page");
    isAuthenticated &&
      user?.Role === UserType.Buyer &&
      router.push("/p_buyer/buyer_page");
    isAuthenticated &&
      user?.Role === UserType.Seller &&
      router.push("/p_seller/seller_page");
  }, [isAuthenticated]);

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const response: ContractWriteResponse =
      await signInWithEmailandPasswordWithContract(loginForm);
      console.log("working aaa");
      console.log(response);

    if (response.status) {
      disptach(authSucess(response.data));
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setErrorMessage(response.data);
    }
  };

  const handleFormFieldChange = (
    fieldName: any,
    e: { target: { value: any } }
  ) => {
    setLoginForm({ ...loginForm, [fieldName]: e.target.value });
  };

  const handleWalletClick = async () => {
    const address = await getCurrentAccount();
    const response = await signInWithWalletWithContract(address as string);
    console.log(response);
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <section>
      <div className="relative w-full h-full flex justify-center items-center">
        {isLoading && <Loader />}

        <div className="p-10 mb-4  border border-solid border-gray-100 shadow ring-1 ring-gray-50 w-[600px] mt-10">
          <div className="flex flex-1 items-start justify-start">
            <h1 className="font-epilogue sm:text-[20px] text-[25px] leading-[60px] text-black">
              Welcome back!
            </h1>
          </div>
          <div className="flex flex-col gap-[#20px] justify-center items-center">
            <form
              onSubmit={handleSubmit}
              className="w-full mt-[10px] flex flex-col gap-[30px]"
            >
              <CustomFormField
                LableName="Email *"
                inputType="email"
                value={loginForm.email}
                isTextArea={false}
                handleChange={(e: { target: { value: any } }) =>
                  handleFormFieldChange("email", e)
                }
                placeholder="hot@hotmail.com"
              />

              <label className="flex-1 w-full flex flex-col">
                <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#02131E] mb-[10px]">
                  Password
                </span>

                <div className="relative w-full container mx-auto ">
                  <input
                    value={loginForm.password}
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
              <CustomButton
                buttonType="submit"
                title="Login"
                styles="bg-[#4eac6f] text-white"
              />
            </form>
            {errorMessage && <div className="text-red-200">{errorMessage}</div>}
            <div className="flex flex-col flex-wrap mt-5 gap-2">
              <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
                  or
                </span>
              </div>
              <button
                className="bg-[#f2f2ea] p-1 "
                onClick={() => handleWalletClick()}
              >
                <img height={50} width={150} src="/images/metamask_icon.png" />
              </button>
            </div>

            <div className="flex items-center justify-center mt-10 text-black flex-row gap-2 ">
              <p className="text-[#02131E]">Don't Have An Account?</p>
              <Link href="/p_auth/register" className="text-[#4eac6f]">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
