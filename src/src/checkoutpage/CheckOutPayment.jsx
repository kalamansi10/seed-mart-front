import { useState } from "react";

export default function CheckOutPayment() {
  const [selectedPayment, setSelectedPayment] = useState("Cash on Delivery");
  const paymentMethods = ["Credit / Debit Card", "Cash on Delivery"];

  // useEffect(() => {
  //   fetch('/v1/api/get-payment-methods')
  //     .then(response => response.json())
  //     .then(paymentMethods => mapPaymentMethods(paymentMethods))
  //     .then(mappedPaymentMethods => setPaymentMethods(mappedPaymentMethods))
  // }, [])

  function renderPaymentMethods() {
    return paymentMethods.map((paymentMethod) => {
      return (
        <button
          key={paymentMethod}
          className={
            selectedPayment == paymentMethod
              ? "payment-type-button selected-payment"
              : "payment-type-button"
          }
          onClick={() => setSelectedPayment(paymentMethod)}
        >
          {paymentMethod}
        </button>
      );
    });
  }

  function renderCashOnDelivery() {
    return <p>Cash on Delivery</p>;
  }

  function renderCardPayment() {
    return (
      <>
        <p>Credit / Debit Card</p>
      </>
    );
  }

  function renderSelectedPaymentOptions() {
    switch (selectedPayment) {
      case "Cash on Delivery":
        return renderCashOnDelivery();
      case "Credit / Debit Card":
        return renderCardPayment();
    }
  }

  return (
    <div>
      <div className="check-out-payment flex-row">
        <div>
          <p>Payment method</p>
        </div>
        <div className="check-out-buttons flex-row">
          {renderPaymentMethods()}
        </div>
      </div>
      <div className="selected-payment-options">
        {renderSelectedPaymentOptions()}
      </div>
    </div>
  );
}
