import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDialog from "../hooks/useDialog";
import useListState from "../hooks/useListState";
import useOrderAPI from "../api/useOrderAPI";
import useCartAPI from "../api/useCartAPI";
import AddReviewDialog from "../dialogs/AddReviewDialog";
import "./orders.css";

export default function Orders() {
  const [orderType, setOrderType] = useState("All");
  const [forReview, setForReview] = useState(null);
  const orders = useListState();
  const reviewDialog = useDialog();
  const { getOrderList, updateOrderStatus } = useOrderAPI(fetchOrders);
  const { toLocalCurrency } = useCartAPI();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const orderList = await getOrderList();
    if (orderList) {
      orders.setList(orderList);
    }
  }

  function hanleOpenReviewDialog(order = {}) {
    setForReview(order);
    reviewDialog.show();
  }

  function filteredOrderType() {
    return orders.list.filter((order) => {
      if (orderType == "All") {
        return true;
      } else {
        return order.status == orderType;
      }
    });
  }

  function handleCompleteOrder(order) {
    const updatedOrder = {
      order_reference: order.order_reference,
      status: "Completed",
    };
    updateOrderStatus(updatedOrder);
  }

  function renderOrders() {
    const orderList = filteredOrderType();
    if (orderList == 0)
      return <div className="flex-row justify-center">No existing orders.</div>;
    return orderList.map((order) => {
      return (
        <div key={order.id}>
          <Link to={"/show/" + order.item_id}>
            <div className="ordered-items flex-row justify-between align-center">
              <div className="flex-row align-center">
                <img src={order.item.image_links[0]} alt={order.item.name} />
                <div>
                  <p className="order-item-name">{order.item.name}</p>
                  <p>x{order.amount}</p>
                </div>
              </div>
              <p>{toLocalCurrency(order.item.price)}</p>
            </div>
          </Link>
          <div className="order-rating-section flex-row justify-between align-center">
            <div>
              {!order.review && order.status == "Completed" && (
                <button onClick={() => hanleOpenReviewDialog(order)}>
                  Review
                </button>
              )}
              {order.status == "To Receive" && (
                <button onClick={() => handleCompleteOrder(order)}>
                  Complete Order
                </button>
              )}
            </div>
            <p>
              Order Total: <span>{toLocalCurrency(order.total)}</span>
            </p>
          </div>
        </div>
      );
    });
  }

  function selectOrderType(e) {
    setOrderType(e.target.value);
  }

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
        <label className="order-status-selection" htmlFor="ot-all">
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
        <label className="order-status-selection" htmlFor="ot-to-pay">
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
        <label className="order-status-selection" htmlFor="ot-to-ship">
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
        <label className="order-status-selection" htmlFor="ot-to-receive">
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
        <label className="order-status-selection" htmlFor="ot-completed">
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
        <label className="order-status-selection" htmlFor="ot-cancelled">
          Cancelled
        </label>
      </div>
      <div className="order-list-section">{renderOrders()}</div>
      <AddReviewDialog reviewDialog={reviewDialog} order={forReview} />
    </div>
  );
}
