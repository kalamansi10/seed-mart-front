import React from 'react'

export default function CheckOutPayment() {
  const paymentMethods = ['Credit / Debit Card', 'Cash on Delivery']

  function renderPaymentMethods() {
    return paymentMethods.map(paymentMethod => {
      return <button>{paymentMethod}</button>
    })
  }

  return (
    <div>
      <div>
        {renderPaymentMethods()}
      </div>
    </div>

  )
}
