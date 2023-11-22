import { useState, useEffect } from 'react'
import './cart-page.css'

export default function CartPage({ currentUser }) {
  const [cart, setCart] = useState()

  useEffect(() => {
    getCart()
  }, [])

  function getCart() {
    fetch('api/v1/get-cart', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(cartItems => mapCart(cartItems))
      .then(mappedCart => setCart(mappedCart))
  }

  function updateTotal(e, carted_id, price) {
    // update to just greyed out later
    if (e.target.value < 1) {
      document.querySelector(`.cart-item[id="${carted_id}"]`).classList.add('hidden')
      removeItem(carted_id)
    }
    document.getElementById(`total-${carted_id}`).textContent = 'PHP ' + e.target.value * price
  }

  function updateAmount(e, carted_id) {
    if (e.target.value < 1) return
    let API = '/api/v1/update-cart?' + 'carted_id=' + carted_id + '&amount=' + e.target.value
    fetch(API, {
      method: 'post',
      credentials: 'include',
      headers: {
        'X-CSRF-Token': document.cookie.split('=')[1]
      }
    })
  }

  function removeItem(carted_id) {
    fetch('/api/v1/remove-from-cart/' + carted_id, {
      method: 'delete',
      credentials: 'include',
      headers: {
        'X-CSRF-Token': document.cookie.split('=')[1]
      }
    })
  }


  function mapCart(cartItems) {
    return cartItems.map(cartItem => {
      return (
        <div className='cart-item flex-row justify-around align-center' id={cartItem.id} key={cartItem.id}>
          <img src={cartItem.seed.image_links[0]} alt="" />
          <p>{cartItem.seed.name}</p>
          <p>{'PHP ' + cartItem.seed.price}</p>
          <input 
            type="number" 
            min='0' 
            max='9999'
            onChange={e => updateTotal(e, cartItem.id, cartItem.seed.price)} 
            onBlur={e => updateAmount(e, cartItem.id)}
            defaultValue={cartItem.amount}
          />
          <p id={'total-' + cartItem.id}>{'PHP ' + cartItem.amount * cartItem.seed.price}</p>
          <button>Delete</button>
        </div>
      )
    })
  }


  return (
    <div>{cart}</div>
  )
}
