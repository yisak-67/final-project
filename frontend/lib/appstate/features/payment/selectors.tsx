import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";
export const selectPayment = (state: RootState) => state.Payment;
export const PaymentSelector = createSelector(selectPayment, (state) => state);
