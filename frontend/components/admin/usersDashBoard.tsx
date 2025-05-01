import { FaUsersCog } from "react-icons/fa";
import UsersList from "./usersList";
import { User } from "@/lib/models/auth";

type Props = {
  users: User[];
};

const UsersDashBoard = ({ users }: Props) => {
  console.log("users", users);
  return (
    <div className="p-4 sm:p-6 lg:p-8"> {/* Responsive padding for the whole dashboard */}
      <div className="flex justify-start items-center align-baseline mt-4 sm:mt-6 md:mt-8 pl-2 sm:pl-4 md:pl-6 w-full sm:w-3/4 md:w-1/2 gap-4"> {/* Responsive width and padding */}
        <span className="text-xl font-semibold text-gray-800">Users</span> {/* Improved typography */}
        <div className="text-white bg-gray-500 rounded-md p-2 shadow-sm flex items-center justify-center w-10 h-10"> {/* Better styling for the icon container */}
          <FaUsersCog size={20} />
        </div>
      </div>
      <div className="mt-6"> {/* Add some space below the header */}
        <UsersList
          allUsers={users.map((user) => ({
            profile: user.profileHash || "",
            fullName: user.fullName || "",
            status: user.isVerified ? "verified" : "unverified",
          }))}
        />
      </div>
    </div>
  );
};

export default UsersDashBoard;