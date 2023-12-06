import { useState, useEffect } from 'react'
export default function CheckOutPage({currentUser}) {

  function getCart() {
    fetch('api/v1/get-cart', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => data.filter(item => item.is_for_checkout == false))
  }
  return (
    <>
    </>
  )
}
