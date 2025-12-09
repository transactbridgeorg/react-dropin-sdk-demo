import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* -------------------------------------------------------------------------- */
/*                                   CARD SLICE                               */
/* -------------------------------------------------------------------------- */

interface CardState {
  isCardNumberComplete: boolean;
  isCardHolderNameComplete: boolean;
  isCardExpiryComplete: boolean;
  isCardCvvComplete: boolean;
}

const initialCardState: CardState = {
  isCardNumberComplete: false,
  isCardHolderNameComplete: false,
  isCardExpiryComplete: false,
  isCardCvvComplete: false,
};

const cardSlice = createSlice({
  name: "card",
  initialState: initialCardState,
  reducers: {
    setCardNumber: (state: CardState, action: PayloadAction<boolean>) => {
      state.isCardNumberComplete = action.payload;
    },
    setCardHolderName: (state: CardState, action: PayloadAction<boolean>) => {
      state.isCardHolderNameComplete = action.payload;
    },
    setCardExpiry: (state: CardState, action: PayloadAction<boolean>) => {
      state.isCardExpiryComplete = action.payload;
    },
    setCardCvv: (state: CardState, action: PayloadAction<boolean>) => {
      state.isCardCvvComplete = action.payload;
    },
  },
});

// CARD ACTIONS
export const {
  setCardNumber,
  setCardHolderName,
  setCardExpiry,
  setCardCvv,
} = cardSlice.actions;

// CARD REDUCERS
export const cardReducer = cardSlice.reducer;