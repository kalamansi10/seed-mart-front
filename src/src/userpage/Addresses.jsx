import { useEffect, useState } from 'react'

export default function Addresses({ currentUser }) {
  const [renderAddresses, setRenderAddresses] = useState()

  useEffect(() => {
    fetch('api/v1/get-get-shipping-addresses', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(shippingAddresses => mapCart(shippingAddresses))
      .then(mappedCart => setCartRender(mappedCart))

  }, [])

  function mapShippingAddresses(shippingAddresses) {
    return shippingAddresses.map(address => {
    })
  }

  return (
    <div>
      <a onclick={'a'}>New address</a>
    </div>
  )
}
