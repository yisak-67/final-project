import React from "react";

const Sort = () => {
  return (
    <div className="lg:flex-1 flex flex-row  py-2 pl-4 pr-2 h-[52px] border-2 rounded-[100px]">
      <p className="ml-2">Sort by</p>
      <div className="ml-10">
        <select
          aria-label="Sort by time"
          className="block appearance-none w-full bg-white border border-gray-300 py-1 px-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          value={""}
          onChange={() => {}}
        >
          <option value="">Any time</option>
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
        </select>
      </div>
    </div>
  );
};

export default Sort;
