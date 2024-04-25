import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useItemProps from "../hooks/useItemProps";
import useAmountInput from "../hooks/useAmountInput";
import useCartAPI from "../api/useCartAPI";

export default function ItemBanner({
  item,
  itemReviews,
  renderStarRatings,
  currentUser,
  createPopUp,
  logInDialog,
  setErrorMessage,
}) {
  const itemAmount = useAmountInput(0, 9999);
  const [list, listFields] = useItemProps();
  const { AddToCart } = useCartAPI();
  const navigate = useNavigate();

  useEffect(() => itemAmount.setValue(1), []);

  function renderSpecs() {
    return listFields().map((specLabel) => (
      <div className="spec-wrapper" key={specLabel}>
        <span className="spec-label">{mapSpecLabel(specLabel)}</span>
        <span className="spec-value">{item[specLabel]}</span>
      </div>
    ));
  }

  function mapSpecLabel(specLabel) {
    let result = "";
    specLabel.split("_").forEach((word) => {
      result = result + word.charAt(0).toUpperCase() + word.slice(1) + " ";
    });
    return result.slice(0, -1);
  }

  function handleCheckOut() {
    if (currentUser) {
      navigate("/checkout", {
        state: { from: "itempage", item: item, amount: itemAmount.value },
      });
    } else {
      logInDialog.show();
    }
    setErrorMessage("You need to log in first.");
  }

  function handleAddToCart() {
    if (currentUser) {
      AddToCart(item.id, itemAmount.value);
      createPopUp("Item added to cart.");
    } else {
      logInDialog.show();
      setErrorMessage("You need to log in first.");
    }
  }

  if (list) {
    return (
      <div className="description-container flex-column">
        <p className="item-name-banner">{item.name}</p>
        <div className="rating-sold-container flex-row align-center">
          {renderStarRatings(item.average_rating)}
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <span className="ratings-count">
            {itemReviews && itemReviews.length}
          </span>
          &nbsp;
          <span>ratings</span>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <span className="item-sold">{item.item_sold}</span>&nbsp;
          <span>{" sold"}</span>
        </div>
        <p className="item-price-banner">{"PHP " + item.price}</p>
        <div className="amount-input-container flex-row align-center">
          <span className="amount-label">Amount</span>&nbsp;&nbsp;
          {itemAmount.input()}
        </div>
        <div className="item-actions-container flex-column justify-center">
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to cart
          </button>
          <button className="buy-now-button" onClick={handleCheckOut}>
            Buy now
          </button>
        </div>
        <div className="specs-container">{renderSpecs()}</div>
      </div>
    );
  }
}
