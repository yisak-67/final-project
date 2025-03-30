import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";
export const selectTransfer = (state: RootState) => state.Transfer;
export const TransferSelector = createSelector(
  selectTransfer,
  (state) => state
);
