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
    <div className="flex flex-row items-center justify-between w-full py-4 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-row justify-start items-center">
        <img
          height={40}
          width={120}
          src="/Icons/newlogo.png"
          className="sm:h-10 sm:w-30 h-8 w-24"
          alt="Logo"
        />
        <div className="flex flex-row gap-2 sm:gap-4 justify-center items-center flex-wrap ml-2 sm:ml-6">
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
              className={`cursor-pointer font-serif font-semibold text-sm sm:text-base md:text-lg text-black leading-5 sm:leading-6 pb-1 sm:pb-2 border-b-2 sm:border-b-4 ${
                buyerActiveLink == index ? " border-green-500" : "border-white"
              }`}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="mr-2 sm:mr-5 flex flex-row gap-2 relative items-center">
        {/* <FaRegBell className="text-xl sm:text-2xl cursor-pointer text-gray-600" /> */}
        <div
          className="flex flex-row items-center justify-center cursor-pointer"
          onClick={toggleDropdown}
        >
          <p className="text-sm sm:text-base font-medium text-gray-700 hidden sm:block">{user?.fullName}</p>
          <img
            src="/Icons/profile.svg"
            alt="Profile Icon"
            className="ml-2 h-8 w-8 rounded-full border border-gray-300"
          />
        </div>
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-48 sm:w-64 bg-white rounded-md shadow-xl border border-gray-200 overflow-hidden z-10"
          >
            {/* Dropdown content */}
            <div className="px-4 mt-40 py-2 bg-gray-50">
              <h2 className="text-base font-semibold text-gray-800">{user?.fullName}</h2>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
            <a
              href="/p_auth/buyerProfile"
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <FaRegUser className="text-gray-500 mr-2" />
                View Profile
              </div>
            </a>
            <hr className="border-gray-200 my-1" />
            <button
              onClick={onLogoutClicked}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <div className="flex items-center">
                <FaSignOutAlt className="text-red-500 mr-2" />
                Sign Out
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerNavbar;