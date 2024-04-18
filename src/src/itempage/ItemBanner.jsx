import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";
import useItemProps from "../hooks/useItemProps";
import useAmountInput from "../hooks/useAmountInput";
import emptyStar from "../../assets/empty-star.svg";
import filledStar from "../../assets/filled-star.svg";

export default function ItemBanner({ item }) {
  const itemAmount = useAmountInput(0, 9999);
  const [list, listFields] = useItemProps();

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

  function renderItemRating(item) {
    let rating = item.average_rating;
    if (rating == 0) return <span>No ratings yet</span>;
    let result = [];
    let gray = 5 - rating;
    for (let i = 0; i < rating; i++) {
      result.push(
        <img className="filled-star" src={filledStar} alt="yellow" />,
      );
    }
    for (let i = 0; i < gray; i++) {
      result.push(<img className="empty-star" src={emptyStar} alt="gray" />);
    }
    return (
      <>
        <span className="rating">{rating}</span>&nbsp;&nbsp;
        <span>{result}</span>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <span className="ratings-count">{item.reviews.length}</span>&nbsp;
        <span>ratings</span>
      </>
    );
  }

  if (list) {
    return (
      <div className="description-container flex-column">
        <p className="item-name-banner">{item.name}</p>
        <div className="rating-sold-container flex-row align-center">
          {renderItemRating(item)}
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
          <AddToCart item={item} amount={itemAmount.value} />
          <Link
            to="/checkout"
            state={{ from: "itempage", item: item, amount: itemAmount.value }}
          >
            <button className="buy-now-button">Buy now</button>
          </Link>
        </div>
        <div className="specs-container">{renderSpecs()}</div>
      </div>
    );
  }
}
