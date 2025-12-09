import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* -------------------------------------------------------------------------- */
/*                                   SDK SLICE                                */
/* -------------------------------------------------------------------------- */

interface SdkState {
  isSdkReady: boolean;
}

const initialSdkState: SdkState = {
  isSdkReady: false,
};

const sdkSlice = createSlice({
  name: "sdk",
  initialState: initialSdkState,
  reducers: {
    setSdkReady: (state, action: PayloadAction<boolean>) => {
      state.isSdkReady = action.payload;
    },
  },
});

// ACTION EXPORTS
export const { setSdkReady } = sdkSlice.actions;

// REDUCER EXPORT
export const sdkReducer = sdkSlice.reducer;
