import { LandModel } from "@/lib/models/land";
import { ErrorMessage } from "@/lib/models/responseMessage";
import { User } from "@/lib/models/auth";
import { createReducer } from "@reduxjs/toolkit";
import {
  authError,
  authLoading,
  authSucess,
  clearAuthError,
  logOut,
  registerCompleted,
  setUser,
} from "./actions";

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: ErrorMessage | null;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const AuthReducer = createReducer(initialState, (builder) => {
  builder.addCase(registerCompleted, (state, { payload }) => {
    return { ...state, user: payload, error: null };
  });
  builder.addCase(authLoading, (state, { payload }) => {
    return { ...state, isLoading: payload, error: null };
  });
  builder.addCase(authError, (state, { payload }) => {
    return { ...state, isLoading: false, error: payload };
  });
  builder.addCase(clearAuthError, (state, { payload }) => {
    return { ...state, isLoading: false, error: null };
  });
  builder.addCase(authSucess, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      isAuthenticated: true,
      user: payload,
      error: null,
    };
  });
  builder.addCase(logOut, (state) => {
    return {
      ...state,
      error: null,
      isLoading: false,
      isAuthenticated: false,
      user: null,
    };
  });
  builder.addCase(setUser, (state, { payload }) => {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    };
  });
});