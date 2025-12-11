'use client';
import { useState } from "react";

// ````````````````CONTEXT IMPORT````````````````
import { useCommonContext } from "../context/CommonContextProvider";

const SESSIONS = {
    BILLING_SESSION: 'BILLING_SESSION',
    SUBSCRIPTION: 'SUBSCRIPTION',
}

const PaymentSessionTabs = () => {
    const [session, setSession] = useState(SESSIONS.BILLING_SESSION);
  const {billingSessionId, setBillingSessionId, subscriptionId, setSubscriptionId} = useCommonContext();

    const setSessionTab = (_session: string) => {
        setSession(_session);
    setBillingSessionId('');
    setSubscriptionId('');
  }

  return (
    <>
        <div className="nav d-flex gap-2 mb-3">
            <button 
            className={`tab-btn ${session === SESSIONS.BILLING_SESSION ? 'active' : ''}`}
            onClick={() => setSessionTab(SESSIONS.BILLING_SESSION)}>
            Billing Session ID
            </button>

            <button
            className={`tab-btn ${session === SESSIONS.SUBSCRIPTION ? 'active' : ''}`}
            onClick={() => setSessionTab(SESSIONS.SUBSCRIPTION)}>
            Subscription ID
            </button>
        </div>

        <div className="tab-pane mb-3" id="subscriptionTab">
            {session === SESSIONS.BILLING_SESSION && 
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
            {session === SESSIONS.SUBSCRIPTION && 
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