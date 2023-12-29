import { useState, useEffect, useRef } from 'react'
import useDialog from '../hooks/useDialog'
import AddressSelectDialog from '../dialogs/AddressSelectDialog'

export default function CheckOutAddress({ selectedAddress, setSelectedAddress }) {
  const [shippingAddresses, setShippingAddresses] = useState()
  const [addressesRender, setAddressesRender] = useState()
  const addressList = useRef()
  const addressSelectDialog = useDialog()

  useEffect(() => {
    fetch('/api/v1/get-shipping-addresses')
      .then(response => response.json())
      .then(shippingAddresses => {
        setShippingAddresses(shippingAddresses)
        setSelectedAddress(shippingAddresses.find(address => address.is_main == true))
        setAddressesRender(mapShippingAddresses(shippingAddresses))
      })
  }, [])

  function formatAdrress(shippingAddress) {
    return (
      `
      ${shippingAddress.street_address}, 
      ${shippingAddress.barangay}, 
      ${shippingAddress.city}, 
      ${shippingAddress.province}, 
      ${shippingAddress.region}`
    )
  }

  function mapShippingAddresses(shippingAddresses) {
    return shippingAddresses.map(shippingAddress =>
      <div className='address-wrapper flex-row align-center' key={shippingAddress.id}>
        <input
          type='radio'
          name='shipping-address'
          id={shippingAddress.id}
          defaultChecked={shippingAddress.is_main}
          value={shippingAddress.id}
        />
        <label htmlFor={shippingAddress.id}>&nbsp;&nbsp;{formatAdrress(shippingAddress)}</label>
      </div>
    )
  }

  function handleSaveAddressClick(e) {
    const selectedAddress = document.querySelector("input[type='radio'][name=shipping-address]:checked").value
  }

  return (
    <div className='check-out-address box-shadow'>
      <div className='selected-address-container flex-row justify-between align-center'>
        <h3>Shipping Address</h3>
        <div className='flex-row'>
          <p>{selectedAddress && formatAdrress(selectedAddress)}</p>
          <button className='address-select-button' onClick={addressSelectDialog.show}>Change</button>
        </div>
      </div>
      <div className='address-selection-container hidden' ref={addressList}>
        <div className='address-list'>
          {addressesRender}
        </div>
        <button className='save-address-button' onClick={handleSaveAddressClick}>Save</button>
      </div>
      <AddressSelectDialog addressSelectDialog={addressSelectDialog} shippingAddresses={shippingAddresses}/>
    </div>
  )
}
