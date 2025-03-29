import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";

// In your selectors file
export const selectLand = (state: RootState) => state.land; // lowercase 'land' to match store

export const LandSelector = createSelector(selectLand, (state) => state);