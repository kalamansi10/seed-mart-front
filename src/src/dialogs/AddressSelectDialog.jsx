import React from "react";
import "./address-select-dialog.css";

export default function AddressSelectDialog({
  addressSelectDialog,
  shippingAddresses,
  selectedAddress,
  setSelectedAddress,
}) {
  function formatAdrress(shippingAddress) {
    return `
      ${shippingAddress.street_address}, 
      ${shippingAddress.barangay}, 
      ${shippingAddress.city}, 
      ${shippingAddress.province}, 
      ${shippingAddress.region}`;
  }

  function mapShippingAddresses() {
    return shippingAddresses.map((shippingAddress) => (
      <div
        key={shippingAddress.id}
        htmlFor={shippingAddress.id}
        onClick={() => {
          addressSelectDialog.close();
          setSelectedAddress(shippingAddress);
        }}
      >
        <div
          className={`shipping-address-container box-shadow ${
            selectedAddress == shippingAddress ? "checked" : ""
          }`}
        >
          <span className="checkmark">✓</span>
          <div>
            <span className="contact-name">{shippingAddress.contact_name}</span>
            <span> | </span>
            <i className="contact-number">{shippingAddress.contact_number}</i>
          </div>
          <p>{formatAdrress(shippingAddress)}</p>
        </div>
      </div>
    ));
  }

  return (
    <>
      <dialog ref={addressSelectDialog.ref}>
        <div className="address-select flex-column align-center box-shadow">
          <p>Select shipping address </p>
          <div className="address-list-container flex-column">
            {shippingAddresses && mapShippingAddresses()}
          </div>
        </div>
      </dialog>
    </>
  );
}
