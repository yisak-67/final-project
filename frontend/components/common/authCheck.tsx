import { useAppDispatch } from "@/lib/appstate";
import { intialLoad } from "@/lib/appstate/features/auth/actions";
import { intializeProviders } from "@/lib/services/blockchainService/providers/providers";
import React, { useEffect } from "react";

const AuthCheck = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initProviders = async () => {
      await intializeProviders();
    };
    if (typeof window != "undefined") {
      initProviders();
      dispatch(intialLoad());
    }
  }, []);

  return <></>;
};

export default AuthCheck;
