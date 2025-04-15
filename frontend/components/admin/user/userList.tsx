// components/LandsList.tsx
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { User } from "@/lib/models/auth";
import UserCard from "./userCard";
import { getUserAddress_s } from "@/lib/services/blockchainService/authcontractServices";
import { Loader } from "@/components/common";
const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState(1);
  const itemsCountPerPage = 5; // Set how many items per page you want

  const filteredLands = users.filter(
    (land) =>
      land.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      land.addressLocation?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };
  const [usersFetched, setUsersFetched] = useState(false);
  const getUsers = async () => {
    console.log("Get users is called");
    try {
      const users = await getUserAddress_s();
      setUsers(users || []);
      setUsersFetched(true);
    } catch (error) {}
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      {!usersFetched && <Loader />}
      {usersFetched && (
        <div className="container mx-auto">
          <div className="my-4">
            <input
              className="border-2 border-gray-300 md:w-1/2 bg-white h-16 px-5 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search by name or location"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <div>
            {filteredLands.length ? (
              filteredLands.map((user, index) => (
                <UserCard
                  key={`${user.id} ${index}`}
                  user={user}
                  onRevokeGrant={getUsers}
                />
              ))
            ) : (
              <div className="flex justify-center items-center h-screen">
                <div className="bg-gray-200 p-8 rounded-lg">
                  <p className="text-center text-xl">Empty Search results.</p>
                </div>
              </div>
            )}
          </div>
          {filteredLands.length > 5 && (
            <div className="mt-4 flex justify-center items-center">
              <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={filteredLands.length}
                pageRangeDisplayed={2}
                onChange={handlePageChange}
                itemClass="page-item inline-block px-3 py-1 mx-1 rounded-md bg-blue-200 hover:bg-blue-300"
                linkClass="page-link"
                activeLinkClass="text-white bg-blue-500"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UsersList;
