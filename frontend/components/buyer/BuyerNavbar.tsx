import { useAppDispatch, useAppSelector } from "@/lib/appstate";
import { setBuyerActiveLink } from "@/lib/appstate/features/land/actions";
import { LandSelector } from "@/lib/appstate/features/land/selectors";
import { logOut } from "@/lib/appstate/features/auth/actions";
import { AuthSelector } from "@/lib/appstate/features/auth/selectors";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { FaRegUser, FaRegBell, FaSignOutAlt, FaGlobe } from "react-icons/fa";

const BuyerNavbar = () => {
  const { buyerActiveLink } = useAppSelector(LandSelector);

  const handleLinkClick = (index: number, url: string) => {
    dispatch(setBuyerActiveLink(index));
    router.push(url);
  };

  const navbarItems = ["Search", "Request"];

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const handleClickOutsideDropdown = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  const { user } = useAppSelector(AuthSelector);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const onLogoutClicked = () => {
    dispatch(logOut());
    router.push("/");
  };

  return (
    <div className="flex flex-row items-center justify-between w-full ">
      <div className="flex flex-row justify-center items-center  ">
        <img height={50} width={150} src="/Icons/newlogo.png" />
        <div className="flex flex-row gap-4 justify-center items-center flex-wrap">
          {navbarItems.map((item, index) => (
            <p
              key={index}
              onClick={() =>
                handleLinkClick(
                  index,
                  item === "Search"
                    ? "/p_buyer/buyer_page"
                    : "/p_buyer/request_page"
                )
              }
              className={`cursor-pointer font-serf font-semibold sm:text-[16px] text-[10x] text-black leading-[25px] pb-2 border-b-[4px] ${
                buyerActiveLink == index ? " border-green-500" : "border-white"
              }`}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="mr-5 px-4 py-10 flex flex-row gap-2 relative">
        <div
          className="flex flex-row items-center justify-center cursor-pointer"
          onClick={toggleDropdown}
        >
          <p>{user?.fullName}</p>
          <img src="/Icons/profile.svg" alt="Profile Icon" className="ml-2" />
        </div>
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-10 w-[300px] bg-white rounded-lg py-2 border-t-2 border-green-600 shadow-xl md:pl-2"
          >
            {/* Dropdown content */}
            <div
              style={{ backgroundColor: "rgb(245, 246, 250)" }}
              className="flex items-start mt-[-9px] ml-[-9px] mb-2 px-4 py-2 rounded-lg"
            >
              <img
                src="/Icons/profile.svg"
                alt="Avatar"
                className="rounded-full mr-4 mt-4"
              />
              <div>
                <h2 className="text-xl font-bold">{user?.fullName}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>

            <a
              href="/p_auth/buyerProfile"
              className="px-4 py-2 flex flex-row items-center hover:bg-gray-100"
            >
              <FaRegUser className="text-red-500 mr-3" />
              View Profile
            </a>

            <hr className="border-gray-300 my-3" />
            <a
              onClick={onLogoutClicked}
              className="px-4 py-4 flex items-center hover:bg-gray-200"
            >
              <FaSignOutAlt className="text-green-500 mr-3" />
              Sign Out
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerNavbar;
