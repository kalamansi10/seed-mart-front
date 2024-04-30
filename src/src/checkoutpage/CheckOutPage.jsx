import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useListState from "../hooks/useListState";
import useCartAPI from "../api/useCartAPI";
import useOrderAPI from "../api/useOrderAPI";
import useDialog from "../hooks/useDialog";
import CheckoutDialog from "../dialogs/CheckoutDialog";
import CheckOutAddress from "./CheckOutAddress";
import CheckOutPayment from "./CheckOutPayment";
import "./check-out-page.css";

export default function CheckOutPage({ currentUser, createPopUp }) {
  const [selectedAddress, setSelectedAddress] = useState();
  const [orderReference, setOrderReference] = useState();

  const checkoutDialog = useDialog();
  const locationState = useLocation();
  const { from, item, amount } = locationState.state;
  const cartItems = useListState();
  const { getForCheckout, toLocalCurrency, renderCartTotal } =
    useCartAPI(fetchCart);
  const { processOrder } = useOrderAPI();

  useEffect(() => {
    if (from == "itempage") {
      cartItems.setList([{ item_id: item.id, amount: amount, item: item }]);
    } else if (from == "cartpage") {
      fetchCart();
    }
  }, []);

  async function fetchCart() {
    const itemList = await getForCheckout();
    if (itemList) {
      cartItems.setList(itemList);
    }
  }

  function rendercheckoutItems() {
    return cartItems.list.map((checkoutItem) => {
      return (
        <div
          className="check-out-item"
          id={checkoutItem.item.id}
          key={checkoutItem.item.id}
        >
          <img
            className="col-image"
            src={checkoutItem.item.image_links[0]}
            alt=""
          />
          <span className="col-name">{checkoutItem.item.name}</span>
          <span className="col-price">
            {toLocalCurrency(checkoutItem.item.price)}
          </span>
          <span className="col-amount">{checkoutItem.amount}</span>
          <span className="col-total">
            {toLocalCurrency(checkoutItem.amount * checkoutItem.item.price)}
          </span>
        </div>
      );
    });
  }

  async function handleProcessOrderClick() {
    const orderList = validateCheckOutInfo();
    if (!orderList) return;
    checkoutDialog.show();
    checkoutDialog.removeListener();
    const response = await processOrder(orderList);
    setOrderReference(response.reference_number);
  }

  function validateCheckOutInfo() {
    if (selectedAddress) {
      return cartItems.list.map((checkoutItem) => {
        return {
          carted_id: from == "cartpage" ? checkoutItem.id : null,
          item_id: checkoutItem.item_id || checkoutItem.item.id,
          shipping_address_id: selectedAddress.id,
          payment_method_id: 0,
          amount: checkoutItem.amount,
          adjustments: "{}",
          total: checkoutItem.amount * checkoutItem.item.price,
        };
      });
    } else {
      createPopUp("Invalid shipping address.", true);
      return null;
    }
  }

  if (cartItems.list) {
    return (
      <>
        <div className="flex-column align-center">
          <div className="check-out-page ">
            <section className="check-out-items-section">
              <CheckOutAddress
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />
              <div className="check-out-items-labels">
                <span className="co-ordered">Products Ordered</span>
                <span className="co-price">Price</span>
                <span className="co-quantity">Quantity</span>
                <span className="co-total">Total</span>
              </div>
              {rendercheckoutItems()}
            </section>
            <div className="check-out-bottom-section">
              <CheckOutPayment />
              <section className="check-out-breakdown section flex-column align-end">
                <div className="breakdown-container">
                  <div className="breakdown-wrapper flex-row justify-between align-center">
                    <p>Merchandise Subtotal:</p>
                    <span>{renderCartTotal(cartItems)}</span>
                  </div>
                  <div className="breakdown-wrapper flex-row justify-between align-center">
                    <p>Shipping Fee:</p>
                    <span>{toLocalCurrency(0)}</span>
                  </div>
                  <div className="breakdown-wrapper flex-row justify-between align-center">
                    <p>Total Payment:</p>
                    <span className="total-payment">
                      {renderCartTotal(cartItems)}
                    </span>
                  </div>
                </div>
                <button
                  className="check-out-button"
                  onClick={handleProcessOrderClick}
                >
                  Place order
                </button>
                <CheckoutDialog
                  checkoutDialog={checkoutDialog}
                  referenceNumber={orderReference}
                />
              </section>
            </div>
          </div>
        </div>
      </>
    );
  }
}
