import { LandModel } from "@/lib/models/land";
import { ErrorMessage } from "@/lib/models/responseMessage";
import { createReducer } from "@reduxjs/toolkit";
import {
  createSucess,
  getAllAvaliableLands,
  getSellerLands,
  setBuyerActiveLink,
  setFilePath,
  setLandArea,
  setLocationAddress,
  setShowFileUpload,
  setShowMapbox,
} from "./actions";

export type LandState = {
  land: LandModel | null;
  isCreating: boolean;
  error: ErrorMessage | null;
  isCreated: boolean;
  isFileUploadShowing: boolean;
  isLocateLandShowing: boolean;
  filePath: string | null;
  locationAddress: string | null;
  sellerLands: LandModel[] | null;
  avaliableLands: LandModel[] | null;
  buyerActiveLink: number;
  landArea: number;
};

const initialState: LandState = {
  land: null,
  isCreating: false,
  isCreated: false,
  error: null,
  isFileUploadShowing: false,
  isLocateLandShowing: false,
  filePath: null,
  locationAddress: null,
  sellerLands: null,
  avaliableLands: null,
  buyerActiveLink: 0,
  landArea: 0,
};

export const LandReducer = createReducer(initialState, (builder) => {
  builder.addCase(setShowFileUpload, (state, { payload }) => {
    return {
      ...state,
      isFileUploadShowing: payload,
      isLocateLandShowing: false,
      error: null,
    };
  });

  builder.addCase(setShowMapbox, (state, { payload }) => {
    return {
      ...state,
      isLocateLandShowing: payload,
      isFileUploadShowing: false,
      error: null,
    };
  });

  builder.addCase(createSucess, (state, { payload }) => {
    return { ...state, isCreated: true };
  });

  builder.addCase(setFilePath, (state, { payload }) => {
    return { ...state, filePath: payload };
  });

  builder.addCase(setLocationAddress, (state, { payload }) => {
    return { ...state, locationAddress: payload };
  });

  builder.addCase(getSellerLands, (state, { payload }) => {
    return { ...state, sellerLands: payload };
  });

  builder.addCase(getAllAvaliableLands, (state, { payload }) => {
    return { ...state, avaliableLands: payload };
  });

  builder.addCase(setBuyerActiveLink, (state, { payload }) => {
    return { ...state, buyerActiveLink: payload };
  });
  builder.addCase(setLandArea, (state, { payload }) => {
    return { ...state, landArea: payload };
  });
});
