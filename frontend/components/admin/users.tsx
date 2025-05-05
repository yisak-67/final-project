import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
export interface User {
  profile: string;
  fullName: string;
  status: string;
}
interface Props {
  allUsers: User[];
}

const UsersList: React.FC<Props> = ({ allUsers }) => {
  const [activePage, setActivePage] = useState(1);
  const itemsCountPerPage = 5;

  // Calculate the users to display on the current page
  const startIndex = (activePage - 1) * itemsCountPerPage;
  const endIndex = startIndex + itemsCountPerPage;
  const currentUsers = allUsers.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex flex-col justify-between min-h-[400px] gap-8">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profile
              </th>
              <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full name
              </th>
              <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto">
                    <img
                      src={user.profile}
                      alt="Profile pic"
                      className="rounded-full object-cover shadow-sm"
                      width={48}
                      height={48}
                    />
                  </div>
                </td>
                <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-sm text-gray-900">
                  {user.fullName}
                </td>
                <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-center">
                  <div
                    className={`inline-flex items-center rounded-full py-1 px-2 sm:px-3 text-xs sm:text-sm font-semibold ${
                      user.status === "verified"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {user.status === "verified" ? (
                      <svg className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 mr-1 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {user.status === "verified" ? "Verified" : "Pending"}
                  </div>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan={3} className="py-6 px-4 sm:px-6 text-center text-gray-500">
                  No users to display on this page.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {allUsers.length > itemsCountPerPage && (
        <div className="mt-6 flex justify-center items-center">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={allUsers.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            itemClass="inline-flex items-center px-3 py-1 mx-1 rounded-md bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-200 transition ease-in-out duration-150"
            linkClass=""
            activeClass="bg-blue-500 text-white hover:bg-blue-600 focus:shadow-outline-blue"
            disabledClass="opacity-50 cursor-not-allowed"
            prevPageText={<span className="sr-only">Previous</span>}
            nextPageText={<span className="sr-only">Next</span>}
            firstPageText={<span className="sr-only">First</span>}
            lastPageText={<span className="sr-only">Last</span>}
          />
        </div>
      )}
    </div>
  );
};

export default UsersList;