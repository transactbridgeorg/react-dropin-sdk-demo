/* eslint-disable @typescript-eslint/no-explicit-any */

import type { InputConfigItem } from '../dropin';

// ---------------------------
// Fonts
// ---------------------------

export const FONTS = [
  {
    cssSrc: 'https://fonts.googleapis.com/css2?family=Roboto:wght@0,100..900&display=swap',
  },
  {
    cssSrc: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap',
  },
];

export const FONT_ROBOTO = '"Roboto", sans-serif';
export const FONT_ORBITRON = '"Orbitron", sans-serif';

// ---------------------------
// Input Style
// ---------------------------

export const INPUT_STYLE: Record<string, any> = {
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

// ---------------------------
// Frame Style
// ---------------------------

export const FRAME_STYLE: Record<string, any> = {
  height: '44px',
  width: '100%',
  borderRadius: '',
  backgroundColor: '',
  border: 'none',
  padding: '',
};

// ---------------------------
// Icon Configuration
// ---------------------------

export const ICON_CONFIG = {
  styles: {
    width: '20px',
    height: '20px',
  },
};

// ---------------------------
// Popup Config Style
// ---------------------------

export const POPUP_CONFIG_STYLE: Record<string, any> = {
  fonts: FONTS,
  components: {
    timer: {
      circle: {
        stroke: 'gold !important',
      },
      styles: {
        fontFamily: FONT_ORBITRON,
        color: 'dimgray',
        backgroundColor: 'white',
      },
    },

    success: {
      backgroundColor: '#68c577',
      color: 'white',
    },

    failed: {
      backgroundColor: '#e06d6d',
      color: 'white',
    },

    processing: {
      backgroundColor: 'gold',
      color: 'white',
    },

    instruction: {
      fontFamily: FONT_ROBOTO,
      color: 'gray',
      fontSize: '14px',
    },

    bullet: {
      height: '24px',
      width: '24px',
      backgroundColor: 'dimgray',
    },

    label: {
      fontFamily: FONT_ROBOTO,
      color: 'darkgray',
      fontWeight: '500',
    },

    value: {
      fontFamily: FONT_ROBOTO,
      color: 'dimgray',
      fontWeight: 'normal',
    },

    note: {
      fontFamily: FONT_ROBOTO,
      color: 'gray',
      fontSize: '10px',
      fontWeight: '500',
    },

    base: {
      fontFamily: FONT_ROBOTO,
      backgroundColor: '#fff',
      color: 'darkslategray',
    },

    link: {
      color: 'blue',
      textDecoration: 'none',
      ':hover': {
        cursor: 'pointer',
        color: 'blueviolet',
      },
    },
  },

  frameStyle: {
    width: '40px',
    height: '60px',
    borderRadius: '15px',
  },
};

// ALL THE CONSTS ARE MOSTLY USED IN THIS CONST.
export const COMPONENT_CONFIG: { [key: string]: InputConfigItem } = {
  UPI: {
    element: 'tb_upiCollect',
    selector: "#upiCollect",
    config: {
      placeholder: 'Enter UPI',
      styles: INPUT_STYLE,
      icon: ICON_CONFIG,
      frameStyle: FRAME_STYLE,
      fonts: FONTS,
    },
  },
  // CC | DC RELATED INPUTS START
  CARD_NUMBER: {
    element: 'tb_cardNumber',
    selector: "#cardNumber",
    config: {
      placeholder: 'Enter Card Number',
      styles: INPUT_STYLE,
      frameStyle: FRAME_STYLE,
      icon: ICON_CONFIG,
      fonts: FONTS,
    },
  },
  CARD_CVV: {
    element: 'tb_cardCvv',
    selector: "#cardCvv",
    config: {
      styles: INPUT_STYLE,
      frameStyle: FRAME_STYLE,
      fonts: FONTS,
    },
  },
  CARD_EXPIRY: {
    element: 'tb_cardExp',
    selector: "#cardExp",
    config: {
      styles: INPUT_STYLE,
      frameStyle: FRAME_STYLE,
      fonts: FONTS,
    },
  },
  CARD_HOLDER_NAME: {
    element: 'tb_cardHolder',
    selector: "#cardHolder",
    config: {
      placeholder: 'Enter Card Holder Name',
      styles: INPUT_STYLE,
      frameStyle: FRAME_STYLE,
      fonts: FONTS,
    },
  },
  // CC | DC RELATED INPUTS END
  TB_TNC: {
    element: 'tb_tnc',
    selector: '#tnc',
    config: {
      buttonText: 'Pay',
      styles: {
        fontFamily: FONT_ROBOTO,
        fontSize: '12px',
        color: 'gray',
      },
      frameStyle: {
        visibility: 'hidden',
      },
      link: {
        'color': 'blue',
        ':hover': {
          cursor: 'pointer',
          color: 'red',
        },
      },
      fonts: FONTS,
    }
  }
};

export const SESSION_TAB = {
  BILLING_SESSION: 'BILLING_SESSION',
  SUBSCRIPTION: 'SUBSCRIPTION'
}

export const PAY_METHOD = {
  UPI: 'UPI',
  CC: 'CC',
  DC: 'DC',
}

export const INPUT_TYPE = {
  UPI: 'UPI',
  CARD_NUMBER: 'CARD_NUMBER',
  CARD_CVV: 'CARD_CVV',
  CARD_EXPIRY: 'CARD_EXPIRY',
  CARD_HOLDER_NAME: 'CARD_HOLDER_NAME',
};

export const CARD_FIELDS = [
  INPUT_TYPE.CARD_NUMBER,
  INPUT_TYPE.CARD_CVV,
  INPUT_TYPE.CARD_EXPIRY,
  INPUT_TYPE.CARD_HOLDER_NAME
];