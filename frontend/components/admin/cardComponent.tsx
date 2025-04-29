import React from "react";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";

type Props = {
  label: string;
  value: string;
  percentage: string;
  icon?: React.ReactNode;
};

const CardComponent = ({ label, value, percentage }: Props) => {
  // Determine colors based on card type
  let bgColor = "bg-blue-50";
  let textColor = "text-blue-600";
  let progressColor = "bg-blue-200";
  let progressBarColor = "bg-blue-500";
  
  if (label.includes("New Lands")) {
    bgColor = "bg-amber-50";
    textColor = "text-amber-600";
    progressColor = "bg-amber-200";
    progressBarColor = "bg-amber-500";
  } else if (label.includes("Total Users")) {
    bgColor = "bg-green-50";
    textColor = "text-green-600";
    progressColor = "bg-green-200";
    progressBarColor = "bg-green-500";
  }

  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all h-full`}>
      <div className="flex flex-col h-full justify-between">
        <div>
          <p className={`text-sm font-medium ${textColor}`}>{label}</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-2">{value}</h3>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${progressColor} ${textColor}`}>
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              {percentage}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full overflow-hidden">
            <div 
              className={`h-full ${progressBarColor}`} 
              style={{ width: label.includes("Verified Lands") ? "75%" : 
                       label.includes("New Lands") ? "45%" : "65%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;