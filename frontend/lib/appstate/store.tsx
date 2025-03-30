import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { AuthReducer } from "./features/auth/reducer";
import { LandReducer } from "./features/land/reducer";
import { PaymentReducer } from "./features/payment/reducer";
import { RequestReducer } from "./features/request/reducer";
import { TransferReducer } from "./features/transfer/reducer";
import { VerificationReducer } from "./features/verfication/reducer";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const mainStore = configureStore({
  middleware: customizedMiddleware,
  reducer: {
    land: LandReducer,
    Auth: AuthReducer,
    Request: RequestReducer,
    Transfer: TransferReducer,
    Verfication: VerificationReducer,
    Payment: PaymentReducer,
  },
});

export type AppDispatch = typeof mainStore.dispatch;
export type RootState = ReturnType<typeof mainStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
