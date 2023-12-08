import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './cart-page.css'

export default function CartPage({ currentUser, checkOutList }) {
  const [cartRender, setCartRender] = useState()
  const headers = { 'X-CSRF-Token': document.cookie.split('=')[1] }

  useEffect(() => {
    fetch('api/v1/get-cart', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(cartedItems => mapCart(cartedItems))
      .then(mappedCart => setCartRender(mappedCart))
  }, [])


  function updateForCheckOut(e, carted_id) {
    fetch('/api/v1/update-cart?carted_id=' + carted_id + '&is_for_checkout=' + e.target.checked, {
      method: 'post',
      credentials: 'include',
      headers: headers
    })
  }

  function updateAmount(e, carted_id) {
    if (e.target.value < 1) return
    fetch('/api/v1/update-cart?carted_id=' + carted_id + '&amount=' + e.target.value, {
      method: 'post',
      credentials: 'include',
      headers: headers
    })
  }

  function removeItem(carted_id) {
    fetch('/api/v1/remove-from-cart/' + carted_id, {
      method: 'delete',
      credentials: 'include',
      headers: headers
    })
  }

  function updateTotal(e, carted_id, price) {
    // update to just greyed out later
    if (e.target.value < 1) {
      document.querySelector(`.cart-item[id="${carted_id}"]`).classList.add('hidden')
      removeItem(carted_id)
    }
    document.getElementById(`total-${carted_id}`).textContent = 'PHP ' + e.target.value * price
  }

  function mapCart(cartedItems) {
    return cartedItems.map(carted => {
      return (
        <div className='cart-item flex-row justify-around align-center' id={carted.id} key={carted.id}>
          <input type="checkbox" onClick={(e) => updateForCheckOut(e, carted.id)} defaultChecked={carted.is_for_checkout} />
          <img src={carted.item.image_links[0]} alt="" />
          <p>{carted.item.name}</p>
          <p>{carted.item.price.toLocaleString("en-US", { style: "currency", currency: "PHP" })}</p>
          <input
            type="number"
            onChange={e => updateTotal(e, carted.id, carted.item.price)}
            onBlur={e => updateAmount(e, carted.id)}
            defaultValue={carted.amount}
          />
          <p id={'total-' + carted.id}>{(carted.amount * carted.item.price).toLocaleString("en-US", { style: "currency", currency: "PHP" })}</p>
          <button>Delete</button>
        </div>
      )
    })
  }


  return (
    <>
      <div>{cartRender}</div>
      <Link to='/checkout' state={{ from: 'cartpage' }}><button>Checkout</button></Link>
    </>
  )
}
