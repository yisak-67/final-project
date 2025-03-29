export interface User {
  id?: string;
  fullName?: string;
  profileHash?: string;
  email: string;
  password: string;
  phoneNumber: string;
  isLoggedIn?: boolean;
  addressLocation: string;
  Role: UserType;
  isVerified?: boolean;
  isBanned?: boolean;
  dateJoined?: Date;
}
export const parseUser = (data: any): User => {
  return {
    id: data["0"],
    fullName: data["1"],
    profileHash: data["2"],
    email: data["3"],
    password: data["4"],
    phoneNumber: data["5"],
    isLoggedIn: data["6"],
    addressLocation: data["7"],
    Role: data["8"],
    isVerified: data["9"],
    isBanned: data["10"],
    dateJoined: new Date(Number(data["11"])),
  };
};

export enum UserType {
  Anonymous = "Anonymous",
  Admin = "Admin",
  Buyer = "Buyer",
  Seller = "Seller",
}

export interface LoginForm {
  email: string;
  password: string;
}
