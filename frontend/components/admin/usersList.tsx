import React, { useState } from "react";
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
  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };
  return (
    <div className="container mx-auto px-6 pt-2 flex flex-col justify-between h-full gap-10">
      <table className="w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-100 font-bold  text-sm text-gray-600 border-b border-gray-200">
              Profile
            </th>
            <th className="py-3 px-6 bg-gray-100 font-bold  text-sm text-gray-600 border-b border-gray-200">
              Full name
            </th>
           
            <th className="py-3 px-6 bg-gray-100 font-bold  text-sm text-gray-600 border-b border-gray-200">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={index}>
              <td className="py-4 px-6 text-center border-b border-gray-200">
                <div className="w-[12] h-[12] flex justify-center items-center ">
                  <img
                    src={user.profile}
                    alt="Profile pic"
                    className="rounded-full object-cover"
                    width={80}
                    height={100}
                  />
                </div>
              </td>
              <td className="py-4 px-6 text-center border-b border-gray-200">
                {user.fullName}
              </td>
            
              <td className="py-4 px-6 text-center border-b border-gray-200">
                <div
                  className={`rounded-full py-1 px-3 text-sm font-semibold ${
                    user.status === "verified"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-gray-800"
                  }`}
                >
                  {user.status === "verified" ? "Verified" : "Pending"}
                </div>
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
      {/* pagination */}
      {allUsers.length >= 2 && (
        <div className="mt-4 flex justify-center items-center">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={allUsers.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            itemClass="page-item inline-block px-3 py-1 mx-1 rounded-md bg-blue-200 hover:bg-blue-300"
            linkClass="page-link"
            activeLinkClass="text-white bg-blue-500"
          />
        </div>
      )}
    </div>
  );
};

export default UsersList;