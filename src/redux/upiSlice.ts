import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* -------------------------------------------------------------------------- */
/*                                   UPI SLICE                                */
/* -------------------------------------------------------------------------- */

interface UpiState {
  isUpiComplete: boolean;
}

const initialUpiState: UpiState = {
  isUpiComplete: false,
};

const upiSlice = createSlice({
  name: "upi",
  initialState: initialUpiState,
  reducers: {
    setUpiComplete: (state: UpiState, action: PayloadAction<boolean>) => {
      state.isUpiComplete = action.payload;
    },
  },
});

// UPI ACTION
export const { setUpiComplete } = upiSlice.actions;

// UPI REDUCER
export const upiReducer = upiSlice.reducer;