import { withAuth } from "@/components/common/withAuth";
import { UserType } from "@/lib/models/auth";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export const AdminLayout = withAuth(AdminLayoutComponent, [UserType.Admin]);