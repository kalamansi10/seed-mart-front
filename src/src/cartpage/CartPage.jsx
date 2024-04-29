import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useListState from "../hooks/useListState";
import useCartAPI from "../api/useCartAPI";
import "./cart-page.css";

export default function CartPage({ createPopUp }) {
  const cartItems = useListState();
  const navigate = useNavigate();
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

  function handleCheckOut() {
    if (cartItems.list.some((item) => item.is_for_checkout)) {
      navigate("/checkout", { state: { from: "cartpage" } });
    } else {
      createPopUp("No item selected for checkout.", true);
    }
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
          <div className="ci-checkbox">
            <input
              type="checkbox"
              onClick={(e) => updateCheckoutStatus(e.target.checked, carted.id)}
              onChange={(e) =>
                cartItems.update(carted.id, e.target.checked, "is_for_checkout")
              }
              checked={carted.is_for_checkout}
            />
          </div>
          <img className="ci-image" src={carted.item.image_links[0]} alt="" />
          <div className="ci-info-wrapper">
            <p className="ci-name">{carted.item.name}</p>
            <span className="ci-amount-mobile">{amountInput(carted)}</span>
            <span className="ci-price-mobile">
              {toLocalCurrency(carted.item.price)}
            </span>
          </div>
          <span className="ci-price">{toLocalCurrency(carted.item.price)}</span>
          <span className="ci-amount">{amountInput(carted)}</span>
          <span className="ci-total">
            {toLocalCurrency(carted.amount * carted.item.price)}
          </span>
          <button
            className="remove-item-button"
            onClick={() => removeFromCart(carted.id)}
          >
            <span className="web">Remove</span>
            <span className="mobile">x</span>
          </button>
        </div>
      );
    });
  }

  if (cartItems.list && cartItems.list.length != 0) {
    return (
      <>
        <div className="full-height flex-column align-center">
          <div className="cart-page">
            <section className="cart-items-section">
              <div className="cart-items-labels">
                <span className="cil-ordered">Products Ordered</span>
                <span className="cil-price">Price</span>
                <span className="cil-quantity">Quantity</span>
                <span className="cil-total">Total</span>
                <span className="grid-placeholder"></span>
              </div>
              {renderCartItems()}
            </section>
            <section className="cart-options-section">
              <div className="left-cart-options">
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
              <div className="right-cart-options">
                <p className="cart-total-label">{`Total (${renderCartQuantity(
                  cartItems
                )} item)`}</p>
                <p className="cart-total-amount">
                  {renderCartTotal(cartItems)}
                </p>
                <button className="check-out-button" onClick={handleCheckOut}>
                  Checkout
                </button>
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
