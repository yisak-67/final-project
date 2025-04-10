import React, { useState } from "react";
import { FiCheck, FiX, FiEdit } from "react-icons/fi";

const SecuritySettings: React.FC = () => {
  const [saveActivityLogs, setSaveActivityLogs] = useState(true);
  const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(true);

  const handleSaveActivityLogsToggle = () => {
    setSaveActivityLogs(!saveActivityLogs);
  };

  const handleTwoFactorAuthToggle = () => {
    setTwoFactorAuthEnabled(!twoFactorAuthEnabled);
  };

  const handleChangePassword = () => {
    // Implement password change functionality
  };

  return (
    <div className="ml-2 mt-2">
      <h1 className="text-2xl font-bold text-gray-700 mb-2">
        Security Settings
      </h1>
      <p className="text-gray-600 md:mb-8">
        These settings will help you keep your account secure.
      </p>
      <div className="relative overflow-x-auto">
        <div className="flex items-center justify-between py-3 px-4">
          <p className="text-green-800 font-medium">Change password</p>
          <button
            className="text-green-500 hover:text-green-700"
            onClick={handleChangePassword}
          >
            Change
          </button>
        </div>
        <div className="flex items-start justify-between py-3 px-4 rounded-b-lg"></div>
        <div className="flex items-center justify-between py-3 px-4">
          <p className="text-green-800 font-medium">Save my Activity Logs</p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={saveActivityLogs}
              onChange={handleSaveActivityLogsToggle}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
