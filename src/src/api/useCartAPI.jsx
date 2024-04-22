import useCookiesAndHeaders from "../hooks/useCookiesAndHeaders";

export default function useCartAPI(fetchCart) {
  const { getHeader } = useCookiesAndHeaders();

  async function getCart() {
    const response = await fetch("/api/cart");

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.message);
    }
  }

  async function getForCheckout() {
    const response = await fetch("/api/cart/for-checkout");

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.message);
    }
  }

  async function updateCartedAmount(updatedAmount, id) {
    const response = await fetch(
      `/api/cart/update-amount/${id}/${updatedAmount}`,
      getHeader("PUT")
    );

    if (response.ok) {
      await fetchCart();
    } else {
      throw new Error(response.message);
    }
  }

  async function updateCheckoutStatus(isForCheckOut, id) {
    const response = await fetch(
      `/api/cart/update-status/${id}/${isForCheckOut}`,
      getHeader("PUT")
    );

    if (response.ok) {
      await fetchCart();
    } else {
      throw new Error(response.message);
    }
  }

  async function removeFromCart(id) {
    const response = await fetch(`/api/cart/${id}`, getHeader("DELETE"));

    if (response.ok) {
      await fetchCart();
    } else {
      throw new Error(response.message);
    }
  }

  async function removeSelected(cartItems = {}) {
    const itemsToRemove = cartItems.list.filter(
      (cartedItem) => cartedItem.is_for_checkout
    );
    try {
      await Promise.all(
        itemsToRemove.map(async (cartedItem) => {
          const response = await fetch(
            `/api/cart/${cartedItem.id}`,
            getHeader("DELETE")
          );

          if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message || "Failed to delete item");
          }
        })
      );

      await fetchCart();
    } catch (error) {
      console.error(error);
    }
  }

  function renderCartTotal(cartItems = {}) {
    const total = cartItems.list.reduce((currentTotal, cartItem) => {
      return currentTotal + cartItem.amount * cartItem.item.price;
    }, 0);

    return toLocalCurrency(total);
  }

  function renderCartQuantity(cartItems = {}) {
    return cartItems.list.reduce((currentTotal, cartItem) => {
      return currentTotal + cartItem.amount;
    }, 0);
  }

  function toLocalCurrency(price) {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "PHP",
    });
  }

  return {
    getCart,
    getForCheckout,
    updateCheckoutStatus,
    updateCartedAmount,
    removeFromCart,
    removeSelected,
    toLocalCurrency,
    renderCartTotal,
    renderCartQuantity,
  };
}
