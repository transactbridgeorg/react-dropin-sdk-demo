import { PAY_METHOD, SESSION_TAB } from '../constants/const';
import { useDropinContext } from '../context/DropinContextProvider';
import './DropIn.css';

const DropIn = () => {
  const { isPaying, sessionId, isSdkReady, setSessionId, setSessionTab, mountActiveMethod, handlePayment } = useDropinContext();
  return (
    <div className="wrapper">
      <div>
        <span className="badge text-bg-warning mb-2">SANDBOX</span>

        <div className="d-flex justify-content-between mb-4">
          <h4 className="m-0 fw-semibold">Payment Demo</h4>
          <img src="https://www.transactbridge.com/images/TB-logo.svg" width="110" alt="TB Logo" />
        </div>

        <div className="nav d-flex gap-2 mb-3">
          <button className="tab-btn active" data-bs-toggle="tab" data-bs-target="#billingTab" onClick={() => setSessionTab(SESSION_TAB.BILLING_SESSION)}>
            Billing Session ID
          </button>

          <button className="tab-btn" data-bs-toggle="tab" data-bs-target="#subscriptionTab" onClick={() => setSessionTab(SESSION_TAB.SUBSCRIPTION)}>
            Subscription ID
          </button>
        </div>

        <div className="tab-content mb-3">
          <div className="tab-pane show active" id="billingTab">
            <input
              name='billingSessionId'
              id="billingSessionId"
              className="form-control"
              placeholder="Enter Billing Session ID"
              value={sessionId || ''}
              onChange={(event) => {
                setSessionId(event?.target?.value?.trim());
              }}
            />
          </div>

          <div className="tab-pane" id="subscriptionTab">
            <input
              name='subscriptionId'
              id="subscriptionId"
              className="form-control"
              placeholder="Enter Subscription ID"
              value={sessionId || ''}
              onChange={(event) => {
                setSessionId(event?.target?.value?.trim());
              }}
            />
          </div>
        </div>

        <p className="fw-semibold">Select Payment Method:</p>

        <div className="nav d-flex gap-2 mb-3">
          <button
            className="tab-btn active payTypeBtn"
            data-bs-toggle="tab"
            data-bs-target="#upiCollect"
            onClick={() => mountActiveMethod(PAY_METHOD.UPI)}
          >
            UPI
          </button>
          <button
            className="tab-btn payTypeBtn"
            data-bs-toggle="tab"
            data-bs-target="#cardContainer"
            onClick={() => mountActiveMethod(PAY_METHOD.CC)}
          >
            Credit Card
          </button>
          <button
            className="tab-btn payTypeBtn"
            data-bs-toggle="tab"
            data-bs-target="#cardContainer"
            onClick={() => mountActiveMethod(PAY_METHOD.DC)}
          >
            Debit Card
          </button>
        </div>

        <div className="tab-content mb-3">
          <div id="upiCollect" className="tab-pane show active inputWrapper mb-2"></div>

          <div id="cardContainer" className="tab-pane">
            <div className="mb-3" id="cardNumber">
            </div>
            <div className="mb-3" id="cardExp">
            </div>
            <div className="mb-3" id="cardCvv">
            </div>
            <div className="mb-3" id="cardHolder">
            </div>
          </div>
        </div>

        <div id="tnc"></div>

        <button id="payBtn" disabled={!isSdkReady || isPaying} className="pay-btn" onClick={handlePayment}>
          {isPaying ? 'Processing...' : 'Pay'}
        </button>
      </div>
    </div>
  );
};

export default DropIn;
