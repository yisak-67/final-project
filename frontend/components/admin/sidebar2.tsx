import { adminNavLinks } from "@/constants";
import { useAppDispatch } from "@/lib/appstate";
import { logOut } from "@/lib/appstate/features/auth";
import { NavLinkModel } from "@/lib/models/commonModels";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";

const SideBarIcon: React.FC<{ linkItem: NavLinkModel }> = ({ linkItem }) => (
  <div
    className={`w-[200px] h-[48px] rounded-[10px] px-4 ${
      linkItem.isActive &&
      linkItem.isActive === linkItem.linkName &&
      "bg-[#2c2f32]"
    } flex  items-center cursor-pointer   gap-5 ${!linkItem.disabled && ""} ${
      linkItem.styles
    } hover:bg-gray-500`}
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
        linkItem.isActive === linkItem.linkName
          ? "text-white"
          : "text-[#818183]"
      }
      
      `}
    >
      {linkItem.name}
    </p>
  </div>
);
const SideBar2 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isActive, setIsActive] = useState("");
  const dispatch = useAppDispatch();

  const logOutItem: NavLinkModel = {
    name: "Sign out",
    link: "/",
    linkName: "sign out",
    icon: "/Icons/logout.svg",
    handleClick: () => {
      dispatch(logOut());
      router.push("/");
    },
  };
  const handleClickOutside = (e: MouseEvent) => {
    if (node.current?.contains(e.target as Node)) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    const routeName = router.pathname.split("/").pop();
    setIsActive(routeName ?? "");
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [router.pathname, isOpen]);

  return (
    <React.Fragment>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>{" "}
      </button>

      <aside
        ref={node}
        id="separator-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col bg-gray-200 h-full mb-15 pb-15">
          <div className="flex  justify-start items-center ml-6 ">
            <p className="font-epilogue font-bold sm:text-[20px] text-[25px] leading-[60px]">
              Land Registery
            </p>
          </div>
          <div className="flex flex-col justify-between h-full px-5 py-10 overflow-y-auto  dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              {adminNavLinks
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
                  <li>
                    <SideBarIcon key={link.name} linkItem={link} />
                  </li>
                ))}
            </ul>
            <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
              <li>
                <SideBarIcon key={"logut"} linkItem={logOutItem} />
              </li>
            </ul>
          </div>{" "}
        </div>
      </aside>
    </React.Fragment>
  );
};

export default SideBar2;
