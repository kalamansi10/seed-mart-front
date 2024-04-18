import { useEffect, useState } from "react";
import useAccountAPI from "../api/useAccountAPI";
import AddAddressDialog from "../dialogs/AddAddressDialog";
import useDialog from "../hooks/useDialog";

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
    return shippingAddresses.map((shippingAddress) => (
      <div key={shippingAddress.id}>
        {`${shippingAddress.street_address}, ${shippingAddress.barangay}, ${shippingAddress.city}, ${shippingAddress.province}, ${shippingAddress.region}, ${shippingAddress.is_main}`}
        <button
          onClick={() => {
            setUpdatedAddress(shippingAddress);
            addAddressDialog.show();
          }}
        >
          Edit
        </button>
        <button
          onClick={async () => {
            removeShippingAddress(shippingAddress.id);
            await fetchShippingAddressList();
          }}
        >
          Delete
        </button>
      </div>
    ));
  }

  return (
    <div>
      {renderAddresses}
      <button
        onClick={() => {
          setUpdatedAddress({});
          addAddressDialog.show();
        }}
      >
        New Address
      </button>
      <AddAddressDialog
        addAddressDialog={addAddressDialog}
        updatedAddress={updatedAddress}
        fetchShippingAddressList={fetchShippingAddressList}
      />
    </div>
  );
}
