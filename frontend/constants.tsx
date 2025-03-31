import { NavLinkModel } from "./lib/models/commonModels";

const sellerNavLinks: NavLinkModel[] = [
  {
    name: "Dashboard",
    link: "/p_seller/Dashboard",
    icon: "/Icons/dashboard.svg",
  },
  {
    name: "ManageLand",
    link: "/p_seller/ManageLand",
    icon: "/Icons/manageland.svg",
  },
  {
    name: "ManageRequest",
    link: "/p_seller/ManageRequest",
    icon: "/Icons/request.svg",
  },
  {
    name: "PaymentCenter",
    link: "/p_seller/PaymentCenter",
    icon: "/Icons/payment.svg",
  },
  {
    name: "Setting",
    link: "/p_seller/Setting",
    icon: "/Icons/setting.svg",
  },
];

const buyerNavLinks: NavLinkModel[] = [
  {
    name: "home",
    link: "/p_buyer/buyer_page",
  },
  {
    name: "manageRequest",
    link: "/p_buyer/manageRequest",
  },
  {
    name: "manageLand",
    link: "/p_buyer/manageLand",
  },
  {
    name: "paymentCenter",
    link: "/p_admin/paymentCenter",
  },
  {
    name: "LogOut",
    link: "/logOut",
  },
];

const adminNavLinks: NavLinkModel[] = [
  {
    name: "Dashboard",
    link: "/p_admin/admin_page",
    icon: "/Icons/dashboard.svg",
    linkName: "admin_page",
  },
  {
    name: "Verification",
    link: "/p_admin/verification",
    icon: "/Icons/Verification.svg",
    linkName: "verification",
  },

  {
    name: "Transfer Ownership",
    link: "/p_admin/transferOwnerShip",
    icon: "/Icons/TransferLand.svg",
    linkName: "transferOwnerShip",
  },
  {
    name: "Manage Lands",
    link: "/p_admin/manageLand",
    icon: "/Icons/manageLand.svg",
    linkName: "manageLand",
  },
  {
    name: "Manage Users",
    link: "/p_admin/manageUser",
    icon: "/Icons/ManageUsers.svg",
    linkName: "manageUser",
  },
];

export { sellerNavLinks, buyerNavLinks, adminNavLinks };
