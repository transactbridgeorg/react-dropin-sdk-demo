/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, type ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface CommonState {
  selectedMethod: string;
  billingSessionId: string;
  subscriptionId: string;
  selectedPaymentMethod: any | null;
}

interface CommonContextValue extends CommonState {
  setSelectedMethod: (method: string) => void;
  setBillingSessionId: (id: string) => void;
  setSubscriptionId: (id: string) => void;
  setSelectedPaymentMethod: (method: any) => void;
}

/* -------------------------------------------------------------------------- */
/*                                  DEFAULT STATE                             */
/* -------------------------------------------------------------------------- */

const initialCommonState: CommonState = {
  selectedMethod: "UPI",
  billingSessionId: "",
  subscriptionId: "",
  selectedPaymentMethod: null,
};

/* -------------------------------------------------------------------------- */
/*                               CONTEXT SETUP                                */
/* -------------------------------------------------------------------------- */

const CommonContext = createContext<CommonContextValue | undefined>(undefined);

export const CommonProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMethod, setSelectedMethod] = useState(initialCommonState.selectedMethod);
  const [billingSessionId, setBillingSessionId] = useState(initialCommonState.billingSessionId);
  const [subscriptionId, setSubscriptionId] = useState(initialCommonState.subscriptionId);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(
    initialCommonState.selectedPaymentMethod
  );

  return (
    <CommonContext.Provider
      value={{
        selectedMethod,
        billingSessionId,
        subscriptionId,
        selectedPaymentMethod,
        setSelectedMethod,
        setBillingSessionId,
        setSubscriptionId,
        setSelectedPaymentMethod,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/*                               CUSTOM HOOK                                  */
/* -------------------------------------------------------------------------- */

// eslint-disable-next-line react-refresh/only-export-components
export const useCommonContext = () => {
  const ctx = useContext(CommonContext);
  if (!ctx) {
    throw new Error("useCommonContext must be used within CommonProvider");
  }
  return ctx;
};
