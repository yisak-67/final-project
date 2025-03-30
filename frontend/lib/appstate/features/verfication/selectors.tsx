import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";
export const selectVerification = (state: RootState) => state.Verfication;
export const VerficationSelector = createSelector(
  selectVerification,
  (state) => state
);
