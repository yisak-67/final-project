import React, { useEffect, useState } from "react";
import { FaUser, FaBell, FaShieldAlt, FaHistory } from "react-icons/fa";
import PersonalInformation from "./personalInformation";
import Notificaions from "./notifications";
import LoginActivity from "./loginActivity";
import SecuritySettings from "./securitySettings";
import { useAppSelector } from "@/lib/appstate";
import { AuthSelector } from "@/lib/appstate/features/auth/selectors";
import { useRouter } from "next/router";
import { UserType } from "@/lib/models/auth";

const ViewProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const handleGoBack = () => {
    isAuthenticated && user?.Role === UserType.Anonymous && router.push("/");
    isAuthenticated &&
      user?.Role === UserType.Admin &&
      router.push("/p_admin/admin_page");
    isAuthenticated &&
      user?.Role === UserType.Buyer &&
      router.push("/p_buyer/buyer_page");
    isAuthenticated &&
      user?.Role === UserType.Seller &&
      router.push("/p_seller/seller_page");
  };
  const { isAuthenticated, user } = useAppSelector(AuthSelector);

  const router = useRouter();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="ml-8 mt-4">
      <div className="flex">
        <div className="flex-shrink-0 pr-10 xs:pr-6 md:pl-3 pt-7 items-end">
          <button
            className="text-gray-600 focus:outline-none flex items-center"
            onClick={handleGoBack}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block align-text-bottom mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {/* You can remove the text "Back" */}
          </button>
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-gray-600 my-2">
            You have full control to manage your own account settings.
          </p>
        </div>
      </div>
      <div className="border border-gray-300 rounded-lg md:my-6 md:p-4">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li className="mr-2">
              <a
                href="#"
                className={`inline-flex p-2 border-b-2 border-transparent rounded-t-lg hover:text-green-600 hover:border-green-300 dark:hover:text-gray-300 group ${
                  activeTab === "profile"
                    ? "text-green-600 border-b-2 border-green-600 dark:text-green-600"
                    : ""
                }`}
                onClick={() => handleTabClick("profile")}
              >
                <FaUser
                  className={`w-5 h-5 mr-2 ${
                    activeTab === "profile" ? "text-green-600" : "text-gray-600"
                  } group-hover:text-green-500 dark:text-gray-500 dark:group-hover:text-green-300`}
                />
                View Profile
              </a>
            </li>

            <li className="mr-2">
              <a
                href="#"
                className={`inline-flex p-2 border-b-2 border-transparent rounded-t-lg hover:text-green-600 hover:border-green-300 dark:hover:text-gray-300 group ${
                  activeTab === "settings"
                    ? "text-green-600 border-b-2 border-green-600 dark:text-green-600"
                    : ""
                }`}
                onClick={() => handleTabClick("settings")}
              >
                <FaShieldAlt
                  className={`w-5 h-5 mr-2 ${
                    activeTab === "settings"
                      ? "text-green-600"
                      : "text-gray-600"
                  } group-hover:text-green-500 dark:text-gray-500 dark:group-hover:text-green-300`}
                />
                Security Settings
              </a>
            </li>
          </ul>
        </div>
        <div className="p-4">
          {/* Content for the View Profile tab */}
          <div
            className={`tab-content ${activeTab === "profile" ? "" : "hidden"}`}
            id="profile-tab"
          >
            <PersonalInformation />
          </div>
          <div
            className={`tab-content ${
              activeTab === "settings" ? "" : "hidden"
            }`}
            id="settings-tab"
          >
            <SecuritySettings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
