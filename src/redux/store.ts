import { configureStore } from "@reduxjs/toolkit";
import { sdkReducer } from "./sdkSlice";
import { upiReducer } from "./upiSlice";
import { cardReducer } from "./cardSlice";

export const store = configureStore({
  reducer: {
    sdk: sdkReducer,
    upi: upiReducer,
    card: cardReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = typeof store;

// Inferred state type
export type RootState = ReturnType<AppStore["getState"]>;

// Inferred dispatch type
export type AppDispatch = AppStore["dispatch"];

export default store;
