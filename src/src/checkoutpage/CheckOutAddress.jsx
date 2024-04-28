import { useState, useEffect } from "react";
import useAccountAPI from "../api/useAccountAPI";
import useDialog from "../hooks/useDialog";
import AddressSelectDialog from "../dialogs/AddressSelectDialog";
import AddAddressDialog from "../dialogs/AddAddressDialog";

export default function CheckOutAddress({
  selectedAddress,
  setSelectedAddress,
}) {
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const addressSelectDialog = useDialog();
  const addAddressDialog = useDialog();
  const { getShippingAddressList } = useAccountAPI();

  useEffect(() => {
    fetchShippingAddressList();
  }, []);

  async function fetchShippingAddressList() {
    const shippingAddressList = await getShippingAddressList();

    if (shippingAddressList) {
      setShippingAddresses(shippingAddressList);
      if (!selectedAddress) {
        setSelectedAddress(
          shippingAddressList.find((address) => address.is_main === true)
        );
      }
    }
  }

  function formatAdrress(shippingAddress) {
    return `
      ${shippingAddress.street_address}, 
      ${shippingAddress.barangay}, 
      ${shippingAddress.city}, 
      ${shippingAddress.province}, 
      ${shippingAddress.region}`;
  }

  return (
    <div className="check-out-address box-shadow">
      <div className="selected-address-container flex-row justify-between align-center">
        <h3>Shipping Address</h3>
        <div className="flex-row align-center">
          {selectedAddress && <p>{formatAdrress(selectedAddress)}</p>}
          {!selectedAddress && shippingAddresses.length != 0 && (
            <i>Please select a shipping address.</i>
          )}
          {shippingAddresses.length != 0 && (
            <button
              className="address-select-button"
              onClick={addressSelectDialog.show}
            >
              Change
            </button>
          )}
          <button
            className="address-select-button"
            onClick={addAddressDialog.show}
          >
            Add new address
          </button>
        </div>
      </div>
      <AddressSelectDialog
        addressSelectDialog={addressSelectDialog}
        shippingAddresses={shippingAddresses}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />
      <AddAddressDialog
        addAddressDialog={addAddressDialog}
        updatedAddress={{}}
        fetchShippingAddressList={fetchShippingAddressList}
      />
    </div>
  );
}
