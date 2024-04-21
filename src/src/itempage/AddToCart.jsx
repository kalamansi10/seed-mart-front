import useCookiesAndHeaders from "../hooks/useCookiesAndHeaders";

export default function AddToCart({ item, amount, createPopUp }) {
  const { getHeader } = useCookiesAndHeaders();

  function updateCart() {
    let API =
      "/api/cart?" + "item_id=" + item.id + "&amount=" + amount;
    fetch(API, getHeader("POST"));
    createPopUp("Item added to cart.")
  }

  return (
    <button className="add-to-cart-button" onClick={updateCart}>
      Add to cart
    </button>
  );
}
