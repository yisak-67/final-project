import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";

export const setlectAuth = (state: RootState) => state.Auth;
export const AuthSelector = createSelector(setlectAuth, (state) => state);
