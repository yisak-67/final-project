import SellerLayout from "@/layout/SellerLayout";
import React from "react";
import CreateLand from "@/components/seller/createLand";

const CreateLandPage = () => {
  return (
    <SellerLayout>
      <div className="ml-[270px]">
        <CreateLand />
      </div>
    </SellerLayout>
  );
};

export default CreateLandPage;
