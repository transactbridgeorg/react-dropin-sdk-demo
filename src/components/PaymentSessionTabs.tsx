'use client';
import { useState } from "react";

// ````````````````CONTEXT IMPORT````````````````
import { useCommonContext } from "../context/CommonContextProvider";

const PaymentSessionTabs = () => {
    const [session, setSession] = useState('BILLING_SESSION');
  const {billingSessionId, setBillingSessionId, subscriptionId, setSubscriptionId} = useCommonContext();

    const setSessionTab = (_session: string) => {
        setSession(_session);
    setBillingSessionId('');
    setSubscriptionId('');
  }

  return (
    <>
        <div className="nav d-flex gap-2 mb-3">
            <button className="tab-btn active" data-bs-toggle="tab" onClick={() => setSessionTab('BILLING_SESSION')}>
            Billing Session ID
            </button>

            <button className="tab-btn" data-bs-toggle="tab" onClick={() => setSessionTab('SUBSCRIPTION')}>
            Subscription ID
            </button>
        </div>

        <div className="tab-pane mb-3" id="subscriptionTab">
            {session === 'BILLING_SESSION' && 
                <input
                    name='billingSessionId'
                    id="billingSessionId"
                    className="form-control"
                    placeholder="Enter Billing Session ID"
                    value={billingSessionId}
                    onChange={(event) => {
                    setBillingSessionId(event?.target?.value?.trim());
                    }}
                />
            }
            {session === 'SUBSCRIPTION' && 
                <input
                    name='subscriptionId'
                    id="subscriptionId"
                    className="form-control"
                    placeholder="Enter Subscription ID"
                    value={subscriptionId}
                    onChange={(event) => {
                    setSubscriptionId(event?.target?.value?.trim());
                    }}
                />
            }
        </div>
    </>
  )
}

export default PaymentSessionTabs