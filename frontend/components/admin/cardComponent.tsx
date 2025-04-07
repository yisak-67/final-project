import React from "react";
type Props = {
  label: string;
  value: string;
  percentage: string;
};
const CardComponenet = ({ label, value, percentage }: Props) => {
  return (
    <div className="lg:col-span-1 col-span-1 bg-white flex justify-evenly w-full border p-4 rounded-lg">
      <div className="flex flex-col w-full pb-4">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-gray-600">{label}</p>
      </div>
      <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
        <span className="text-green-700 text-lg">{percentage}</span>
      </p>
    </div>
  );
};

export default CardComponenet;
