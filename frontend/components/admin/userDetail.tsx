import CustomButton from "@/components/common/customButton";
import { User } from "@/lib/models/auth";
import React from "react";

interface Props {
  user: User;
  verifyUser: (address: number) => void;
  onReject: () => void;
}
const Userdetail: React.FC<Props> = ({ user, verifyUser, onReject }) => {
  return (
    <div className="flex flex-col justify-between h-full  ">
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src={user.profileHash}
            alt="Profile Picture"
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user.fullName}</h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-gray-500">{user.addressLocation}</p>
        </div>
      </div>
      <div className="flex gap-10 w-full justify-center">
        <CustomButton
          buttonType={undefined}
          title="Cancel"
          handleClick={onReject}
          styles="border border-red-600 text-red-600 rounded-md py-2 px-4 transition duration-500 hover:bg-red-600 hover:text-white"
        />
        <CustomButton
          buttonType={undefined}
          title="Verify"
          handleClick={verifyUser}
          styles="border border-green-600 text-green-600 rounded-md py-2 px-4 transition duration-500 hover:bg-green-600 hover:text-white"
        />
      </div>
    </div>
  );
};

export default Userdetail;