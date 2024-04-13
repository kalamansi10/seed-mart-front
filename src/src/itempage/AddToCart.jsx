import useCookiesAndHeaders from "../hooks/useCookiesAndHeaders";

export default function AddToCart({ item, amount }) {
  const { getHeader } = useCookiesAndHeaders();

  function updateCart() {
    let API =
      "/api/v1/add-to-cart?" + "item_id=" + item.id + "&amount=" + amount;
    fetch(API, getHeader("POST"));
  }

  return (
    <button className="add-to-cart-button" onClick={updateCart}>
      Add to cart
    </button>
  );
}
