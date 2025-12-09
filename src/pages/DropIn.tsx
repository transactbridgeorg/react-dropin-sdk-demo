import { useEffect } from 'react';

// ````````````````FORM IMPORTS````````````````
import PaymentSessionTabs from '../components/PaymentSessionTabs';
import PayMethodTabs from '../components/PayMethodTabs';
import UPI from '../components/Inputs/Upi';
import Card from '../components/Card';
import TNC from '../components/TNC';
import PayButton from '../components/PayButton';

// ````````````````REDUX IMPORTS````````````````
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { setSdkReady } from '../redux/sdkSlice';

// ````````````````CONTEXT IMPORTS````````````````
import { useToast } from '../context/ToastContext';
import { useCommonContext } from '../context/CommonContextProvider';

// ````````````````HELPER IMPORTS````````````````
import { ensureScript, waitForSDK } from '../utils/helper';

// ````````````````CSS IMPORT````````````````
import './DropIn.css';


/* ----------------------------CONFIG START-------------------------- */
                                
const FONT_ORBITRON = '"Orbitron", sans-serif';
const FONT_ROBOTO = '"Roboto", sans-serif';

const FONTS = [
  {
    cssSrc: 'https://fonts.googleapis.com/css2?family=Roboto:wght@0,100..900&display=swap',
  },
  {
    cssSrc: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap',
  },
];

const POPUP_CONFIG_STYLE = {
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

const DropIn = () => {
  const { showToast } = useToast();
  const {selectedMethod} = useCommonContext();
  const dispatch = useDispatch();
  const sdkReducer = useSelector((state: RootState) => state.sdk);
  const {isSdkReady} = sdkReducer;

   useEffect(() => {
      if (typeof window === 'undefined') return;
      if (isSdkReady) return;
  
      (async () => {
        try{
        const loaded = await ensureScript({
          id: 'tb_sdk_script',
          waitForLoad: true,
          src: 'https://cdn.transactbridge.com/scripts/v1.0/sandbox-sdk.js', // Hosted SDK.
          // src: 'http://localhost:4000/sdk.js', // local sdk.
        });
        if (!loaded) {
          return;
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch(err) {
        showToast('Failed to load Script', 'danger');
      }
  
        const exists = await waitForSDK(); // Additional Check, just to make sure the sdk instance is actually on window object.
        if (!exists) {
          showToast('TBDropin not found on window.', 'danger');
          return console.error("TBDropin not found on window");
        }
  
        try {
          await window?.TBDropin?.init({
            mode: 'sandbox',
            // mode: 'development',
            popupConfig: POPUP_CONFIG_STYLE,
          });
  
          dispatch(setSdkReady(true));
        } catch (err) {
          console.error("SDK.init failed", err);
          showToast('Failed to initiate SDK.', 'danger');
        }
      })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <div className="wrapper">
      <div>
        <span className="badge text-bg-warning mb-2">SANDBOX</span>

        <div className="d-flex justify-content-between mb-4">
          <h4 className="m-0 fw-semibold">Payment Demo</h4>
          <img src="https://www.transactbridge.com/images/TB-logo.svg" width="110" alt="TB Logo" />
        </div>

        <PaymentSessionTabs />

        <p className="fw-semibold">Select Payment Method:</p>

        <PayMethodTabs />

            {selectedMethod === 'UPI' && <UPI />}
            {selectedMethod === 'CC' && <Card />}
            {selectedMethod === 'DC' && <Card />}

        <TNC />

        <PayButton />
      </div>
    </div>
  );
};

export default DropIn;
