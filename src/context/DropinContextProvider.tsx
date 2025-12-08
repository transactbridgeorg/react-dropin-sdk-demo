/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { InputType, TBDropinFieldComponent } from '../dropin';
import { CARD_FIELDS, COMPONENT_CONFIG, INPUT_TYPE, PAY_METHOD, POPUP_CONFIG_STYLE, SESSION_TAB } from '../constants/const';
import { ensureScript, waitForSDK } from '../utils/helper';
import { useToast } from './ToastContext';

type FieldState = {
  value: string;
  isValid: boolean;
};

type FieldStateMap = Record<string, FieldState>;

export type DropinContextValue = {
  selectedMethod: InputType;
  isSdkReady: boolean;
  sessionId?: string;
  isPaying: boolean;
  mountActiveMethod: (arg: string) => void;
  setSessionId: (arg: string) => void;
  setSessionTab: (arg: string) => void;
  handlePayment: () => void;
};

const DropinContext = createContext<DropinContextValue | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

const DropinContextProvider: React.FC<Props> = ({ children }) => {
  // ---------------------------------------------
  // State
  // ---------------------------------------------
  const [selectedMethod, setSelectedMethod] = useState<InputType>(PAY_METHOD.UPI);
  const [activeSessionTab, setActiveSessionTab] = useState(SESSION_TAB.BILLING_SESSION);
  const [sessionId, setSessionId] = useState<string>();
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [fieldState, setFieldState] = useState<FieldStateMap>({});

  // ---------------------------------------------
  // Refs
  // ---------------------------------------------
  const sdkInstanceRef = useRef<any | null>(null);
  const mountedInputsRef = useRef<Record<string, TBDropinFieldComponent | undefined>>({});
  const hasMountedUpiOnce = useRef(false);
  const hasMountedTncOnce = useRef(false);

  const { showToast } = useToast();


  // ---------------------------------------------
  // Load SDK Script
  // ---------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sdkInstanceRef.current) return;

    (async () => {
      const loaded = await ensureScript({
        id: 'tb_sdk_script',
        waitForLoad: true,
        // src: 'https://cdn.transactbridge.com/scripts/v1.0/sandbox-sdk.js', // Hosted SDK.
        src: 'http://localhost:4000/sdk.js', // local sdk.
      });

      if (!loaded) {
        showToast('SDK script failed to load.', 'danger');
        return console.error("SDK script failed to load.");
      }

      const exists = await waitForSDK(); // Additional Check, just to make sure the sdk instance is actually on window object.
      if (!exists) {
        showToast('TBDropin not found on window.', 'danger');
        return console.error("TBDropin not found on window");
      }

      try {
        sdkInstanceRef.current = window.TBDropin;

        await sdkInstanceRef.current?.init({
          // mode: 'sandbox',
          mode: 'development',
          popupConfig: POPUP_CONFIG_STYLE,
        });

        setIsSdkReady(true);
      } catch (err) {
        console.error("SDK.init failed", err);
        showToast('Failed to initiate SDK.', 'danger');
      }
    })();
  }, [showToast]);


  const setField = (key: string, value: string, isValid: boolean) => {
  setFieldState((prev) => ({
    ...prev,
    [key]: { value, isValid }
  }));
};

const deleteFields = (keys: string[]) => {
  setFieldState((prev) => {
    const updated = { ...prev };
    keys.forEach((key) => {
      delete updated[key];
    });
    return updated;
  });
};


const areAllFieldsValid = () => {
  return Object.values(fieldState)?.every((field) => field?.isValid === true);
};


  // ---------------------------------------------
  // Generic Mount Function
  // ---------------------------------------------
  const mountInput = useCallback(
    ({ inputType }: {inputType: InputType}) => {
      if (!COMPONENT_CONFIG[inputType]) {
        return console.error("Invalid input type:", inputType);
      }

      if (!isSdkReady) return; // If SDK instance is not ready return
      if (mountedInputsRef.current[inputType]) return; // already mounted

      try {
        const { selector, element, config } = COMPONENT_CONFIG[inputType];
        const instance = sdkInstanceRef.current?.create(element, config);

        instance?.mount(selector);

        instance?.on("ready", () => console.log(`${inputType} ready`));
        instance?.on("change", (data: { value?: string; isValid?: boolean; } | unknown) => {
          const {value = '', isValid = false} = data as { value?: string; isValid?: boolean; };
          setField(inputType, value, isValid);
            console.log(inputType, data);
        });

        mountedInputsRef.current[inputType] = instance;
        return instance;
      } catch (err) {
        console.error(`Failed to mount ${inputType}:`, err);
      }
    },
    [isSdkReady]
  );

  // ---------------------------------------------
  // Unmount Helpers
  // ---------------------------------------------
  const unmountInput = (inputType: string) => {
    const instance = mountedInputsRef.current[inputType];
    if (instance) {
      instance?.unmount();
      delete mountedInputsRef.current[inputType];
    }
  };

  const unmountUpi = () => {
    unmountInput(INPUT_TYPE.UPI);
  }

  const unmountCard = () => {
    unmountInput(INPUT_TYPE.CARD_NUMBER);
    unmountInput(INPUT_TYPE.CARD_CVV);
    unmountInput(INPUT_TYPE.CARD_EXPIRY);
    unmountInput(INPUT_TYPE.CARD_HOLDER_NAME);
  };

  // Unmount by checking current Type.
  const handleUnmount = (method: string) => {
    if(method !== INPUT_TYPE.UPI) {
      unmountUpi();
      deleteFields([INPUT_TYPE.UPI]);
    }
    if(PAY_METHOD.DC !== method) {
      unmountCard();
      deleteFields(CARD_FIELDS);
    }
    if(PAY_METHOD.CC !== method) {
      unmountCard();
      deleteFields(CARD_FIELDS);
    }
  }

  // ---------------------------------------------
  // Mount UPI / CARD Methods
  // ---------------------------------------------
  const mountUpi = useCallback(() => {
    return mountInput({inputType: INPUT_TYPE.UPI});
  }, [mountInput]);

  const mountCard = () => {
    mountInput({inputType: INPUT_TYPE.CARD_NUMBER});
    mountInput({inputType: INPUT_TYPE.CARD_HOLDER_NAME});
    mountInput({inputType: INPUT_TYPE.CARD_CVV});
    mountInput({inputType: INPUT_TYPE.CARD_EXPIRY});
  };

  // ---------------------------------------------
  // Auto-Mount UPI (Once)
  // ---------------------------------------------
  useEffect(() => {
    if (hasMountedUpiOnce.current) return;
    const comp = mountUpi();
    if (comp) hasMountedUpiOnce.current = true;
  }, [mountUpi]);

  // ---------------------------------------------
  // Mount TnC (Once)
  // ---------------------------------------------
  const mountTnc = useCallback(() => {
    if (hasMountedTncOnce.current) return;

    try {
    const { selector, element, config } = COMPONENT_CONFIG["TB_TNC"];
    const instance = sdkInstanceRef.current?.create(element, config);
    instance?.mount(selector);

    hasMountedTncOnce.current = true;
    } catch(err) {
      showToast('Failed To load TNC:', 'warning');
      console.warn('Failed To load TNC:', err);
    }
  }, [showToast]);

  useEffect(() => {
    if (isSdkReady) mountTnc();
  }, [isSdkReady, mountTnc]);

  // ---------------------------------------------
  // Handle Method Switch
  // ---------------------------------------------
  const mountActiveMethod = (method: string) => {
    if(selectedMethod === method) return;
    setSelectedMethod(method);
    handleUnmount(method);

    if (method === INPUT_TYPE.UPI) mountUpi();
    if([PAY_METHOD.CC, PAY_METHOD.DC]?.includes(method)) mountCard();
  };

  // ---------------------------------------------
  // Payment
  // ---------------------------------------------
  const handlePayment = async () => {
    if (!isSdkReady) return;
    if (isPaying) return;

    if(!areAllFieldsValid()) {
      showToast('All fields must be valid.', 'danger');
      return;
    }

    const methodKey =
      selectedMethod === PAY_METHOD.UPI ? INPUT_TYPE.UPI : INPUT_TYPE.CARD_NUMBER;

    const payload = {
      payMethod: mountedInputsRef.current[methodKey],
      billingSessionId:
        activeSessionTab === SESSION_TAB.BILLING_SESSION ? sessionId : undefined,
      subscriptionId:
        activeSessionTab === SESSION_TAB.SUBSCRIPTION ? sessionId : undefined,
      cardType:
        [PAY_METHOD.CC, PAY_METHOD.DC]?.includes(selectedMethod)
          ? selectedMethod
          : undefined,
    };

    setIsPaying(true);

    try {
      const res = await sdkInstanceRef.current?.pay(payload);

      if (res?.data?.status === "success") {
        console.log("Success:", res?.data?.message);
      } else {
        showToast(res?.data?.error?.message || 'Something went wrong', 'danger');
      }
    } catch (err) {
      console.error("Payment Error:", err);
    } finally {
      setIsPaying(false);
    }
  };

  const setSessionTab = (session: string) => {
  setActiveSessionTab(session);
  setSessionId(undefined);
}

  // ---------------------------------------------
  // Context Value
  // ---------------------------------------------
  const value: DropinContextValue = {
    isSdkReady,
    selectedMethod,
    sessionId,
    isPaying,
    handlePayment,
    mountActiveMethod,
    setSessionTab,
    setSessionId,
  };

  return <DropinContext.Provider value={value}>{children}</DropinContext.Provider>;
};

// To Prevent Fast Refresh Type Error ( No Effect on the app ).
// eslint-disable-next-line react-refresh/only-export-components
export const useDropinContext = (): DropinContextValue => {
  const ctx = useContext(DropinContext);
  if (!ctx) {
    throw new Error('useDropinContext must be used within DropinContextProvider');
  }
  return ctx;
};

export default DropinContextProvider;