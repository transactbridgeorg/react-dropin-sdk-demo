'use client';

// ````````````````CONTEXT IMPORT````````````````
import { useCommonContext } from "../context/CommonContextProvider";

const PayMethodTabs = () => {
  const {selectedMethod, setSelectedMethod} = useCommonContext();

  const handlePayMethod = (payMethod: string) => {
    setSelectedMethod(payMethod);
  }

  return (
    <>
    <div className="nav d-flex gap-2 mb-3">
        <button
        className={`tab-btn ${selectedMethod === 'UPI' ? 'active' : ''}`}
        data-bs-toggle="tab"
        data-bs-target="#upiCollect"
        onClick={() => handlePayMethod('UPI')}
        >
        UPI
        </button>
        <button
        className={`tab-btn ${selectedMethod === 'CC' ? 'active' : ''}`}
        data-bs-toggle="tab"
        data-bs-target="#cardContainer"
        onClick={() => handlePayMethod('CC')}
        >
        Credit Card
        </button>
        <button
        className={`tab-btn ${selectedMethod === 'DC' ? 'active' : ''}`}
        data-bs-toggle="tab"
        data-bs-target="#cardContainer"
        onClick={() => handlePayMethod('DC')}
        >
        Debit Card
        </button>
    </div>
    </>
  )
}

export default PayMethodTabs