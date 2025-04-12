import { FaUsersCog } from "react-icons/fa";
import UsersList from "./usersList";
import { User } from "@/lib/models/auth";
type Props = {
  users: User[];
};
const UsersDashBoard = ({ users }: Props) => {
  return (
    <div>
      <div className="flex justify-start items-start align-baseline mt-2 pl-5 w-1/2 gap-4">
        <span>Users</span>
        <div className="text-white w-[100] bg-gray-400 rounded ">
          <FaUsersCog size={20} />
        </div>
      </div>
      <UsersList
  allUsers={users.map((user) => ({
    profile: user.profileHash || "",
    fullName: user.fullName || "",
    dateJoined: user.dateJoined ?? new Date(), // provide a default value if dateJoined is undefined
    status: user.isVerified ? "verified" : "unverified",
  }))}
/>
      
    </div>
  );
};

export default UsersDashBoard;
