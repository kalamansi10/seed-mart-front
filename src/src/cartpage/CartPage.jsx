import { useEffect } from "react";
import { Link } from "react-router-dom";
import useListState from "../hooks/useListState";
import useCartAPI from "../api/useCartAPI";
import "./cart-page.css";

export default function CartPage() {
  const cartItems = useListState();
  const {
    getCart,
    updateCheckoutStatus,
    updateCartedAmount,
    removeFromCart,
    removeSelected,
    toLocalCurrency,
    renderCartTotal,
    renderCartQuantity,
  } = useCartAPI(fetchCart);

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    const itemList = await getCart();
    if (itemList) {
      cartItems.setList(itemList);
    }
  }

  function toggleSelectAllForCheckout(isChecked) {
    cartItems.list.forEach((item) => {
      if (item.is_for_checkout == !isChecked)
        updateCheckoutStatus(isChecked ? true : false, item.id);
    });
  }

  function handleAmountAdjustClick(carted_id, adjustment) {
    let result = adjustment + cartItems.get(carted_id).amount;
    if (result > 0 && result < 1000) {
      updateCartedAmount(result, carted_id);
    } else if (result < 1) {
      removeFromCart(carted_id);
    }
  }

  function handleAmountInputChange(e, carted_id) {
    let amount = Number(e.target.value);
    if (amount > 0 && amount < 1000) {
      updateCartedAmount(amount, carted_id);
    } else if (amount < 1) {
      cartItems.update(carted_id, null, "amount");
    }
  }

  function handleAmountInputBlur(e, carted_id) {
    if (e.target.value < 1) updateCartedAmount(1, carted_id);
  }

  function amountInput(carted) {
    return (
      <div className="amount-input flex-row">
        <button onClick={() => handleAmountAdjustClick(carted.id, -1)}>
          -
        </button>
        <input
          type="text"
          onChange={(e) => handleAmountInputChange(e, carted.id)}
          onBlur={(e) => handleAmountInputBlur(e, carted.id)}
          value={cartItems.get(carted.id).amount}
        />
        <button onClick={() => handleAmountAdjustClick(carted.id, 1)}>+</button>
      </div>
    );
  }

  function renderCartItems() {
    return cartItems.list.map((carted) => {
      return (
        <div className="cart-item" id={carted.id} key={carted.id}>
          <input
            type="checkbox"
            onClick={(e) => updateCheckoutStatus(e.target.checked, carted.id)}
            onChange={(e) =>
              cartItems.update(carted.id, e.target.checked, "is_for_checkout")
            }
            checked={carted.is_for_checkout}
          />
          <img src={carted.item.image_links[0]} alt="" />
          <p>{carted.item.name}</p>
          <span>{toLocalCurrency(carted.item.price)}</span>
          {amountInput(carted)}
          <span>{toLocalCurrency(carted.amount * carted.item.price)}</span>
          <button
            className="remove-item-button"
            onClick={() => removeFromCart(carted.id)}
          >
            Remove
          </button>
        </div>
      );
    });
  }

  if (cartItems.list && cartItems.list.length != 0) {
    return (
      <>
        <div className="full-height flex-column align-center">
          <div className="cart-page box-shadow">
            <section className="cart-items-section">
              <div className="cart-items-labels">
                <p>Products Ordered</p>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>
              {renderCartItems()}
            </section>
            <section className="cart-options-section flex-row justify-between">
              <div className="right-cart-options flex-row align-center">
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      toggleSelectAllForCheckout(e.target.checked)
                    }
                    checked={cartItems.list.every(
                      (item) => item.is_for_checkout
                    )}
                  />
                  &nbsp;&nbsp;&nbsp;Select all
                </label>
                <button
                  className="remove-item-button"
                  onClick={() => removeSelected(cartItems)}
                >
                  Remove selected
                </button>
              </div>
              <div className="left-cart-options flex-row align-center">
                <p className="cart-total-label">{`Total (${renderCartQuantity(
                  cartItems
                )} item):`}</p>
                <p className="cart-total-amount">
                  {renderCartTotal(cartItems)}
                </p>
                <Link to="/checkout" state={{ from: "cartpage" }}>
                  <button className="check-out-button">Checkout</button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="full-height flex-column align-center no-item">
        <p>Cart is empty.</p>
      </div>
    );
  }
}
