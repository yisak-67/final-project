import React from "react";
import Layout from "@/components/admin/layout";
import ViewProfile from "@/components/profile/viewProfile";

const UserProfile = () => {
  return (
    <Layout>
      <div className="ml-[270px] h-full">
        <ViewProfile />
      </div>
    </Layout>
  );
};

export default UserProfile;
