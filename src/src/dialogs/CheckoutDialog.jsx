import { useNavigate, useLocation } from "react-router-dom";
import "./check-out-dialog.css";

export default function CheckoutDialog({ checkoutDialog, referenceNumber }) {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  function handleButtonClick() {
    window.scrollTo({ top: 100, left: 100, behavior: "smooth" });
    navigate("/");
  }

  function renderStatus() {
    if (referenceNumber) {
      return (
        <>
          <div className="success-checkmark">
            <div className="check-icon">
              <span className="icon-line line-tip"></span>
              <span className="icon-line line-long"></span>
              <div className="icon-circle"></div>
              <div className="icon-fix"></div>
            </div>
          </div>
          <p className="order-status-label">Your order is being shipped.</p>
          <p className="reference-number">Ref: {referenceNumber}</p>
          <button onClick={handleButtonClick}>Order Summary</button>
        </>
      );
    } else {
      return (
        <>
          <div className="loading-indicator"></div>
          <p className="order-status-label">Processing order...</p>
        </>
      );
    }
  }

  return (
    <dialog className="check-out-dialog box-shadow" ref={checkoutDialog.ref}>
      <div className="flex-column align-center">{renderStatus()}</div>
    </dialog>
  );
}
