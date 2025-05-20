import React from "react";
import { SellerLayout } from "@/layout/SellerLayout";
import ViewProfile from "@/components/profile/viewProfile";

const SellerProfile = () => {
  return (
    <SellerLayout>
      <div className="ml-[270px] h-full">
        <ViewProfile />
      </div>
    </SellerLayout>
  );
};

export default SellerProfile;
