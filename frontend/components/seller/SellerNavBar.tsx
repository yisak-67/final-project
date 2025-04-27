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
   
      <div className="ml-[270px] h-16 flex items-center justify-between bg-white shadow-sm px-6">
        <div></div>
        <div className="relative flex items-center gap-2">
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <p className="text-sm font-medium">{user?.fullName}</p>
            <img src="/Icons/profile.svg" alt="Profile Icon" className="ml-2 w-6 h-6" />
          </div>
    
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-20 w-72 bg-white rounded-lg py-3 border-t-2 border-green-600 shadow-xl z-50"
            >
              {/* Profile Preview */}
              <div className="flex items-start gap-4 bg-gray-100 p-4 rounded-t-lg">
                <img
                  src="/Icons/profile.svg"
                  alt="Avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h2 className="text-lg font-semibold">{user?.fullName}</h2>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>
    
              {/* View Profile Link */}
              <a
                href="/p_auth/sellerProfile"
                className="px-4 py-2 flex items-center hover:bg-gray-100 transition"
              >
                <FaRegUser className="text-red-500 mr-3" />
                <span>View Profile</span>
              </a>
    
              <hr className="my-2 border-gray-200" />
    
              {/* Sign Out */}
              <button
                onClick={onLogoutClicked}
                className="w-full text-left px-4 py-2 flex items-center hover:bg-gray-100 transition"
              >
                <FaSignOutAlt className="text-green-500 mr-3" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }    

export default SellerNavBar;
