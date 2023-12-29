import React from 'react'
import './address-select-dialog.css'

export default function AddressSelectDialog({ addressSelectDialog, shippingAddresses }) {

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

  function mapShippingAddresses() {
    return shippingAddresses.map(shippingAddress =>
      <label key={shippingAddress.id} htmlFor={shippingAddress.id}>
        <div className='shipping-address-container box-shadow'>
          <span className='checkmark'>✓</span>
          <div>
            <span>Name Name</span>
            <span>Contact Info</span>
          </div>
          <p>{formatAdrress(shippingAddress)}</p>
        </div>
      </label>
    )
  }

  return (
    <>
      <dialog ref={addressSelectDialog.ref}>
        <div className='address-select flex-column align-center box-shadow'>
          <h1>Select Address</h1>
          <div className='address-list-container flex-column'>
            {shippingAddresses && mapShippingAddresses()}
          </div>
          <button className='save-address-button'>Save</button>
        </div>
      </dialog>
    </>
  )
}
