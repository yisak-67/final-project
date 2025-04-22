import React, { useState } from "react";

const Notifications: React.FC = () => {
  const [emailUnusualActivity, setEmailUnusualActivity] = useState(true);
  const [emailNewBrowser, setEmailNewBrowser] = useState(false);
  const [emailNewFeatures, setEmailNewFeatures] = useState(true);
  const [emailAccountTips, setEmailAccountTips] = useState(false);

  return (
    <div className="ml-2 mt-2">
      <h1 className="text-2xl font-bold text-gray-700 mb-2">
        Notification Settings
      </h1>
      <p className="text-gray-600 md:mb-8">
        You will receive notifications only for what you have enabled.
      </p>
      <div className="my-4 text-sm">
        <div className="flex items-center mb-4">
          <span className="font-bold">Security Alerts</span>
        </div>
        <div className="ml-8">
          <div className="flex items-center mb-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={emailUnusualActivity}
                onChange={() => setEmailUnusualActivity(!emailUnusualActivity)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Email me whenever unusual activity is encountered
              </span>
            </label>
          </div>
          <div className="flex items-center mb-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={emailNewBrowser}
                onChange={() => setEmailNewBrowser(!emailNewBrowser)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Email me if a new browser is used to sign in
              </span>
            </label>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <span className="font-bold">News</span>
        </div>
        <div className="mt-4 ml-8">
          <div className="flex items-center mb-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={emailNewFeatures}
                onChange={() => setEmailNewFeatures(!emailNewFeatures)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Email me about new features and updates
              </span>
            </label>
          </div>
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={emailAccountTips}
                onChange={() => setEmailAccountTips(!emailAccountTips)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Email me about tips on using the account
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
