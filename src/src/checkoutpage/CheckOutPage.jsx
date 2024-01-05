import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import CheckoutDialog from '../dialogs/CheckoutDialog'
import useDialog from '../hooks/useDialog'
import CheckOutAddress from './CheckOutAddress'
import CheckOutPayment from './CheckOutPayment'
import useCartAPI from '../api/useCartAPI'
import './check-out-page.css'

export default function CheckOutPage({ currentUser }) {
  const [selectedAddress, setSelectedAddress] = useState()
  const checkoutDialog = useDialog()
  const locationState = useLocation()
  const { from, item, amount } = locationState.state
  const {
    initialize,
    cartItems,
    toLocalCurrency,
    renderCartTotal,
  } = useCartAPI()

  useEffect(() => {
    if (from == 'itempage') {
      cartItems.setList([{ id: 1, item_id: item.id, amount: amount, item: item }])
    } else if (from == 'cartpage') {
      initialize('checkoutpage')
    }
  }, [])

  function rendercheckoutItems() {
    return cartItems.list.map(checkoutItem => {
      return (
        <div className='check-out-item' id={checkoutItem.id} key={checkoutItem.id}>
          <img src={checkoutItem.item.image_links[0]} alt="" />
          <p>{checkoutItem.item.name}</p>
          <p>{toLocalCurrency(checkoutItem.item.price)}</p>
          <p>{checkoutItem.amount}</p>
          <p>{toLocalCurrency(checkoutItem.amount * checkoutItem.item.price)}</p>
        </div>
      )
    })
  }

  if (cartItems.list) {
    return (
      <>
        <div className='flex-column align-center'>
          <div className='check-out-page '>
            <CheckOutAddress selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
            <section className='check-out-items-section box-shadow'>
              <div className='check-out-items-labels'>
                <p>Products Ordered</p>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>
              {rendercheckoutItems()}
            </section>
            <div className='box-shadow'>
              <CheckOutPayment />
              <section className='check-out-breakdown section flex-column align-end'>
                <div className='breakdown-container'>
                  <div className='breakdown-wrapper flex-row justify-between align-center'>
                    <p>Merchandise Subtotal:</p>
                    <span>{renderCartTotal()}</span>
                  </div>
                  <div className='breakdown-wrapper flex-row justify-between align-center'>
                    <p>Shipping Fee:</p>
                    <span>{toLocalCurrency(0)}</span>
                  </div>
                  <div className='breakdown-wrapper flex-row justify-between align-center'>
                    <p>Total Payment:</p>
                    <span className='total-payment'>{renderCartTotal()}</span>
                  </div>
                </div>
                <button className='check-out-button' onClick={checkoutDialog.show}>Place order</button>
              </section>
              <section className='check-out section flex-column align-end'>
              </section>
            </div>
          </div>
        </div>
      </>
    )
  }
}
