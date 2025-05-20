import { SellerLayout } from "@/layout/SellerLayout";
import React from "react";
import CreateLand from "@/components/seller/createLand";

const CreateLandPage = () => {
  return (
    <SellerLayout>
      <div className="bg-gray-50 min-h-screen">
        <CreateLand />
      </div>
    </SellerLayout>
  );
};

export default CreateLandPage;