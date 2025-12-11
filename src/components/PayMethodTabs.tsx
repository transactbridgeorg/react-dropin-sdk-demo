'use client';

// ````````````````CONTEXT IMPORT````````````````
import { useCommonContext } from "../context/CommonContextProvider";

const PAY_TABS = {
  UPI: 'UPI',
  CC: 'CC',
  DC: 'DC',
}

const PayMethodTabs = () => {
  const {selectedMethod, setSelectedMethod} = useCommonContext();

  const handlePayMethod = (payMethod: string) => {
    setSelectedMethod(payMethod);
  }

  return (
    <>
    <div className="nav d-flex gap-2 mb-3">
        <button
        className={`tab-btn ${selectedMethod === PAY_TABS.UPI ? 'active' : ''}`}
        data-bs-toggle="tab"
        data-bs-target="#upiCollect"
        onClick={() => handlePayMethod(PAY_TABS.UPI)}
        >
        UPI
        </button>
        <button
        className={`tab-btn ${selectedMethod === PAY_TABS.CC ? 'active' : ''}`}
        data-bs-toggle="tab"
        data-bs-target="#cardContainer"
        onClick={() => handlePayMethod(PAY_TABS.CC)}
        >
        Credit Card
        </button>
        <button
        className={`tab-btn ${selectedMethod === PAY_TABS.DC ? 'active' : ''}`}
        data-bs-toggle="tab"
        data-bs-target="#cardContainer"
        onClick={() => handlePayMethod(PAY_TABS.DC)}
        >
        Debit Card
        </button>
    </div>
    </>
  )
}

export default PayMethodTabs