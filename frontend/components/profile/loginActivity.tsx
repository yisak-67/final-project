import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const LoginActivity: React.FC = () => {
  const [loginActivityData, setLoginActivityData] = useState([
    { browser: "Chrome", ip: "192.168.0.1", time: "2023-05-01 10:30 AM" },
    { browser: "Firefox", ip: "192.168.0.2", time: "2023-05-02 02:15 PM" },
    { browser: "Safari", ip: "192.168.0.3", time: "2023-05-03 08:45 AM" },
  ]);

  const removeLoginActivity = (index: number) => {
    const updatedLoginActivityData = [...loginActivityData];
    updatedLoginActivityData.splice(index, 1);
    setLoginActivityData(updatedLoginActivityData);
  };

  return (
    <div className="ml-2 mt-2">
      <h1 className="text-2xl font-bold text-gray-700 mb-2">Login Activity</h1>
      <p className="text-gray-600 md:mb-8">
        Here is your last 10 login activities log.
      </p>
      <div className="relative overflow-x-auto shadow sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Browser
              </th>
              <th scope="col" className="px-6 py-3">
                IP
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loginActivityData.map((activity, index) => (
              <tr key={index} className="border-b dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {activity.browser}
                </td>
                <td className="px-6 py-4">{activity.ip}</td>
                <td className="px-6 py-4">{activity.time}</td>
                <td className="px-6 py-4">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeLoginActivity(index)}
                  >
                    <FiX />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoginActivity;
