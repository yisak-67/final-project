import SellerLayout from "@/layout/SellerLayout";
import React from "react";

const Setting = () => {
  return (
    <SellerLayout>
      <div className="ml-0 lg:ml-[270px] p-4 min-h-[93vh]">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
          
          <div className="space-y-6">
            {/* Account Settings */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h3 className="font-medium text-gray-800">Profile Information</h3>
                    <p className="text-sm text-gray-500">Update your profile details</p>
                  </div>
                  <button className="mt-2 sm:mt-0 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Security</h2>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h3 className="font-medium text-gray-800">Change Password</h3>
                    <p className="text-sm text-gray-500">Update your login credentials</p>
                  </div>
                  <button className="mt-2 sm:mt-0 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors">
                    Change Password
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="pb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <span className="sr-only">Enable email notifications</span>
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4eac6f]"></div>
                    </label>
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4eac6f]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default Setting;