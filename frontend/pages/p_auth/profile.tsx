import Layout from "@/components/admin/layout";
import ViewProfile from "@/components/profile/viewProfile";
import React from "react";

const Profile = () => {
  return (
    <Layout>
      <div className="ml-[270px] h-full">
        <ViewProfile />
      </div>
    </Layout>
  );
};

export default Profile;
