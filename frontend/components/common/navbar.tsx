import { useAppDispatch, useAppSelector } from "@/lib/appstate";
import { logOut } from "@/lib/appstate/features/auth/actions";
import { AuthSelector } from "@/lib/appstate/features/auth/selectors";
import { useRouter } from "next/router";
import React from "react";
import CustomButton from "./customButton";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated } = useAppSelector(AuthSelector);

  const onLogoutClicked = () => {
    dispatch(logOut());
    router.push("/");
  };

  return (
    <div className="w-full h-12 flex justify-between items-center ">
      <div>
        <h1>Land Registery </h1>
      </div>

      {isAuthenticated && (
        <div className="">
          <CustomButton
            title={"Logout"}
            buttonType="button"
            handleClick={onLogoutClicked}
            styles="bg-gradient-to-r from-cyan-500 to-blue-500"
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
