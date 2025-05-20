import { SellerLayout } from "@/layout/SellerLayout";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loader from "@/components/common/Loader";

const seller_page = () => {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/p_seller/Dashboard");
  }, []);

  return (
    <SellerLayout>
      <div className="ml-0 lg:ml-[270px] h-[93vh] flex items-center justify-center">
        <div className="text-center p-4">
          <Loader />
          <p className="mt-4 text-gray-600">Redirecting to Dashboard...</p>
        </div>
      </div>
    </SellerLayout>
  );
};

export default seller_page;