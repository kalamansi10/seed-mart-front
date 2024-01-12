import React from 'react'

export default function useOrderAPI() {

  function processOrder(orderList) {
    fetch('api/v1/order', {
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
  }

  return { processOrder }
}
