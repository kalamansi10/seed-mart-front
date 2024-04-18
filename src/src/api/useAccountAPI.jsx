import useCookiesAndHeaders from "../hooks/useCookiesAndHeaders";

export default function useAccountAPI() {
  const { getHeader } = useCookiesAndHeaders();

  async function getShippingAddressList() {
    const response = await fetch("/api/account/shipping-address/list");
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.message);
    }
  }

  async function addShippingAddressList(addressBody) {
    const response = await fetch(
      "/api/account/shipping-address",
      getHeader("POST", { shipping_address: addressBody })
    );
    if (response.ok) {
      return;
    } else {
      throw new Error(response.message);
    }
  }

  async function updateShippingAddressList(addressBody) {
    const response = await fetch(
      "/api/account/shipping-address",
      getHeader("PUT", { shipping_address: addressBody })
    );
    if (response.ok) {
      return;
    } else {
      throw new Error(response.message);
    }
  }

  async function removeShippingAddress(shippingAddressId) {
    const response = await fetch(
      `/api/account/shipping-address/${shippingAddressId}`,
      getHeader("DELETE")
    );
    if (response.ok) {
      return;
    } else {
      throw new Error(response.message);
    }
  }

  return {
    getShippingAddressList,
    addShippingAddressList,
    updateShippingAddressList,
    removeShippingAddress,
  };
}
