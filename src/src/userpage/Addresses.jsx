import { useEffect, useState } from 'react';
import AddressDialog from './AddressDialog';
import useDialog from '../hooks/useDialog';

export default function Addresses({ currentUser }) {
  const [renderAddresses, setRenderAddresses] = useState();
  const addressDialog = useDialog();

  useEffect(() => {
    fetchShippingAddresses();
  }, []);

  async function fetchShippingAddresses() {
    try {
      const response = await fetch('/api/v1/get-shipping-addresses', {
        credentials: 'include',
      })
      const shippingAddresses = await response.json();
      const mappedAddresses = mapShippingAddresses(shippingAddresses);
      setRenderAddresses(mappedAddresses);
    } catch (error) {
      console.error('Error fetching shipping addresses:', error);
    }
  }

  function handleClickDeleteAddress(shippingAddress) {
    fetch('/api/v1/remove-shipping-address/' + shippingAddress.id, {
      method: 'delete',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.cookie.split('=')[1]
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
    ));
  }

  return (
    <div>
      {renderAddresses}
      <button onClick={addressDialog.showDialog}>New Address</button>
      <AddressDialog addressDialog={addressDialog} fetchShippingAddresses={fetchShippingAddresses}/>
    </div>
  );
}
