import { useState } from 'react'

export default function useOrderAPI() {
  const [referenceNumber, setReferenceNumber] = useState()

  async function process(orderList) {
    return fetch('api/v1/order', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.cookie.split('=')[1]
      },
      body: JSON.stringify({
        order_list: orderList
      })
    })
    .then(response => response.json())
  }  

  return { process, referenceNumber, setReferenceNumber}
}
