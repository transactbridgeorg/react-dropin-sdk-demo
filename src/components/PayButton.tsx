'use client';
import { useState } from "react";

// ````````````````REDUX IMPORTS````````````````
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

// ````````````````CONTEXT IMPORTS````````````````
import { useToast } from "../context/ToastContext";
import { useCommonContext } from "../context/CommonContextProvider";

const PayButton = () => {
  const {showToast} = useToast();
  const [isPaying, setIsPaying] = useState(false);
  const sdkReducer = useSelector((state: RootState) => state.sdk);
  const {isSdkReady} = sdkReducer;
  const {selectedMethod, selectedPaymentMethod, billingSessionId, subscriptionId} = useCommonContext();
  const upiReducer = useSelector((state: RootState) => state.upi);
  const {isUpiComplete} = upiReducer;
  const cardReducer = useSelector((state: RootState) => state.card);
  const {
    isCardNumberComplete,
    isCardHolderNameComplete,
    isCardExpiryComplete,
    isCardCvvComplete
  } = cardReducer;

  const areAllFieldsValid = (method: string) => {
    if(method === 'UPI') return isUpiComplete;
    if(['CC', 'DC'].includes(method)) {
      return (isCardNumberComplete &&
        isCardHolderNameComplete &&
        isCardExpiryComplete &&
        isCardCvvComplete);
    }
  }

   const handlePayment = async () => {
      if (!isSdkReady) return;
      if (isPaying) return;
  
      if(!areAllFieldsValid(selectedMethod)) {
        showToast('All fields must be valid.', 'danger');
        return;
      }

      const payload = {
        payMethod: selectedPaymentMethod,
        billingSessionId: billingSessionId || undefined,
        subscriptionId: subscriptionId || undefined,
        cardType:
          ['CC', 'DC']?.includes(selectedMethod)
            ? selectedMethod
            : undefined,
      };
  
      setIsPaying(true);
  
      try {
        const res = await window?.TBDropin?.pay(payload);
  
        if (res?.data?.status === "success") {
          console.log("Success:", res?.data?.message);
        } else {
          showToast(res?.data?.error?.message || 'Something went wrong', 'danger');
        }
      } catch (err) {
        showToast('Payment Error', 'danger');
        console.error("Payment Error:", err);
      } finally {
        setIsPaying(false);
      }
    };

  return (
    <button id="payBtn" disabled={!isSdkReady || isPaying} className="pay-btn" onClick={handlePayment}>
          {isPaying ? 'Processing...' : 'Pay'}
        </button>
  )
}

export default PayButton