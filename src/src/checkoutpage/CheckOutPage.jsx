import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import CheckoutDialog from '../dialogs/CheckoutDialog'
import useDialog from '../hooks/useDialog'
import CheckOutAddress from './CheckOutAddress'
import CheckOutPayment from './CheckOutPayment'
import './check-out-page.css'

export default function CheckOutPage({ currentUser }) {
  const [selectedAddress, setSelectedAddress] = useState()
  const [checkOutItems, setCheckOutItems] = useState()
  const checkoutDialog = useDialog()
  const locationState = useLocation()
  const { from, item, amount } = locationState.state

  useEffect(() => {
    if (from == 'itempage') {
      setCheckOutItems([{ id: 1, item_id: item.id, amount: amount, item: item }])
    } else if (from == 'cartpage') {
      getCart()
    }
  }, [])

  function getCart() {
    fetch('api/v1/get-cart', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => data.filter(item => item.is_for_checkout == true))
      .then(filteredData => setCheckOutItems(filteredData))
  }

  function toLocalCurrency(price) {
    return price.toLocaleString("en-US", { style: "currency", currency: "PHP" })
  }

  function renderCheckOutItems(checkOutItems) {
    return checkOutItems.map(checkOutItem => {
      return (
        <div className='cart-item' id={checkOutItem.id} key={checkOutItem.id}>
          <img src={checkOutItem.item.image_links[0]} alt="" />
          <p>{checkOutItem.item.name}</p>
          <p>{toLocalCurrency(checkOutItem.item.price)}</p>
          <p>{checkOutItem.amount}</p>
          <span>{toLocalCurrency(checkOutItem.amount * checkOutItem.item.price)}</span>
        </div>
      )
    })
  }

  function totalBreakdown() {
    const total = checkOutItems.reduce((currentTotal, checkOutItem) => {
      return currentTotal + (checkOutItem.amount * checkOutItem.item.price)
    }, 0)

    return toLocalCurrency(total)
  }

  if (checkOutItems) {
    return (
      <>
        <div className='flex-column align-center'>
          <div className='check-out-page '>
            <CheckOutAddress selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
            <section className='cart-items-section box-shadow'>
              <div className='cart-items-labels'>
                <p>Products Ordered</p>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>
              {renderCheckOutItems(checkOutItems)}
            </section>
            <div className='box-shadow'>
              <CheckOutPayment />
              <section className='cart-breakdown section flex-column align-end'>
                <div className='breakdown-container' flex-column>
                  <div className='breakdown-wrapper flex-row justify-between align-center'>
                    <p>Merchandise Subtotal:</p>
                    <span>{totalBreakdown()}</span>
                  </div>
                  <div className='breakdown-wrapper flex-row justify-between align-center'>
                    <p>Shipping Fee:</p>
                    <span>{toLocalCurrency(0)}</span>
                  </div>
                  <div className='breakdown-wrapper flex-row justify-between align-center'>
                    <p>Total Payment:</p>
                    <span className='total-payment'>{totalBreakdown()}</span>
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
