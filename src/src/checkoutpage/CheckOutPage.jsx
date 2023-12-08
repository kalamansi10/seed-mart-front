import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
export default function CheckOutPage({ currentUser}) {
  const [renderCheckOutItems, setRenderCheckOutItems] = useState()
  const forCheckout = useLocation()
  const {from, item, amount} = forCheckout.state

  useEffect(() => {
    if (from == 'itempage') {
      setRenderCheckOutItems(mapCheckOutItems([{ id: 1, item_id: item.id, amount: amount, item: item}]))
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
      .then(filteredData => mapCheckOutItems(filteredData))
      .then(mappedData => setRenderCheckOutItems(mappedData))
  }

  function mapCheckOutItems(checkOutItems) {
    return checkOutItems.map(checkOutItem => {
      return (
        <div className='cart-item flex-row justify-around align-center' id={checkOutItem.id} key={checkOutItem.id}>
          <img src={checkOutItem.item.image_links[0]} alt="" />
          <p>{checkOutItem.item.name}</p>
          <p>{checkOutItem.item.price.toLocaleString("en-US", {style:"currency", currency:"PHP"})}</p>
          <p>{checkOutItem.amount}</p>
          <p>{(checkOutItem.amount * checkOutItem.item.price).toLocaleString("en-US", {style:"currency", currency:"PHP"})}</p>
        </div>
      )
    })
  }

  return (
    <>
      <div>
        Shipping Address:
        <button>Change address</button>
      </div>
      {renderCheckOutItems}
      <button>Place order</button>
    </>
  )
}
