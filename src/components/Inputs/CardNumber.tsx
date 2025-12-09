'use client';
import { useEffect } from "react";

// ````````````````REDUX IMPORTS````````````````
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { setCardNumber } from "../../redux/cardSlice";

// ````````````````CONTEXT IMPORTS````````````````
import { useCommonContext } from "../../context/CommonContextProvider";

const FONT_ROBOTO = '"Roboto", sans-serif';

const INPUT_STYLE = {
  fontFamily: FONT_ROBOTO,
  padding: '12px',
  color: '#333',
  borderRadius: '8px',
  width: 'calc(100% - 6px)',
  border: '1px solid #d9d9d9',
  height: '38px',
  margin: '3px',

  [':focus']: {
    border: '1px solid #007aff',
  },

  [':hover']: {
    border: '1px solid #007aff',
    outline: '3px solid #007aff40',
  },

  ['::placeholder']: { color: 'gray' },
};

const FRAME_STYLE = {
  height: '44px',
  width: '100%',
  borderRadius: '',
  backgroundColor: '',
  border: 'none',
  padding: '',
};

const ICON_CONFIG = {
  styles: {
    width: '20px',
    height: '20px',
  },
};

const FONTS = [
  {
    cssSrc: 'https://fonts.googleapis.com/css2?family=Roboto:wght@0,100..900&display=swap',
  },
  {
    cssSrc: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap',
  },
];

const CARD_NUMBER_CONFIG = {
      placeholder: 'Enter Card Number',
      styles: INPUT_STYLE,
      frameStyle: FRAME_STYLE,
      icon: ICON_CONFIG,
      fonts: FONTS,
    }

const CardNumber = () => {
  const {setSelectedPaymentMethod} = useCommonContext();
  const dispatch = useDispatch();
  const sdkReducer = useSelector((state: RootState) => state.sdk);
  const {isSdkReady} = sdkReducer;

  useEffect(() => { 
    if (!isSdkReady) return;
    const instance = window?.TBDropin?.create('tb_cardNumber', CARD_NUMBER_CONFIG);
    instance?.mount('#cardNumber');

    // Save Instance of Card Number to Pass while initiating payment.
    setSelectedPaymentMethod(instance);

    instance?.on("change", (data: { value?: string; isValid?: boolean; }) => {
        const {isValid = false} = data as { value?: string; isValid?: boolean; };
        dispatch(setCardNumber(isValid));
    });
    
    return () => instance?.unmount();

    // Do Not Add Any Dependency to this hook.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSdkReady]);

  return (
        <div className="mb-3" id="cardNumber">
        </div>
  );
};

export default CardNumber