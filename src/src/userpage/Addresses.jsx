import { useEffect, useState } from "react";
import useAccountAPI from "../api/useAccountAPI";
import AddAddressDialog from "../dialogs/AddAddressDialog";
import useDialog from "../hooks/useDialog";
import "./addresses.css";

export default function Addresses({ currentUser }) {
  const [renderAddresses, setRenderAddresses] = useState();
  const [updatedAddress, setUpdatedAddress] = useState({});
  const { getShippingAddressList, removeShippingAddress } = useAccountAPI();
  const addAddressDialog = useDialog();

  useEffect(() => {
    fetchShippingAddressList();
  }, []);

  async function fetchShippingAddressList() {
    const shippingAddressList = await getShippingAddressList();
    if (shippingAddressList) {
      setRenderAddresses(mapShippingAddresses(shippingAddressList));
    }
  }

  function mapShippingAddresses(shippingAddresses) {
    if (shippingAddresses.length == 0) return <div>No shipping address.</ div>
    return shippingAddresses.map((shippingAddress) => (
      <div key={shippingAddress.id}>
        <div
          className="profile-address-wrapper flex-row justify-between align-center"
        >
          <div>
            <div className="flex-row">
              <div className="address-contact-name">
                {shippingAddress.contact_name}
              </div>
              <div className="address-contact-number">
                {shippingAddress.contact_number}
              </div>
            </div>
            <div className="shipping-address">
              {shippingAddress.street_address}
            </div>
            <div className="shipping-address">{`${shippingAddress.barangay}, ${shippingAddress.city}, ${shippingAddress.province}, ${shippingAddress.region}`}</div>
            {shippingAddress.is_main && <div className="shipping-address">Default</div>}
          </div>
          <div>
            <div className="address-options flex-row justify-center">
              <button
                className="address-edit"
                onClick={() => {
                  setUpdatedAddress(shippingAddress);
                  addAddressDialog.show();
                }}
              >
                Edit
              </button>
              <button
                className="address-delete"
                onClick={async () => {
                  removeShippingAddress(shippingAddress.id);
                  await fetchShippingAddressList();
                }}
              >
                Delete
              </button>
            </div>
            <button className={`default-address ${shippingAddress.is_main && ("is-default")}`}>Set as default</button>
          </div>
        </div>
        <br />
      </div>
    ));
  }

  return (
    <div className="addresses-section">
      <div className="addresses-header flex-row justify-between align-center">
        <h2>ADDRESSES</h2>
        <button
          className="add-address-button"
          onClick={() => {
            setUpdatedAddress({});
            addAddressDialog.show();
          }}
        >
          Add new address
        </button>
      </div>
      {renderAddresses}
      <AddAddressDialog
        addAddressDialog={addAddressDialog}
        updatedAddress={updatedAddress}
        fetchShippingAddressList={fetchShippingAddressList}
      />
    </div>
  );
}
