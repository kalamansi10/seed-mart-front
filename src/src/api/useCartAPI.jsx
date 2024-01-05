import useListState from '../hooks/useListState'

export default function useCartAPI() {
  const cartItems = useListState()
  const updateHeader = {
    method: 'put',
    credentials: 'include',
    headers: {
      'X-CSRF-Token': document.cookie.split('=')[1]
    }
  }

  function initialize() {
    fetch('api/v1/get-cart', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => cartItems.setList(data))
  }

  function updateCheckoutStatus(isForCheckOut, id) {
    fetch(`/api/v1/update-checkout-status/${id}/${isForCheckOut}`, updateHeader)
    cartItems.update(id, isForCheckOut, 'is_for_checkout')
  }

  function updateCartedAmount(updatedAmount, id) {
    fetch(`/api/v1/update-carted-amount/${id}/${updatedAmount}`, updateHeader)
    cartItems.update(id, updatedAmount, 'amount')
  }

  function toggleSelectAllForCheckout(isChecked) {
    cartItems.list.forEach(item => {
      if (item.is_for_checkout == !isChecked) updateCheckoutStatus(isChecked ? true : false, item.id)
    })
  }

  function removeCartedItem(id) {
    fetch(`/api/v1/remove-from-cart/${id}`, {
      method: 'delete',
      credentials: 'include',
      headers: {
        'X-CSRF-Token': document.cookie.split('=')[1]
      }
    })
    cartItems.remove(id)
  }

  function removeForCheckout() {
    let idList = cartItems.list.map(item => {
      if (item.is_for_checkout == true) return item.id
    })
    idList.forEach(id => removeCartedItem(id))
  }

  function renderCartTotal() {
    const total = cartItems.list.reduce((currentTotal, cartItem) => {
      return currentTotal + (cartItem.amount * cartItem.item.price)
    }, 0)

    return toLocalCurrency(total)
  }

  function renderCartQuantity() {
    return cartItems.list.reduce((currentTotal, cartItem) => {
      return currentTotal + cartItem.amount
    }, 0)
  }

  function toLocalCurrency(price) {
    return price.toLocaleString("en-US", { style: "currency", currency: "PHP" })
  }

  return ({
    initialize,
    cartItems,
    updateCheckoutStatus,
    updateCartedAmount,
    toggleSelectAllForCheckout,
    removeCartedItem,
    removeForCheckout,
    toLocalCurrency,
    renderCartTotal,
    renderCartQuantity
  })
}
