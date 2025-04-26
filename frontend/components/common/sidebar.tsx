import React, { useEffect, useState } from "react";
import { NavLinkModel } from "@/lib/models/commonModels";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/lib/appstate";
import { logOut } from "@/lib/appstate/features/auth/actions";
import { FiMenu, FiX } from "react-icons/fi";

const SideBarIcon: React.FC<{ linkItem: NavLinkModel }> = ({ linkItem }) => (
  <div
    className={`w-full max-w-[200px] h-12 rounded-xl px-4 ${
      linkItem.isActive === linkItem.name ? "bg-[#2c2f32]" : ""
    } flex items-center cursor-pointer gap-4 transition-all duration-200 hover:bg-[#3a3b45]`}
    onClick={linkItem.handleClick}
  >
    <img
      src={linkItem.icon}
      alt=""
      className={`w-6 h-6 ${
        linkItem.isActive === linkItem.name ? "grayscale" : ""
      }`}
    />
    <p
      className={`font-epilogue font-semibold text-sm ${
        linkItem.isActive === linkItem.name ? "text-[#818183]" : "text-white"
      }`}
    >
      {linkItem.name}
    </p>
  </div>
);

const Sidebar: React.FC<{ linkItems: NavLinkModel[]; isMobileOpen: boolean; toggleMobile: () => void }> = ({ 
  linkItems, 
  isMobileOpen,
  toggleMobile
}) => {
  const [isActive, setIsActive] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const logOutItem: NavLinkModel = {
    name: "Logout",
    link: "/",
    icon: "/Icons/logout.svg",
    handleClick: () => {
      dispatch(logOut());
      router.push("/");
    },
  };

  useEffect(() => {
    const routeName = router.pathname.split("/").pop();
    setIsActive(routeName ?? "");
  }, [router.pathname]);

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleMobile}
        />
      )}
      
      <aside className={`
        bg-[#1c1c24] min-h-screen w-[260px] flex flex-col justify-between p-4 transition-all duration-300 ease-in-out
        fixed z-30 top-0 left-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:relative
      `}>
        {/* Mobile close button */}
        <button 
          type="button"
          title="Close Sidebar"
          className="lg:hidden absolute top-4 right-4 text-white"
          onClick={toggleMobile}
        >
          <FiX size={24} />
        </button>

        {/* Header */}
        <div className="mb-8 px-2 md:ml-2">
          <p className="font-epilogue font-bold text-xl md:text-2xl text-white leading-[60px]">
            Land Registry
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto flex flex-col items-center gap-4">
          {linkItems
            .map((link) => ({
              ...link,
              isActive: isActive,
              handleClick: () => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  router.push(link.link);
                  toggleMobile(); // Close sidebar on mobile after navigation
                }
              },
            }))
            .map((link) => (
              <SideBarIcon key={link.name} linkItem={link} />
            ))}
        </div>

        {/* Logout Button */}
        <div className="mt-8 flex justify-center">
          <SideBarIcon linkItem={logOutItem} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;