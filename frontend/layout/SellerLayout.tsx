import { Footer, Sidebar } from "@/components/common";
import SellerNavBar from "@/components/seller/SellerNavBar";
import { sellerNavLinks } from "@/constants";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}
const SellerLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row gap-1">
      <aside className="h-full fixed overflow-x-hidden z-10 top-0 left-0  ">
        <Sidebar linkItems={sellerNavLinks} />
      </aside>
      <main className="w-full">
        <SellerNavBar />
        <div>{children}</div>
        <Footer />
      </main>
    </div>
  );
};

export default SellerLayout;
