import React, { useEffect, useState } from "react";
import { NavLinkModel } from "@/lib/models/commonModels";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/lib/appstate";
import { logOut } from "@/lib/appstate/features/auth/actions";

const SideBarIcon: React.FC<{ linkItem: NavLinkModel }> = ({ linkItem }) => (
  <div
    className={`w-[200px] h-[48px] rounded-[10px] px-4 ${
      linkItem.isActive && linkItem.isActive === linkItem.name && "bg-[#2c2f32]"
    } flex  items-center cursor-pointer   gap-5 ${!linkItem.disabled && ""} ${
      linkItem.styles
    }`}
    onClick={linkItem.handleClick}
  >
    {!linkItem.isActive ? (
      <img src={linkItem.icon} alt="" className="w-6 h-6" />
    ) : (
      <img
        src={linkItem.icon}
        alt=""
        className={`w-6 h-6 ${
          linkItem.isActive === linkItem.name && "grayscale"
        }`}
      />
    )}
    <p
      className={`font-epilogue font-semibold text-[14px] leading-[18px]  ${
        linkItem.isActive === linkItem.name ? "text-[#818183]" : "text-white"
      }`}
    >
      {linkItem.name}
    </p>
  </div>
);

const Sidebar: React.FC<{ linkItems: NavLinkModel[] }> = ({ linkItems }) => {
  const [isActive, setIsActive] = useState("");
  const router = useRouter();

  const dispatch = useAppDispatch();

  const logOutItem: NavLinkModel = {
    name: "",
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
    <div className="flex bg-[#1c1c24] flex-col h-full">
      <div className="flex  justtify-start items-center ml-6 ">
        <p className="font-epilogue font-bold sm:text-[20px] text-[25px] leading-[60px] text-white">
          Land Registery
        </p>
      </div>
      <div className="flex-1 flex flex-col justify-between  items-center rounded-r-[10px] w-[260px] py-4 pt-10">
        <div className="flex flex-col  items-center gap-3">
          {linkItems
            .map((link) => ({
              ...link,
              isActive: isActive,
              handleClick: () => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  router.push(link.link);
                }
              },
            }))
            .map((link) => (
              <SideBarIcon key={link.name} linkItem={link} />
            ))}
        </div>
        <SideBarIcon linkItem={logOutItem} />
      </div>
    </div>
  );
};

export default Sidebar;
