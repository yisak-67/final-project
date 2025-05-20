import { withAuth } from "@/components/common/withAuth";
import { UserType } from "@/lib/models/auth";
import { Footer, Sidebar } from "@/components/common";
import SellerNavBar from "@/components/seller/SellerNavBar";
import { sellerNavLinks } from "@/constants";
import React, { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const SellerLayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-1">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-20">
        <button 
          type="button"
          title="Toggle mobile menu"
          onClick={toggleMobile}
          className="text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <Sidebar 
        linkItems={sellerNavLinks} 
        isMobileOpen={isMobileOpen}
        toggleMobile={toggleMobile}
      />
      
      <main className="w-full lg:ml-[260px]">
        <SellerNavBar />
        <div className="mt-16 lg:mt-0">{children}</div>
        <Footer />
      </main>
    </div>
  );
};

export const SellerLayout = withAuth(SellerLayoutComponent, [UserType.Seller]);