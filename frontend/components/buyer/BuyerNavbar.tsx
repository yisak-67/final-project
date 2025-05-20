import { useAppDispatch, useAppSelector } from "@/lib/appstate";
import { setBuyerActiveLink } from "@/lib/appstate/features/land/actions";
import { LandSelector } from "@/lib/appstate/features/land/selectors";
import { logOut } from "@/lib/appstate/features/auth/actions";
import { AuthSelector } from "@/lib/appstate/features/auth/selectors";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { FaRegUser, FaSignOutAlt } from "react-icons/fa";

const BuyerNavbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { buyerActiveLink } = useAppSelector(LandSelector);
  const { user } = useAppSelector(AuthSelector);

  const navbarItems = ["Search", "Request"];
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = (index: number, url: string) => {
    dispatch(setBuyerActiveLink(index));
    router.push(url);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
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
    return () => document.removeEventListener("mousedown", handleClickOutsideDropdown);
  }, []);

  const onLogoutClicked = () => {
    dispatch(logOut());
    router.push("/");
  };

  return (
    <div className="bg-white  w-full">
      {/* Top spacing for layout */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo & Nav Links */}
        <div className="flex items-center space-x-6">
          <img src="/Icons/newlogo.png" alt="Logo" className="h-10 w-auto" />
          <div className="hidden sm:flex space-x-4">
            {navbarItems.map((item, index) => (
              <p
                key={index}
                onClick={() =>
                  handleLinkClick(
                    index,
                    item === "Search" ? "/p_buyer/buyer_page" : "/p_buyer/request_page"
                  )
                }
                className={`cursor-pointer font-semibold text-sm sm:text-base border-b-4 ${
                  buyerActiveLink === index ? "border-green-500" : "border-transparent"
                } hover:border-green-500 transition-all`}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* User Dropdown */}
        <div className="relative">
          <div
            className="flex items-center cursor-pointer space-x-2"
            onClick={toggleDropdown}
          >
            <p className="hidden sm:block text-sm font-medium">{user?.fullName}</p>
            <img src="/Icons/profile.svg" alt="Profile Icon" className="w-8 h-8" />
          </div>

          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border-t-2 border-green-600 z-50"
            >
              <div className="flex items-center px-4 py-3 space-x-3 bg-gray-50 rounded-t-lg">
                <img
                  src="/Icons/profile.svg"
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="text-sm font-bold">{user?.fullName}</h2>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>

              <a
                href="/p_auth/buyerProfile"
                className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm"
              >
                <FaRegUser className="text-red-500 mr-3" />
                View Profile
              </a>

              <hr className="my-2 border-gray-300" />

              <button
                onClick={onLogoutClicked}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-sm"
              >
                <FaSignOutAlt className="text-green-500 mr-3" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav links */}
      <div className="sm:hidden flex justify-around py-2 border-t border-gray-200">
        {navbarItems.map((item, index) => (
          <p
            key={index}
            onClick={() =>
              handleLinkClick(
                index,
                item === "Search" ? "/p_buyer/buyer_page" : "/p_buyer/request_page"
              )
            }
            className={`cursor-pointer text-sm font-medium border-b-2 ${
              buyerActiveLink === index ? "border-green-500" : "border-transparent"
            }`}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default BuyerNavbar;
