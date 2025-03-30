import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";
export const selectRequest = (state: RootState) => state.Request;
export const RequestSelector = createSelector(selectRequest, (state) => state);
