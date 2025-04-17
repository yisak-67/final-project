import Dialog from "@/components/admin/dialog";
import CustomButton from "@/components/common/customButton";
import { User } from "@/lib/models/auth";
import { useState } from "react";
import Userdetail from "./userDetail";
import React from "react";
import { Loader } from "@/components/common";
import { verifyUser } from "@/lib/services/blockchainService/verficationcontractServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  user: User;
}
const UserDetailrow: React.FC<Props> = ({ user }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const verifyU = async (address: string) => {
    try {
      setShowLoader(true);
      const response = await verifyUser(address);
      if (response == 0) {
        toast.success("User Verified");
      } else {
        toast.error("Verification Failed");
      }
      setShowLoader(false);
    } catch (error) {
      toast.error("internal Server Error");
      console.log({ error });
      setShowLoader(false);
    }
  };
  return (
    <React.Fragment>
      {showLoader && <Loader />}
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {user.fullName}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">{user.email}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">{user.Role}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className=" text-blue-600 font-semibold flex flex-row">
            <img src="/Icons/Verify.svg" width={20} height={20} />
            <span className="ml-2 ">Unverfied</span>
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <CustomButton
            buttonType={undefined}
            title="View Detail"
            handleClick={() => {
              setShowDialog(true);
            }}
            styles="border border-green-500 text-green-500 rounded-md py-2 px-4 transition duration-300 hover:bg-green-500 hover:text-white"
          />
        </td>
        {showDialog && (
          <Dialog
            onClose={() => {
              setShowDialog(false);
            }}
          >
            <Userdetail
              user={user}
              verifyUser={() => {
                verifyU(user.id!);
                setShowDialog(false);
              }}
              onReject={() => setShowDialog(false)}
            />
          </Dialog>
        )}
      </tr>
    </React.Fragment>
  );
};

export default UserDetailrow;
