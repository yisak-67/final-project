import BuyerNavbar from "@/components/buyer/BuyerNavbar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const BuyerLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className=" ">
      <div>
        <BuyerNavbar />
      </div>

      <main>{children}</main>
    </div>
  );
};

export default BuyerLayout;
