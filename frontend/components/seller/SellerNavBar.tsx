import { useAppDispatch, useAppSelector } from "@/lib/appstate";
import { logOut } from "@/lib/appstate/features/auth/actions";
import { AuthSelector } from "@/lib/appstate/features/auth/selectors";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { FaRegUser, FaRegBell, FaSignOutAlt, FaGlobe } from "react-icons/fa";

const SellerNavBar: React.FC = () => {
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
    <div className="ml-[270px] h-[40px] flex flex-row items-center justify-between">
      <div></div>
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
              href="/p_auth/sellerProfile"
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

export default SellerNavBar;
