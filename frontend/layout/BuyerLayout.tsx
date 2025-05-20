import { withAuth } from "@/components/common/withAuth";
import { UserType } from "@/lib/models/auth";
import BuyerNavbar from "@/components/buyer/BuyerNavbar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const BuyerLayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className=" ">
      <div>
        <BuyerNavbar />
      </div>
      <main>{children}</main>
    </div>
  );
};

export const BuyerLayout = withAuth(BuyerLayoutComponent, [UserType.Buyer]);