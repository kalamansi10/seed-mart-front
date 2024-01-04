import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useListState from '../hooks/useListState'
import './cart-page.css'

export default function CartPage() {
  const cartItems = useListState()
  const headers = { 'X-CSRF-Token': document.cookie.split('=')[1] }

  useEffect(() => {
    fetch('api/v1/get-cart', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => cartItems.setList(data))
  }, [])

  function updateForCheckOut(e, carted_id) {
    fetch('/api/v1/update-cart?carted_id=' + carted_id + '&is_for_checkout=' + e.target.checked, {
      method: 'post',
      credentials: 'include',
      headers: headers
    })
  }

  function updateAmount(updatedAmount, carted_id) {
    if (updatedAmount < 1) return
    fetch('/api/v1/update-cart?carted_id=' + carted_id + '&amount=' + updatedAmount, {
      method: 'post',
      credentials: 'include',
      headers: headers
    })
  }

  function removeItem(carted_id) {
    cartItems.update(carted_id, 0, 'amount')
    document.querySelector(`.cart-item[id="${carted_id}"]`).classList.add('hidden')
    fetch('/api/v1/remove-from-cart/' + carted_id, {
      method: 'delete',
      credentials: 'include',
      headers: headers
    })
  }

  function handleAmountAdjustClick(carted_id, adjustment) {
    let result = adjustment + cartItems.get(carted_id).amount
    if (result > 0 && result < 1000) {
      updateAmount(result, carted_id)
      cartItems.update(carted_id, result, 'amount')
    } else if (result < 1) {
      removeItem(carted_id)
    }
  }

  function handleAmountInputChange(e, carted_id) {
    let value = Number(e.target.value)
    if (value >= 0 && value < 1000) cartItems.update(carted_id, value, 'amount')
  }

  function handleAmountInputBlur(carted_id) {
    let updatedAmount = cartItems.get(carted_id).amount
    if (updatedAmount < 1) cartItems.update(carted_id, 1, 'amount')
    updateAmount(updatedAmount, carted_id)
  }

  function amountInput(carted) {
    return (
      <div className='amount-input flex-row'>
        <button onClick={() => handleAmountAdjustClick(carted.id, -1)}>-</button>
        <input
          type='text'
          onChange={e => handleAmountInputChange(e, carted.id)}
          onBlur={() => handleAmountInputBlur(carted.id)}
          value={cartItems.get(carted.id).amount}
        />
        <button onClick={() => handleAmountAdjustClick(carted.id, 1)}>+</button>
      </div>
    )
  }

  function renderCartItems() {
    return cartItems.list.map((carted) => {
      return (
        <div className='cart-item' id={carted.id} key={carted.id}>
          <input type="checkbox" onClick={(e) => updateForCheckOut(e, carted.id)} defaultChecked={carted.is_for_checkout} />
          <img src={carted.item.image_links[0]} alt="" />
          <p>{carted.item.name}</p>
          <span>{carted.item.price.toLocaleString("en-US", { style: "currency", currency: "PHP" })}</span>
          {amountInput(carted)}
          <span>{(carted.amount * carted.item.price).toLocaleString("en-US", { style: "currency", currency: "PHP" })}</span>
          <button className='remove-item-button' onClick={() => removeItem(carted.id)}>Delete</button>
        </div>
      )
    })
  }

  if (cartItems.list) {
    return (
      <>
        <div className='full-height flex-column align-center'>
          <div className='cart-page'>
            <section className='cart-items-section box-shadow'>
              <div className='cart-items-labels'>
                <p>Products Ordered</p>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>
              {renderCartItems()}
            </section>
            <section className='cart-options-section box-shadow'>
            <Link to='/checkout' state={{ from: 'cartpage' }}><button className='check-out-button'>Checkout</button></Link>
            </section>
          </div>
        </div>
      </>
    )
  }
}
