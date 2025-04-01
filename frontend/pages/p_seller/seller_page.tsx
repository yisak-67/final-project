import { Sidebar } from "@/components/common";
import Navbar from "@/components/common/navbar";
import CreateLand from "@/components/seller/createLand";
import React, { useEffect } from "react";
import { sellerNavLinks } from "@/constants";
import SellerLayout from "@/layout/SellerLayout";
import { useRouter } from "next/router";

const seller_page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/p_seller/Dashboard");
  }, []);
  return (
    <SellerLayout>
      <div className="ml-[270px] h-[93vh] flex items-center justify-center"></div>
    </SellerLayout>
  );
};

export default seller_page;
