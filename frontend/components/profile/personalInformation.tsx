import React, { useState } from "react";
import UpdateModal from "./updateModal";
import { FaAngleRight } from "react-icons/fa";
import { useAppSelector } from "@/lib/appstate";
import { AuthSelector } from "@/lib/appstate/features/auth/selectors";

const PersonalInformation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAppSelector(AuthSelector);

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="ml-2 mt-2">
      <div className="flex items-center mr-6">
        <div className="rounded-full overflow-hidden mr-4">
          <img
            src={`${user?.profileHash ?? "/images/placeholderImage.jpg"}`}
            alt="Profile"
            className="w-12 h-12"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-700">
            Personal Information
          </h1>
          <p className="text-gray-600 my-1">Land Registration User Profile</p>
        </div>
      </div>
      <div className="my-4 text-sm">
        <div className="uppercase font-bold text-gray-400 mt-10 mb-2 shadow-green-200">
          Basics
        </div>
        <hr className="w-full border-gray-300" />
        <div className="flex justify-between my-5">
          <div className="font-medium">Full Name</div>
          <div>{user?.fullName}</div>
          <div
            className="ml-2 cursor-pointer text-gray-400 text-xl hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
            onClick={handleUpdateClick}
          >
            <FaAngleRight />
          </div>
        </div>
        <hr className="w-full border-gray-300" />
        <div className="flex justify-between my-5">
          <div className="font-medium">Display Name</div>
          <div>{user?.fullName}</div>
          <div
            className="ml-2 cursor-pointer text-gray-400 text-xl hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
            onClick={handleUpdateClick}
          >
            <FaAngleRight />
          </div>
        </div>
        <hr className="w-full border-gray-300" />
        <div className="flex justify-between my-5">
          <div className="font-medium">Email</div>
          <div>{user?.email}</div>
          <div
            className="ml-2 cursor-pointer text-gray-400 text-xl hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
            onClick={handleUpdateClick}
          >
            <FaAngleRight />
          </div>
        </div>
        <hr className="w-full border-gray-300" />
        <div className="flex justify-between my-5">
          <div className="font-medium">Phone Number</div>
          <div>{user?.phoneNumber}</div>
          <div
            className="ml-2 cursor-pointer text-gray-400 text-xl hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
            onClick={handleUpdateClick}
          >
            <FaAngleRight />
          </div>
        </div>
        <hr className="w-full border-gray-300" />
        <div className="flex justify-between my-5">
          <div className="font-medium">Date of Birth</div>
          <div>January 1, 1990</div>
          <div
            className="ml-2 cursor-pointer text-gray-400 text-xl hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
            onClick={handleUpdateClick}
          >
            <FaAngleRight />
          </div>
        </div>
        <hr className="w-full border-gray-300" />
        <div className="flex justify-between my-5">
          <div className="font-medium">Address</div>
          <div>{user?.addressLocation} Ethiopia.</div>
          <div
            className="ml-2 cursor-pointer text-gray-400 text-xl hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
            onClick={handleUpdateClick}
          >
            <FaAngleRight />
          </div>
        </div>
        <hr className="w-full border-gray-300" />
      </div>
      {isModalOpen && <UpdateModal onClose={handleCloseModal} user={user} />}
    </div>
  );
};

export default PersonalInformation;