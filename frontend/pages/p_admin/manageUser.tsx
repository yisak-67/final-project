import Header from "@/components/admin/land/header";
import Layout from "@/components/admin/layout";
import UsersList from "@/components/admin/user/userList";
import { CustomButton, Loader } from "@/components/common";
import { User } from "@/lib/models/auth";
import { getUserAddress_s } from "@/lib/services/blockchainService/authcontractServices";
import { useEffect, useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";

const ManageUser = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Layout>
      <div className="md:ml-[270px] h-full flex flex-col items-start">
        <Header title="Users" />
        <UsersList />
      </div>
    </Layout>
  );
};

export default ManageUser;
