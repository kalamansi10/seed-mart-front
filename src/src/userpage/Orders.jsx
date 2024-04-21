import { useEffect, useState } from "react";
import useDialog from "../hooks/useDialog";
import useListState from "../hooks/useListState";
import useOrderAPI from "../api/useOrderAPI";
import useReviewAPI from "../api/useReviewAPI";
import AddReviewDialog from "../dialogs/AddReviewDialog";
import "./orders.css";

export default function Orders() {
  const [orderType, setOrderType] = useState("All");
  const [forReview, setForReview] = useState({});
  const orders = useListState();
  const reviewDialog = useDialog();
  const { getOrderList } = useOrderAPI();
  const { getReview, addReview, editReview, deleteReview } = useReviewAPI();

  useEffect(() => {
    async function fetchOrders() {
      const orderList = await getOrderList();
      if (orderList) {
        orders.setList(orderList);
      }
    }

    fetchOrders();
  }, []);

  function renderReview(order) {
    function handleAddReview() {
      setForReview(order);
      reviewDialog.show();
    }

    if (order.review) {
      return (
        <div>
          {order.review.rating}
          {order.review.comment}
          <button onClick={handleAddReview}>Edit</button>;
        </div>
      );
    } else {
      return <button onClick={handleAddReview}>Add Review</button>;
    }
  }

  function filteredOrderType() {
    return orders.list.filter((order) => {
      if (orderType == "All") {
        return true
      } else {
        return order.status == orderType
      }
    })
  }

  function renderOrders() {
    return filteredOrderType().map((order) => {
      return (
        <div key={order.id}>
          <img src={order.item.image_links[0]} alt="item-preview" />
          <p>{order.item.name}</p>
          <p>x{order.amount}</p>
          <p>{order.item.price}</p>
          <p>{order.total}</p>
          <button>Buy Again</button>
          {renderReview(order)}
        </div>
      );
    });
  }

  function selectOrderType(e) {
    setOrderType(e.target.value);
  };

  return (
    <div className="orders-section">
      <div className="order-status-container flex-row justify-around">
        <input
          className="hidden"
          type="radio"
          name="order-type"
          id="ot-all"
          value="All"
          checked={orderType === "All"}
          onChange={selectOrderType}
        />
        <label
          className="order-status-selection"
          htmlFor="ot-all"
        >
          All
        </label>
        <input
          className="hidden"
          type="radio"
          name="order-type"
          id="ot-to-pay"
          value="To Pay"
          checked={orderType === "To Pay"}
          onChange={selectOrderType}
        />
        <label
          className="order-status-selection"
          htmlFor="ot-to-pay"
        >
          To Pay
        </label>
        <input
          className="hidden"
          type="radio"
          name="order-type"
          id="ot-to-ship"
          value="To Ship"
          checked={orderType === "To Ship"}
          onChange={selectOrderType}
        />
        <label
          className="order-status-selection"
          htmlFor="ot-to-ship"
        >
          To Ship
        </label>
        <input
          className="hidden"
          type="radio"
          name="order-type"
          id="ot-to-receive"
          value="To Receive"
          checked={orderType === "To Receive"}
          onChange={selectOrderType}
        />
        <label
          className="order-status-selection"
          htmlFor="ot-to-receive"
        >
          To Receive
        </label>
        <input
          className="hidden"
          type="radio"
          name="order-type"
          id="ot-completed"
          value="Completed"
          checked={orderType === "Completed"}
          onChange={selectOrderType}
        />
        <label
          className="order-status-selection"
          htmlFor="ot-completed"
        >
          Completed
        </label>
        <input
          className="hidden"
          type="radio"
          name="order-type"
          id="ot-cancelled"
          value="Cancelled"
          checked={orderType === "Cancelled"}
          onChange={selectOrderType}
        />
        <label
          className="order-status-selection"
          htmlFor="ot-cancelled"
        >
          Cancelled
        </label>
      </div>
      <div>{orderType}</div>
      <div>{renderOrders()}</div>
      <AddReviewDialog reviewDialog={reviewDialog} order={forReview} />
    </div>
  );
}
