import { User } from "./auth";

export interface LandModel {
  id?: number;
  title?: string;
  documentHash?: string;
  price?: string;
  locationAddress?: string;
  landAddress?: string;
  postedBy?: string;
  detail?: string;
  postedDate?: Date;
  isVerified?: boolean;
  area?: string;
}

export interface LandUpdateModel {
  id?: number;
  price?: string;
  detail?: string;
}

export const parseLandData = (data: any): LandModel => {
  return {
    id: data["0"],
    title: data["1"],
    documentHash: data["2"],
    price: data["3"].toString(),
    locationAddress: data["4"],
    landAddress: data["5"],
    postedBy: data["6"],
    detail: data["7"],
    postedDate: new Date(Number(data["8"])),
    isVerified: data["9"],
    area: data["10"].toString(),
  };
};

export const parseRequestData = (data: any): RequestModel => {
  return {
    requestId: data["0"].toString(),
    key: data["0"],
    id: data["0"],
    status:
      data["5"] == 0
        ? RequestStutus.Requested
        : data["5"] == 1
        ? RequestStutus.Accepted
        : data["5"] == 2
        ? RequestStutus.Rejected
        : RequestStutus.Completed,
    sellerId: data["1"],
    buyerId: data["2"],
    landId: data["3"].toString(),
    isPaymentDone: data["4"] == false ? "Not Completed" : "Completed",
  };
};

export interface LandCoordinates {
  coordinates: number[][];
}

export interface RequestModel {
  requestId?: string;
  key?: number;
  id?: number;
  status?: RequestStutus;
  sellerId?: string;
  sellerName?: string;
  buyerName?: string;
  buyerId?: string;
  isPaymentDone?: string;
  landId: string;
}
export interface LandHistory {
  user: User;
  date: Date;
}

export enum RequestStutus {
  Requested = "Requested",
  Accepted = "Accepted",
  Rejected = "Rejected",
  Completed = "Completed",
  PAID = "PAID",
  REQUESTED = "REQUESTED",
}

export interface LocateMapReturnType {
  allLatlong: number[][];
  lArea: number;
}
