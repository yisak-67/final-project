import { User } from "@/lib/models/auth";
import { getUserAddress_s } from "@/lib/services/blockchainService/authcontractServices";
import { useEffect, useState } from "react";
import UsersPage from "./usersPage";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [usersLength, setUsersLength] = useState<number>(0);
  const getUsers = async () => {
    console.log("Get users function is called");
    const userAddresses = await getUserAddress_s();
    if (userAddresses != null) {
      setUsers(userAddresses);
      setUsersLength(userAddresses.length);
    }
    setShowLoader(false);
  };
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    setUsersLength(users.length);
  }, [users, usersLength]);
  return (
    <div>
      {showLoader ? (
        <div className="flex justify-center h-full  ">
          <img
            src="/images/svg/loadersvg.svg"
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />{" "}
        </div>
      ) : users.length ? (
        <div>
          <UsersPage
            users={users}
            currentPage={1}
            usersPerPage={5}
            paginate={() => {}}
          />
        </div>
      ) : (
        <div>
          <h2>There is no users to be verified.</h2>
        </div>
      )}
    </div>
  );
};
export default Users;
