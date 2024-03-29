import { useEffect, useState } from 'react'
import AddAddressDialog from '../dialogs/AddAddressDialog'
import useDialog from '../hooks/useDialog'
import useGetCookie from '../hooks/useGetCookie'

export default function Addresses({ currentUser }) {
  const [renderAddresses, setRenderAddresses] = useState()
  const addAddressDialog = useDialog()

  useEffect(() => {
    fetchShippingAddresses()
  }, [])

  async function fetchShippingAddresses() {
    try {
      const response = await fetch('/api/v1/get-shipping-addresses', {
        credentials: 'include',
      })
      const shippingAddresses = await response.json()
      const mappedAddresses = mapShippingAddresses(shippingAddresses)
      setRenderAddresses(mappedAddresses)
    } catch (error) {
      console.error('Error fetching shipping addresses:', error)
    }
  }

  function handleClickDeleteAddress(shippingAddress) {
    fetch('/api/v1/remove-shipping-address/' + shippingAddress.id, {
      method: 'delete',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': useGetCookie('CSRF-TOKEN')
      }
    })
    .then(fetchShippingAddresses)
  }

  function mapShippingAddresses(shippingAddresses) {
    return shippingAddresses.map(shippingAddress => (
      <div key={shippingAddress.id}>
        {`${shippingAddress.street_address}, ${shippingAddress.barangay}, ${shippingAddress.city}, ${shippingAddress.province}, ${shippingAddress.region}, ${shippingAddress.is_main}`}
        <button onClick={() => handleClickDeleteAddress(shippingAddress)}>Delete</button>
      </div>
    ))
  }

  return (
    <div>
      {renderAddresses}
      <button onClick={addAddressDialog.show}>New Address</button>
      <AddAddressDialog addAddressDialog={addAddressDialog} fetchShippingAddresses={fetchShippingAddresses}/>
    </div>
  )
}
