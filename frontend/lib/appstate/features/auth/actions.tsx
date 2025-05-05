import { User } from "@/lib/models/auth";
import { ErrorMessage } from "@/lib/models/responseMessage";
import {
  clearLocalStorage,
  initialLoadUser,
} from "@/lib/services/blockchainService/authcontractServices";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { ActionType } from "./action-types";

export const registerCompleted = createAction<User>(
  ActionType.REGISTERED_COMPLETED
);
export const authLoading = createAction<boolean>(ActionType.AUTH_LOADING);
export const authSucess = createAction<User>(ActionType.AUTH_SUCCESS);
export const authError = createAction<ErrorMessage>(ActionType.AUTH_ERROR);
export const clearAuthError = createAction<void>(ActionType.AUTH_CLEAR_ERROR);

export const intialLoad = createAsyncThunk<void, void>(
  ActionType.INITIAL_LOAD,
  async (_, thunkApi) => {
    thunkApi.dispatch(authLoading(true));
    const user = await initialLoadUser();
    user && thunkApi.dispatch(authSucess(user as User));
    !user && thunkApi.dispatch(clearAuthError());
  }
);

export const logOut = createAction(ActionType.LOGOUT, () => {
  clearLocalStorage();
  return {
    payload: null,
  };
});
export const setUser = createAction<User>("auth/setUser");