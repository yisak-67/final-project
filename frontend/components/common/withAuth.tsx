import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppSelector } from "@/lib/appstate";
import { AuthSelector } from "@/lib/appstate/features/auth/selectors";
 // Adjusted the path to match the correct file structure
import Loader from "./Loader";
import { UserType } from "@/lib/models/auth";

export const withAuth = (WrappedComponent: any, allowedRoles: UserType[]) => {
  return (props: any) => {
    const router = useRouter();
    const { isAuthenticated, user, isLoading } = useAppSelector(AuthSelector);

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push("/p_auth/login")
          ;
        } else if (user?.Role && !allowedRoles.includes(user.Role)) {
          // Redirect to appropriate page based on user role
          switch (user.Role) {
            case UserType.Admin:
              router.push("/p_admin/admin_page");
              break;
            case UserType.Buyer:
              router.push("/p_buyer/buyer_page");
              break;
            case UserType.Seller:
              router.push("/p_seller/seller_page");
              break;
            default:
              router.push("/");
          }
        }
      }
    }, [isAuthenticated, user, isLoading, router]);

    if (isLoading || !isAuthenticated || (user?.Role && !allowedRoles.includes(user.Role))) {
      return <Loader />;
    }

    return <WrappedComponent {...props} />;
  };
};