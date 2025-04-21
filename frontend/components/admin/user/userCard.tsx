import { CustomButton, Loader } from "@/components/common";
import { User } from "@/lib/models/auth";
import { grantRevoke } from "@/lib/services/blockchainService/verficationcontractServices";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { toast } from "react-toastify";

type userCardProps = {
  user: User;
  onRevokeGrant: () => void;
};

const UserCard: React.FC<userCardProps> = ({ user, onRevokeGrant }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const revokeGrantAccess = async (id: string) => {
    try {
      setIsLoading(true);
      const result = await grantRevoke(id);
      if (result == 0) {
        setIsLoading(false);
        toast.success("Access Updated");
        // router.replace(router.asPath);
        onRevokeGrant();
      } else {
        setIsLoading(false);
        onRevokeGrant();

        toast.error("Failed to update user access");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Server Error");
      onRevokeGrant();
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4 border p-4 my-2 items-center">
          <div className="col-span-1">
            <h2 className="font-bold">Profile</h2>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={user.profileHash}
                  alt="Profile Picture"
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.fullName}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <h2 className="font-bold">Address</h2>
            <div className="text-sm text-gray-500">{user.addressLocation}</div>
          </div>
          <div className="col-span-1">
            <h2 className="font-bold">Role</h2>
            <div className="text-sm text-gray-500">{user.Role}</div>
          </div>
          <div className="col-span-1">
            <h2 className="font-bold">Verification Status</h2>
            <span className=" text-blue-600 font-semibold flex flex-row">
              {user.isVerified ? (
                <>
                  <img src="/Icons/Verify.svg" width={20} height={20} />
                  <span className="ml-2 ">Verfied</span>
                </>
              ) : (
                <div className="flex justify-end items-end">
                  <AiFillQuestionCircle size={20} />
                  <span className="ml-2">Unverified</span>
                </div>
              )}
            </span>{" "}
          </div>
          <div className="col-span-1">
            <h2 className="font-bold">Access Status</h2>
            {user.isBanned ? "Banned" : "Active"}
          </div>
          <div className="col-span-1">
            <h2></h2>
            {!user.isBanned ? (
              <CustomButton
                buttonType={undefined}
                disabled={user.isBanned ? true : false}
                title="Revoke Access"
                handleClick={() => {
                  revokeGrantAccess(user.id || "");
                }}
                styles="border border-red-500 text-red-500 rounded-md py-2 px-4 transition duration-300 hover:bg-red-500 hover:text-white"
              />
            ) : (
              <CustomButton
                disabled={user.isBanned ? false : true}
                buttonType={undefined}
                title="Grant Access"
                handleClick={() => {
                  revokeGrantAccess(user.id || "");
                }}
                styles="border border-green-500 text-green-500 rounded-md py-2 px-4 transition duration-300 hover:bg-green-500 hover:text-white"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;
