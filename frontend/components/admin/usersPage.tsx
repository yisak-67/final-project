import { User } from "@/lib/models/auth";
import UserDetailrow from "./userDetailRow";

interface UsersPageProps {
  users: User[];
  currentPage: number;
  usersPerPage: number;
  paginate: (pageNumber: number) => void;
}

const UsersPage: React.FC<UsersPageProps> = ({
  users,
  currentPage,
  usersPerPage,
  paginate,
}) => {
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user, index) => (
                  <UserDetailrow user={user} key={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-7 ">
        {Array(Math.ceil(users.length / usersPerPage))
          .fill(null)
          .map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 border border-gray-300 rounded ${
                currentPage === index + 1 ? "bg-gray-200" : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default UsersPage;