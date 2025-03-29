import { LandModel } from "@/lib/models/land";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ActionType } from "./action-types";

export const createSucess = createAction<LandModel>(ActionType.CREATE_LAND);
export const setShowFileUpload = createAction<boolean>(
  ActionType.SET_SHOW_FILE_UPLOAD
);
export const setShowMapbox = createAction<boolean>(
  ActionType.SET_SHOW_lOCATE_LAND
);
export const setFilePath = createAction<string | null>(
  ActionType.SET_FILE_PATH
);
export const setLocationAddress = createAction<string | null>(
  ActionType.SET_LOCATION_ADDRESS
);
export const verifyLand = createAction<string | null>(ActionType.VERIFY_LAND);

export const getSellerLands = createAction<LandModel[]>(
  ActionType.GET_SELLER_LANDS
);

export const getAllAvaliableLands = createAction<LandModel[]>(
  ActionType.GET_ALL_LANDS
);

export const setBuyerActiveLink = createAction<number>(
  ActionType.SET_ACTIVE_LINK
);

export const setLandArea = createAction<number>(ActionType.SET_LAND_AREA);
